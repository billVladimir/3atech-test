import { Context as ContextTelegraf } from 'telegraf';

export type SessionState = 'main' | 'football' | 'basketball';

export interface Context extends ContextTelegraf {
  session: {
    state: SessionState;
  };
}
