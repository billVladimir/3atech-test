import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AppUpdate } from './app.update';

const sessions = new LocalSession({ database: 'session_db.json' });

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        TG_TOKEN: Joi.string().required(),
      }),
    }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        middlewares: [sessions.middleware()],
        token: configService.get<string>('TG_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AppService, AppUpdate],
})
export class AppModule {}
