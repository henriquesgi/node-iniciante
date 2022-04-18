import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { AuthService } from './auth/auth.service';
import { SkipJwt } from './auth/constants';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
@ApiTags('/')
export class AppController {
  constructor(private readonly authService: AuthService) { }

  @Post('auth/login')
  @SkipJwt()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ schema: { type: 'object', properties: { id: { type: 'string' }, senha: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Login bem sucedido.' })
  @ApiResponse({ status: 401, description: 'Login sem sucesso.' })
  async login(@Req() req: Request, @Res() res: Response) {
    const token = await this.authService.login(req.user);
    if (token) {
      res.status(HttpStatus.OK).json(token);
    }
  }
}
