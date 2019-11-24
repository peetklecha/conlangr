import * as ss from './segment_creators'
import * as ff from './constants'


//
//plosives
//
export const p = ss.vclsPlosive(...ff.BILABIAL, 'p')
export const b = ss.vcdPlosive(...ff.BILABIAL, 'b')
//pt
//bd
//dental
//dental
export const t = ss.vclsPlosive(...ff.ALVEOLAR, 't')
export const d = ss.vcdPlosive(...ff.ALVEOLAR, 'd')
//postalv
//postalv
export const rt = ss.vclsPlosive(...ff.RETROFLEX, 'ʈ')
export const rd = ss.vcdPlosive(...ff.RETROFLEX, 'ɖ')
export const c = ss.vclsPlosive(...ff.PALATAL, 'c')
export const jh = ss.vcdPlosive(...ff.PALATAL, 'ɟ')
export const k = ss.vclsPlosive(...ff.VELAR, 'k')
export const g = ss.vcdPlosive(...ff.VELAR, 'g')
export const q = ss.vclsPlosive(...ff.UVULAR, 'q')
export const G = ss.vcdPlosive(...ff.UVULAR, 'ɢ')
//pharyngeal vcls
export const P = ss.vclsPlosive(null, null, 'ʔ')
//
//trills
//
export const B = ss.trill(...ff.BILABIAL, 'ʙ')
export const rr = ss.trill(...ff.ALVEOLAR, 'r')
export const R = ss.trill(...ff.UVULAR, 'ʀ')
//
//taps
//
export const r = ss.tap(...ff.ALVEOLAR, 'ɾ')
export const rh = ss.tap(...ff.RETROFLEX, 'ɽ')
//
//central fricatives
//
export const ph = ss.vclsFricative(...ff.BILABIAL, 'ɸ')
export const bh = ss.vclsFricative(...ff.BILABIAL, 'β')
export const f = ss.vclsFricative(...ff.LABIODENT, 'f')
export const v = ss.vcdFricative(...ff.LABIODENT, 'v')
export const th = ss.vclsFricative(...ff.DENTAL, ' θ')
export const dh = ss.vcdFricative(...ff.DENTAL, 'ð')
export const s = ss.vclsFricative(...ff.ALVEOLAR, 's')
export const z = ss.vcdFricative(...ff.ALVEOLAR, 'z')
export const sh = ss.vclsFricative(...ff.POSTALVEOLAR, 'ʃ')
export const zh = ss.vcdFricative(...ff.POSTALVEOLAR, 'ʒ')
export const rs = ss.vclsFricative(...ff.RETROFLEX, 'ʂ')
export const rz = ss.vcdFricative(...ff.RETROFLEX, 'ʐ')
export const cy = ss.vclsFricative(...ff.PALATAL, 'ç')
export const jy = ss.vcdFricative(...ff.PALATAL, 'ʝ')
export const x = ss.vclsFricative(...ff.VELAR, 'x')
export const gh = ss.vcdFricative(...ff.VELAR, 'ɣ')
export const kx = ss.vclsFricative(...ff.UVULAR, 'χ')
export const gx = ss.vcdFricative(...ff.UVULAR, 'ʁ')
export const hh = ss.vclsFricative(...ff.PHARYNGEAL, 'ħ')
export const hx = ss.vcdFricative(...ff.PHARYNGEAL, 'ʕ')
export const h = ss.voicelessSegment(null, null, null, 'h')
export const H = ss.voicedSegment(null, null, null, 'ɦ')
//
//lateral fricatives
//
export const lh = ss.lateral(ff.FRICATIVE, ...ff.ALVEOLAR, 'ɬ').devoice()
export const lz = ss.lateral(ff.FRICATIVE, ...ff.ALVEOLAR, 'ɮ')
//
//nasals
//
export const m = ss.nasal(...ff.BILABIAL, 'm')
export const n = ss.nasal(...ff.ALVEOLAR, 'n')
export const rn = ss.nasal(...ff.RETROFLEX, 'ɳ')
export const ny = ss.nasal(...ff.PALATAL, 'ɲ')
export const ng = ss.nasal(...ff.VELAR, 'ŋ')
export const N = ss.nasal(...ff.UVULAR, 'ɴ')
//
//lateral approximants
//
export const l = ss.lateral(ff.HIGH, ...ff.ALVEOLAR, 'l')
export const rl = ss.lateral(ff.HIGH, ...ff.RETROFLEX, 'ɭ')
export const ly = ss.lateral(ff.HIGH, ...ff.PALATAL, 'ʎ')
export const lx = ss.lateral(ff.HIGH, ...ff.VELAR, 'ʟ')
//
//central approximants/high vowels
//
export const wv = ss.vocoid(ff.HIGH, ...ff.LABIODENT, 'ʋ')
export const r_ = ss.vocoid(ff.HIGH, ...ff.ALVEOLAR, 'ɹ')
export const _r = ss.vocoid(ff.HIGH, ...ff.RETROFLEX, 'ɻ')
export const j = ss.vocoid(ff.HIGH, ...ff.PALATAL, 'i')
export const y = ss.vocoid(ff.HIGH, ...ff.PALATAL, 'ɥ').round()
export const i = ss.vocoid(ff.HIGH, ...ff.CENTRAL, 'ɨ')
export const u = ss.vocoid(ff.HIGH, ...ff.CENTRAL, 'ʉ').round()
export const uu = ss.vocoid(ff.HIGH, ...ff.VELAR, 'ɯ')
export const w = ss.vocoid(ff.HIGH, ...ff.VELAR, 'u').round()
//
//mid-high vowels
//
export const e = ss.vowel(ff.MIDHIGH, ff.P_FRONT, 'e')
export const ø = ss.vowel(ff.MIDHIGH, ff.P_FRONT, 'ø').round()
export const eh = ss.vowel(ff.MIDHIGH, ff.P_CENTRAL, 'ɘ')
export const øh = ss.vowel(ff.MIDHIGH, ff.P_CENTRAL, 'ɵ').round()
export const oh = ss.vowel(ff.MIDHIGH, ff.P_BACK, 'ɤ')
export const o = ss.vowel(ff.MIDHIGH, ff.P_BACK, 'o').round()
export const ë = ss.vowel(ff.MID, ff.P_CENTRAL, 'ə')
export const E = ss.vowel(ff.MIDLOW, ff.P_FRONT, 'ɛ')
export const œ = ss.vowel(ff.MIDLOW, ff.P_FRONT, 'œ').round()
export const Eh = ss.vowel(ff.MIDLOW, ff.P_CENTRAL, 'ɜ')
export const œh = ss.vowel(ff.MIDLOW, ff.P_CENTRAL, 'ɞ').round()
export const Oh = ss.vowel(ff.MIDLOW, ff.P_BACK, 'ʌ')
export const O = ss.vowel(ff.MIDLOW, ff.P_BACK, 'ɔ').round()
export const æ = ss.vowel(ff.LOW, ff.P_FRONT, 'a')
export const ô = ss.vowel(ff.LOW, ff.P_FRONT, 'ɶ').round()
export const a = ss.vowel(ff.LOW, ff.P_BACK, 'ɑ')
export const A = ss.vowel(ff.LOW, ff.P_BACK, 'ɒ').round()

const LatFric = 'Lateral Fricative'
const LatApprox = 'Lateral Approximant'
const _ = ''
export const tableObj = {
  Plosive:    [[p, b],   [_, _], [_, _],   [t, d],   [_, _],   [rt, rd], [c, jh],  [k, g],  [q, G],   [_, _],   [P, _]],
  Trill:      [[_,B],    [_,_],  [_,_],    [_,rr],   [_,_],    [_,_],    [_,_],    [_,_],   [_,R],    [_,_],    [_,_]],
  Tap:        [[_,_],    [_,_],  [_,_],    [_,r],    [_,_],    [_,rh],   [_,_],    [_,_],   [_,_],    [_,_],    [_,_]],
  Fricative:  [[ph, bh], [f, v], [th, dh], [s, z],   [sh, zh], [rs, rz], [cy, jy], [x, gh], [kx, gx], [hh, hx], [h,H]],
  [LatFric]:  [[_,_],    [_,_],  [_,_],    [lh,lz],  [_,_],    [_,rh],   [_,_],    [_,_],   [_,_],    [_,_],    [_,_]],
	Nasal:      [[_,m,],   [_,_],  [_,_],    [_,n],    [_,_],    [_,rn],   [_,ny],   [_,ng],  [_,N],    [_,_],    [_,_]],
  Approximant:[[_,_],    [_,wv], [_,_],    [_,r_],   [_,_],    [_,_r],   [_,j],    [_,uu],  [_,_],    [_,_],    [_,_]],
  [LatApprox]:[[_,_],    [_,_], [_,_],     [_,l],    [_,_],    [_,rl],   [_,ly],   [_,lx],  [_,_],    [_,_],    [_,_]],
}

// tableObj.Trill[1] = B
// tableObj.Trill[7] = rr
// tableObj.Trill[17] = R
// tableObj.Tap[7] = r
// tableObj.Tap[11] = rh
// tableObj['Lateral Fricative'][6] = lh
// tableObj['Lateral Fricative'][7] = lz
// tableObj.Approximant[3] = wv
// tableObj.Approximant[7] = r_
// tableObj.Approximant[11] = _r
// tableObj.Approximant[13] = j
// tableObj.Approximant[15] = uu
// tableObj['Lateral Approximant'][7] = l
// tableObj['Lateral Approximant'][11] = rl
// tableObj['Lateral Approximant'][13] = ly
// tableObj['Lateral Approximant'][15] = lx

export const IPA = [
  [
    '',
    'Bilabial',
    'Labiodental',
    'Dental',
    'Alveolar',
    'Retroflex',
    'Postalveolar',
    'Palatal',
    'Velar',
    'Uvular',
    'Pharyngeal',
    'Glottal'
  ]
].concat(Object.keys(tableObj).map(key => [key].concat(tableObj[key])))

// export default [
//   [
//     '',
//     'Bilabial',
//     'Labiodental',
//     'Dental',
//     'Alveolar',
//     'Retroflex',
//     'Postalveolar',
//     'Palatal',
//     'Velar',
//     'Uvular',
//     'Pharyngeal',
//     'Glottal'
//   ],
// 	['Plosive', p, b, '', '', '', '', t, d, '', '', rt, rd, c, jh, k, g, q, G, '', '', P, ''],
// 	['Nasal', '', m, '', '', '', '', '', n, '', '', '', rn, '', ny, '', ng, '', N, ]
// ]
