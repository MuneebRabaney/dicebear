import type { ValuesType } from 'utility-types';
import type Random from '@dicebear/avatars/lib/random';
import type { Options, FacialHair } from '../options';
import getOption from './getOption';
import { facialHair } from '../paths';
import { arrayUnique } from '../helpers/arrayUnique';

export default function (options: Options, random: Random): ((color: string) => string) | undefined {
  let selected: Array<keyof typeof facialHair> = [];

  let values: Record<ValuesType<FacialHair>, Array<keyof typeof facialHair>> = {
    medium: ['beardMedium'],
    beardMedium: ['beardMedium'],
    light: ['beardLight'],
    beardLight: ['beardLight'],
    majestic: ['beardMajestic'],
    beardMajestic: ['beardMajestic'],
    fancy: ['moustaceFancy'],
    moustaceFancy: ['moustaceFancy'],
    magnum: ['moustacheMagnum'],
    moustacheMagnum: ['moustacheMagnum'],
  };

  Object.keys(values).forEach((key) => {
    let val = values[key as ValuesType<FacialHair>];

    if (getOption('facialHair', key, options)) {
      selected.push(...val);
    }
  });

  let picked = random.pickone(arrayUnique(selected));

  if (false === random.bool(undefined !== options.facialHairChance ? options.facialHairChance : 10)) {
    return undefined;
  }

  return facialHair[picked];
}
