import * as f from './constants'
import Phone from './phone'

export const voicedSegment = (manner, active, passive, ipa) =>
  new Phone(f.VOICED, f.PULMONIC, manner, active, passive, ipa)

export const voicelessSegment = (manner, active, passive, ipa) =>
  new Phone(f.VOICELESS, f.PULMONIC, manner, active, passive, ipa)

const h = voicelessSegment(null, null, null, 'h')
const H = voicedSegment(null, null, null, 'ɦ')

export const vclsPlosive = (active, passive, ipa) => {
  const seg = voicelessSegment(f.STOP, active, passive, ipa)
  seg.release = H
  seg.tableRow = 'Plosive'
  return seg
}

export const aspiratedPlosive = (active, passive, ipa) => {
  const seg = voicelessSegment(f.STOP, active, passive, ipa)
  seg.release = h
  return seg
}

export const vcdPlosive = (active, passive, ipa) => {
  const seg = voicedSegment(f.STOP, active, passive, ipa)
  seg.release = H
  seg.tableRow = 'Plosive'
  return seg
}

export const tap = (active, passive, ipa) => {
  const seg = voicedSegment(f.STOP, active, passive, ipa)
  seg.tableRow = 'Tap'
  return seg
}

export const trill = (active, passive, ipa) => {
  const seg = voicedSegment(f.TRILL, active, passive, ipa)
  seg.tableRow = 'Trill'
  return seg
}

export const vcdFricative = (active, passive, ipa) => {
  const seg = voicedSegment(f.FRICATIVE, active, passive, ipa)
  seg.TableRow = 'Fricative'
  return seg
}

export const vclsFricative = (active, passive, ipa) => {
  const seg = voicelessSegment(f.FRICATIVE, active, passive, ipa)
  seg.tableRow = 'Fricative'
  return seg
}

export const vcdAffricate = (active, passive, release, ipa) => {
  if (release.phonation !== f.VOICED)
    throw new Error('Validation Error: mismatching phonation in fricative')
  const seg = vcdPlosive(active, passive, ipa)
  seg.release = release
  seg.mainTable = false
  return seg
}

export const vclsAffricate = (active, passive, release, ipa) => {
  if (release.phonation !== f.VOICELESS)
    throw new Error('Validation Error: mismatching phonation in fricative')
  const seg = vclsPlosive(active, passive, ipa)
  seg.release = release
  seg.mainTable = false
  return seg
}

export const nasal = (active, passive, ipa) => {
  const seg = vcdPlosive(active, passive, ipa)
  seg.nasal = true
  seg.tableRow = 'Nasal'
  return seg
}

export const vocoid = (manner, active, passive, ipa) =>
  new Phone(f.VOICED, f.PULMONIC, manner, active, passive, ipa)

export const vowel = (height, backness, ipa) =>
  vocoid(height, f.DORSAL, backness, ipa)

export const polyphthong = (
  height,
  backness,
  onglide = null,
  offglide = null,
  ipa
) => {
  const seg = vowel(height, backness, ipa)
  seg.presegment = onglide
  seg.release = offglide
  return seg
}

export const lateral = (manner, active, passive, ipa) => {
  const seg = vcdPlosive(active, passive, ipa)
  seg.lateral = manner
  seg.tableRow = manner === f.HIGH ? 'Lateral Approximant' : 'Lateral Fricative'
  return seg
}
