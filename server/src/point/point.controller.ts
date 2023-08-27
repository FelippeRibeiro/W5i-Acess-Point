import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { PointService } from './point.service';
import { AuthGuard } from 'src/guards/auth.guards';
import { users } from '@prisma/client';

@Controller('point')
export class PointController {
  constructor(private readonly pointService: PointService) {}

  @UseGuards(AuthGuard)
  @Get()
  async status(@Req() req) {
    return this.pointService.stats(req.user);
  }

  @UseGuards(AuthGuard)
  @Post('register')
  async register(@Req() req) {
    return this.pointService.register(req.user);
  }
}
