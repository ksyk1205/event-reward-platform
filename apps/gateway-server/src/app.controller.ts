import {Controller, Get, Res} from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('/auth/ping')
  async pingAuth(@Res() res) {
    try {
      const response = await axios.get('http://auth-server:3001');
      res.send(response.data);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Auth Server 연결 실패');
    }
  }

  @Get('/event/ping')
  async pingEvent(@Res() res) {
    try {
      const response = await axios.get('http://event-server:3002');
      res.send(response.data);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Event Server 연결 실패');
    }
  }
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
