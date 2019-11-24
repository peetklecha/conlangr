import {PLACE_TYPES} from './constants'

export default {
  U_LABIAL: ['p', 'b', 'm', 'w'],
  L_LABIAL: ['p', 'b', 'm', 'w', 'f', 'v'],
  P_DENTAL: ['f', 'v'],
  APICAL: ['t', 'd', 's', 'z', 'n', 'l', 'r'],
  P_ALVEOLAR: ['t', 'd', 's', 'z', 'n', 'l', 'r'],
  POSTALVEOLAR: ['t', 'd', 'c', 'x', 'r'],
  PALATAL: ['c', 'j', 'k', 'y', 'g', 'x'],
  VELAR: ['k', 'g', 'x', 'j', 'c', 'y', 'q', 'h'],
  UVULAR: ['q', 'k', 'g', 'x', 'h'],
  PHARYNGEAL: ['q', 'k', 'g', 'x', 'h'],
  VOICED: [
    'w',
    'e',
    'r',
    'y',
    'u',
    'i',
    'o',
    'a',
    'd',
    'g',
    'j',
    'l',
    'z',
    'v',
    'b',
    'n',
    'm',
    'h',
    'x',
    'c'
  ],
  VOICELESS: ['h', 'q', 't', 'p', 's', 'f', 'k', 'x', 'c'],
  STOP: ['p', 'b', 't', 'd', 'k', 'g', 'q', 'c', 'r'],
  TRILL: ['r'],
  FRICATIVE: ['h', 'f', 'v', 's', 'z', 'j', 'x'],
  HIGH: ['w', 'y', 'r', 'l', 'i', 'u'],
  MIDHIGH: ['i', 'u', 'e', 'o'],
  MID: ['e', 'o'],
  MIDLOW: ['e', 'o', 'a'],
  LOW: ['a'],
  NASAL: ['m', 'n'],
  DOUBLE: ['h', '2']
}

export const allLetters = 'abcdefghijklmnopqrstuvwxyz'.split('')
