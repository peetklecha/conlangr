import Language from '../language'
import {
  p,
  b,
  t,
  d,
  k,
  g,
  x,
  rr,
  r,
  f,
  s,
  th,
  m,
  n,
  ny,
  l,
  ly,
  e,
  j,
  w,
  o,
  a,
  sh
} from '../phone/segments'
import {vclsAffricate} from '../phone/segment_creators'
import {POSTALVEOLAR} from '../phone/constants'
import {OrthRuleset, OrthRule, Word, ___, _} from '../'

const Spanish = new Language('Spanish')

Spanish.fillInventory({
  p,
  b,
  t,
  d,
  c: k,
  g,
  rr,
  r,
  f,
  s,
  z: th,
  j: x,
  m,
  n,
  ñ: ny,
  l,
  ll: ly,
  e,
  i: j,
  u: w,
  o,
  a,
  ch: vclsAffricate(...POSTALVEOLAR, sh)
})

const ph = Spanish.phonemicInventory

Spanish.orthographicRules = new OrthRuleset([
  ...OrthRule.or(ph.c, 'qu', null, ['e', 'i']),
  ...OrthRule.or(ph.z, 'c', null, ['e', 'i']),
  ...OrthRule.or(ph.j, 'g', null, ['e', 'i']),
  ...OrthRule.or(ph.g, 'gu', null, ['e', 'i']),
  new OrthRule(ph.rr, 'r', '#'),
  new OrthRule(ph.b, [{freq: 50, output: 'b'}, {freq: 50, output: 'v'}]),
  ...OrthRule.or(_, [{freq: 40, output: 'h'}, {freq: 60, output: '*'}], '#', [
    'a',
    'e',
    'i',
    'o',
    'u'
  ])
])

Spanish.fillLexicon([
  ['c', 'e', 's', 'o'],
  ['c', 'a', 's', 'a'],
  ['rr', 'o', 'b', 'l', 'e'],
  ['p', 'e', 'rr', 'o'],
  ['p', 'e', 'r', 'o'],
  ['j', 'u', 'g', 'o'],
  ['j', 'i', 'r', 'a', 'f', 'e'],
  ['g', 'e', 'rr', 'a'],
  ['g', 'a', 'n', 'a'],
  ['z', 'e', 't', 'a'],
  ['c', 'a', 's', 'a', 'r'],
  ['c', 'a', 'z', 'a', 'r'],
  ['z', 'a', 'p', 'a', 't', 'e', 'r', 'o'],
  ['a', 'b', 'l', 'a', 'r'],
  ['a', 'b', 'l', 'o'],
  ['u', 'e', 'b', 'o'],
  ['u', 'e', 'b', 'o', 's'],
  ['b', 'i', 'e', 'j', 'o'],
  ['l', 'e', 'e', 'r']
])

const freq1 = {_freq: 1, _end: true}

const SpVowels = {
  _freq: 1,
  a: freq1,
  e: freq1,
  i: freq1,
  o: freq1,
  u: freq1
}

const aeo = {
  _freq: 1,
  a: freq1,
  e: freq1,
  o: freq1,
  u: freq1
}

const aie = {
  _freq: 1,
  a: freq1,
  i: freq1,
  e: freq1,
  o: freq1
}

const iu = {
  _freq: 1,
  i: aeo,
  u: aie
}

const SpApproxs = {
  _freq: 1,
  u: aie,
  l: SpVowels,
  r: SpVowels,
  i: aeo
}

Spanish.phonotacticConstraints.onsets = {
  p: SpApproxs,
  b: SpApproxs,
  t: {
    _freq: 1,
    r: SpVowels,
    u: aie,
    a: freq1,
    i: freq1,
    e: freq1,
    o: freq1
  },
  d: {
    _freq: 1,
    r: SpVowels,
    u: aie,
    a: freq1,
    i: freq1,
    e: freq1,
    o: freq1
  },
  ch: SpVowels,
  c: SpApproxs,
  g: SpApproxs,
  rr: iu,
  f: SpApproxs,
  z: iu,
  s: iu,
  j: {
    _freq: 1,
    u: aie,
    a: freq1,
    i: freq1,
    e: freq1,
    o: freq1
  },
  m: iu,
  n: iu,
  ñ: {
    _freq: 1,
    a: freq1,
    e: freq1,
    o: freq1,
    u: freq1
  },
  l: iu,
  ll: SpVowels,
  i: aeo,
  u: aie,
  a: freq1,
  e: freq1,
  o: freq1
}

Spanish.phonotacticConstraints.codas = {
  d: {_freq: 0.2, _end: true},
  r: {_freq: 1, _end: true},
  s: {_freq: 4, _end: true},
  n: {_freq: 2, _end: true},
  j: {_freq: 0.01, _end: true},
  z: {_freq: 0.5, _end: true},
  l: {_freq: 1, _end: true},
  i: {_freq: 0.25, _end: true},
  u: {_freq: 0.25, _end: true}
}

Spanish.phonotacticConstraints.excludedRimes = {
  i: {
    i: {_end: true},
    u: {_end: true}
  },
  u: {
    i: {_end: true},
    u: {_end: true}
  }
}

Spanish.generateMorphs(20)

// console.log(
//   new Word(
//     ['rr', 'o', 'b', 'l', 'e'].map(graph => Spanish.phonemicInventory[graph])
//   )
// )
// console.log(Spanish.orthographicRules.ruleset[8])

const Spanish2 = Spanish.copy()
Spanish2.name = 'Spanglish'
const Spanish3 = Spanish.copy()
Spanish3.name = 'Zpanish'

export default [Spanish, Spanish2, Spanish3]
