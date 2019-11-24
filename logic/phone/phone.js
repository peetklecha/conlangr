/* eslint-disable complexity */

import {
  HIGH,
  VOICED,
  VOICELESS,
  L_LABIAL,
  U_LABIAL,
  MANNER_TYPES,
  STOP,
  FRICATIVE,
  P_DENTAL,
  APICAL,
  P_ALVEOLAR,
  P_POSTALVEOLAR,
  DORSAL,
  P_FRONT,
  P_UVULAR,
  P_PHARYNGEAL,
  RADICAL,
  P_BACK
} from './constants'
import ortho, {allLetters} from './orthographicDefaults'

export default class Phone {
  constructor(phonation, airstream, manner, active, passive, ipa) {
    this.ipa = ipa
    this.phonation = phonation
    this.airstream = airstream
    this.manner = manner
    this.active = active
    this.passive = passive
    this.lateral = HIGH
    this.nasal = false
    this.release = null
    this.presegment = null
    this.lips = null
    if (active === L_LABIAL) this.lips = manner
    this.sonority = 0
    this.setSonority()
    this.tableCol = ''
    this.tableRow = ''
    this.pairIndex = +(phonation === VOICED)
    this.mainTable = true
    this.setTableCol()
  }

  is(prop) {
    return [
      this.phonation,
      this.airstream,
      this.manner,
      this.active,
      this.passive,
      this.lateral,
      this.lips === null ? null : L_LABIAL
    ].includes(prop)
  }

  setTableCol() {
    if (this.is(L_LABIAL)) {
      if (this.is(U_LABIAL)) this.tableCol = 'Bilabial'
      else if (this.is(P_DENTAL)) this.tableCol = 'Labiodental'
    } else if (this.is(APICAL)) {
      if (this.is(P_DENTAL)) this.tableCol = 'Dental'
      else if (this.is(P_ALVEOLAR)) this.tableCol = 'Alveolar'
      else if (this.is(P_POSTALVEOLAR)) this.tableCol = 'Retroflex'
    } else if (this.is(DORSAL)) {
      if (this.is(P_POSTALVEOLAR)) this.tableCol = 'Postalveolar'
      else if (this.is(P_FRONT)) this.tableCol = 'Palatal'
      else if (this.is(P_BACK)) this.tableCol = 'Velar'
      else if (this.is(P_UVULAR)) this.tableCol = 'Uvular'
    } else if (this.is(P_PHARYNGEAL) && this.is(RADICAL))
      this.tableCol = 'Pharyngeal'
    else this.tableCol = 'Glottal'
  }

  setSonority() {
    this.sonority = MANNER_TYPES.indexOf(this.manner)
    if (this.manner === STOP) {
      if (this.release && this.release.manner === FRICATIVE) {
        this.sonority += 0.4
      } else if (this.nasal) {
        this.sonority += 2.2
      } else {
        this.sonority += 0.2
      }
    }
    if (this.sonority <= 0) this.sonority = 0.1
    if (this.phonation === VOICED) this.sonority += 0.5
  }

  voice() {
    this.phonation = VOICED
    return this
  }

  devoice() {
    this.phonation = VOICELESS
    return this
  }

  round() {
    this.lips = HIGH
    return this
  }

  setOrthographicDefault() {
    const obj = {}
    allLetters.forEach(letter => {
      obj[letter] = 0
    })
    for (let i in ortho) {
      if (this.is(i)) {
        ortho[i].forEach((graph, j) => {
          obj[graph] += 1 - j / ortho[i].length
        })
      }
    }
    if (this.nasal) {
      ortho.NASAL.forEach((graph, j) => {
        obj[graph] += 1 - j / ortho.NASAL.length
      })
    }
    this.orthographicDefault = obj
  }
}

// Phone.createDefaultOrthography = function(inventory) {
// 	inventory.forEach(phone => phone.setOrthographicDefault)
// 	const done = []
// 	inventory.forEach(phone => {
// 		let max = 0
// 		for(let i in phone.orthographicDefault){
// 			if(phone.orthographicDefault[i]
// 		}
// 	})
// }
