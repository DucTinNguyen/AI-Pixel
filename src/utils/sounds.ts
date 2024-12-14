import { Howl } from 'howler';

export const sounds = {
  background: new Howl({
    src: ['/assets/sound/Magic.mp3'],
    loop: true,
    volume: 0.5,
  }),
};