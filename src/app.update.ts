import { AppService } from './app.service';
import { Hears, InjectBot, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { Context } from './context.interface';
import {
  basketballKeyboard,
  footballKeyboard,
  mainKeyboard,
} from './app.keyboard';
import { replies } from './app.replies';
import {
  mainKeyboardButtons,
  footballKeyboardButtons,
  backButton,
  basketballKeyboardButtons,
} from './app.buttons';

@Update()
export class AppUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply('Привет, друг!', mainKeyboard());
    ctx.session.state = 'main';
  }

  @Hears(mainKeyboardButtons.football.text)
  async onFootball(ctx: Context) {
    await ctx.reply('Ок, что дальше?', footballKeyboard());
    ctx.session.state = 'football';
  }

  @Hears(mainKeyboardButtons.basketball.text)
  async onBasketBall(ctx: Context) {
    await ctx.reply('Дальше куда?', basketballKeyboard());
    ctx.session.state = 'basketball';
  }

  @Hears(backButton.text)
  async onBack(ctx: Context) {
    if (!['football', 'basketball'].includes(ctx.session.state)) return;
    await ctx.reply('Главное меню', mainKeyboard());
    ctx.session.state = 'main';
  }

  @Hears(footballKeyboardButtons.rpl.text)
  async onFootballRpl(ctx: Context) {
    await ctx.reply(replies.rpl);
  }

  @Hears(footballKeyboardButtons.apl.text)
  async onFootballApl(ctx: Context) {
    await ctx.reply(replies.apl);
  }

  @Hears(basketballKeyboardButtons.nba.text)
  async onBasketballNba(ctx: Context) {
    await ctx.reply(replies.nba);
  }

  @Hears(basketballKeyboardButtons.eur.text)
  async onBasketballEur(ctx: Context) {
    await ctx.reply(replies.eur);
  }
}
