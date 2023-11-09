import { Markup } from 'telegraf';
import {
  basketballKeyboardButtons,
  footballKeyboardButtons,
  mainKeyboardButtons,
} from './app.buttons';

export function mainKeyboard() {
  return Markup.keyboard(Object.values(mainKeyboardButtons)).resize();
}

export function footballKeyboard() {
  return Markup.keyboard(Object.values(footballKeyboardButtons));
}

export function basketballKeyboard() {
  return Markup.keyboard(Object.values(basketballKeyboardButtons));
}
