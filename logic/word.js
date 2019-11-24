import {parseStr} from './utils'
import {Phonology} from './'

export default class Word {
  constructor(phon, syn, sem, orth = null) {
    this.illFormed = false
    this.phon = new Phonology(phon)
    this.syn = syn
    this.sem = sem
    this.orth = orth
      ? parseStr(orth)
      : this.phon.segmentalTier.map(phoneme => phoneme.underlyingGraph)
  }

  spell() {
    return this.orth.filter(graph => !' #.'.split('').includes(graph)).join('')
  }
}

// generateOrth(ruleset) {
// 	const UR = this.phon.map(phone => phone.ortho)
// 	let done = false
// 	while(!done){
// 		const IR = UR.map(graph => )
// 	}
// }
