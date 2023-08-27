import { HttpException, Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as moment from 'moment';

@Injectable()
export class PointService {
  constructor(private PrismaService: PrismaService) {}

  async stats(user: users) {
    let result = await this.PrismaService.acess.findMany({
      where: { users: user },
    });

    return result.map((item) => {
      let permanencia;
      if (item.exit) {
        const minutes = moment(item.exit).diff(item.entry, 'minutes');
        const time = this.hoursByMinutes(minutes);
        permanencia = `${time.hours}h ${time.minutes}m`;
      } else if (item.entry && !item.exit) {
        const minutes = moment().diff(moment(item.entry), 'minutes');
        const time = this.hoursByMinutes(minutes);
        permanencia = `${time.hours}h ${time.minutes}m`;
      }
      return {
        date: moment(item.date).format('DD/MM/YYYY').toString(),
        entrada: moment(item.entry).format('HH:mm:ss').toString(),
        saida: item.exit ? moment(item.exit).format('HH:mm:ss').toString() : '',
        permanencia,
      };
    });
  }
  async register(user: users) {
    moment.locale('pt-br');

    const hits = await this.PrismaService.acess.findMany({
      where: { users: user },
    });

    if (hits.length) {
      const today = hits.find(
        (date) =>
          moment(date.date).format('DD/MM/YYYY') ===
          moment().format('DD/MM/YYYY'),
      );

      if (today && today.entry && today.exit)
        throw new HttpException({ status: 'bloqueado' }, 403);

      if (today?.entry) {
        const exit = await this.PrismaService.acess.update({
          where: { id: today.id },
          data: { exit: new Date() },
        });
        return { status: 'saida', ...exit };
      } else {
        const entry = await this.PrismaService.acess.create({
          data: { usersId: user.id },
        });
        return { status: 'entrada', ...entry };
      }
    } else {
      const entry = await this.PrismaService.acess.create({
        data: { usersId: user.id },
      });
      return { status: 'entrada', ...entry };
    }

    const staytimeMinutes = moment().diff(hits[0].date, 'minutes');

    console.log(this.hoursByMinutes(staytimeMinutes));

    const atualDate = moment().format('DD/MM/YYYY');

    const atualHour = moment().format('HH:mm:ss');
  }

  hoursByMinutes(totalMinutes): { hours: number; minutes: number } {
    return { hours: Math.floor(totalMinutes / 60), minutes: totalMinutes % 60 };
  }
}
