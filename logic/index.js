export {default as Phone} from './phone/phone'
export {default as OrthRule} from './orthography/orthRule'
export {default as OrthRuleset} from './orthography/orthRuleset'
export {default as Word} from './word'
export {default as Phoneme} from './phone/phoneme'
export {default as Phonology} from './phone/phonology'

export {default as Phonotactics} from './phone/phonotactics'
export {_, __, ___} from './phone/boundaries'

export {default as Language} from './language'

// export * as features from './phone/constants'

import * as features_ from './phone/constants'
export const features = features_

import * as segmentCreators_ from './phone/segment_creators'
export const segmentCreators = segmentCreators_

import * as segments_ from './phone/segments'
export const segments = segments_

export {default as seed} from './seed/seed'
