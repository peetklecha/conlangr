import {_, ___, __} from './boundaries'

export default class Phonology {
  constructor(phonArr) {
    this.wellFormed = true
    this.simple = phonArr
    this.segmentalTier = this.addBoundaries(phonArr)
    this.syllabicTier = Array(this.segmentalTier.length)
    this.autosegmentalTier = Array(this.segmentalTier.length)
    this.parseSyllables()
    this.checkWellFormedness()
  }

  addBoundaries(phoneArr) {
    const returnArr = [___, _]
    phoneArr.forEach(phone => returnArr.push(phone, _))
    returnArr.push(___)
    return returnArr
  }

  parseSyllables() {
    let sonority = 0
    let pastNucleus = false
    // this.segmentalTier.forEach((phoneme, i) => {
    for (let i = this.segmentalTier.length - 1; i >= 0; i--) {
      const phoneme = this.segmentalTier[i]
      if (!phoneme.isBoundary) {
        if (!pastNucleus) {
          if (phoneme.sonority < sonority) {
            pastNucleus = true
          } else {
            this.syllabicTier[i + 2] = false
            this.syllabicTier[i] = true
          }
        } else if (phoneme.sonority > sonority) {
          this.segmentalTier[i + 1] = __
          this.syllabicTier[i] = true
          pastNucleus = false
        }
        sonority = phoneme.sonority
      }
    }
  }

  checkWellFormedness() {
    this.syllabicTier.forEach((bool, i) => {
      const phoneme = this.segmentalTier[i]
      if (bool) {
        if (!phoneme.canBeSyllabic) this.wellFormed = false
      } else if (phoneme.mustBeSyllabic) {
        if (this.segmentalTier[i + 2].sonority >= phoneme.sonority) {
          this.segmentalTier[i + 1] = __
        }
        if (this.segmentalTier[i - 2].sonority >= phoneme.sonority) {
          this.segmentalTier[i - 1] = __
        }
      }
    })
  }
}
