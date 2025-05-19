import {Controller, Get, Res} from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/auth/api-docs')
  async authDocs(@Res() res) {
    try {
      const response = await axios.get('http://auth-server:3001/api-docs');
      res.send(response.data);
    } catch (error) {
      console.error(`[AppController] Auth Server 연결 실패: ${error.message}`);
      res.status(500).send('Auth Server 연결 실패');
    }
  }

  @Get('/event/api-docs')
  async eventDocs(@Res() res) {
    try {
      const response = await axios.get('http://event-server:3002/api-docs');
      res.send(response.data);
    } catch (error) {
      console.error(`[AppController] Event Server 연결 실패: ${error.message}`);
      res.status(500).send('Event Server 연결 실패');
    }
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
