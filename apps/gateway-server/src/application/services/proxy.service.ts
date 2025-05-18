import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {firstValueFrom} from 'rxjs';
import {AxiosRequestConfig} from "axios";

@Injectable()
export class ProxyService {
    constructor(private readonly httpService: HttpService) {}

    private getTargetUrl(path: string): string {
        if (path.startsWith('/auth')) return `http://auth-server:3001`+path;
        if (path.startsWith('/users')) return `http://auth-server:3001`+path;
        if (path.startsWith('/events')) return `http://event-server:3002`+path;
        return path;
    }

    async forwardRequest(path: string, method: string, data?: any, headers?: any, user?: any) {
        const isAuthPath = path.startsWith('/auth');

        const filteredHeaders = Object.entries(headers)
            .filter(([key, value]) =>
                !['content-length', 'host', 'connection'].includes(key.toLowerCase()) && value != null
            )
            .reduce((acc, [key, value]) => {
                if (!isAuthPath || key.toLowerCase() !== 'authorization') {
                    acc[key] = value;
                }
                return acc;
            }, {});

        if (user) {
            filteredHeaders['x-id'] = user.id,
            filteredHeaders['x-user-id'] = user.userid;
            filteredHeaders['x-user-role'] = user.role;
        }

        const targetUrl = this.getTargetUrl(path);

        const requestConfig: AxiosRequestConfig = {
            method,
            url: targetUrl,
            data,
            headers: filteredHeaders,
        };

        try {
            const response = await firstValueFrom(this.httpService.request(requestConfig));
            return response.data;
        } catch (e) {
            throw new HttpException(`Proxy forwarding failed: ${e.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

