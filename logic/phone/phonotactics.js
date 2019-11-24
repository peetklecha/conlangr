/* eslint-disable complexity */
// import {Syllable} from './logic'
import {deepCopy, addToTrie, trieAt} from '../utils'

class Syllable {
  constructor() {
    this.onset = []
    this.rime = {nucleus: null, coda: []}
    this.parsing = 'onset'
  }

  spell() {
    return (
      '.' +
      this.onset.map(phoneme => phoneme.underlyingGraph).join(' ') +
      '(' +
      this.rime.nucleus.underlyingGraph +
      ')' +
      this.rime.coda.map(phoneme => phoneme.underlyingGraph).join(' ') +
      '.'
    )
  }

  contains(phoneme) {
    return (
      this.onset.includes(phoneme) ||
      this.rime.nucleus === phoneme ||
      this.rime.coda.includes(phoneme)
    )
  }

  setOnset(arr) {
    this.onset = arr
    this.parsing = 'nucleus'
    this.initial = arr.length ? arr[0] : null
    return this
  }

  setNucleus(phoneme) {
    this.rime.nucleus = phoneme
    this.parsing = 'rime'
    return this
  }

  setCoda(arr) {
    this.rime.coda = arr
    this.parsing = 'onset'
    this.final = arr.length ? arr[arr.length - 1] : null
    return this
  }

  done() {
    this.parsing = 'done'
  }
}

class LanguagePhonotactics {
  constructor() {
    this.onsets = {}
    this.codas = {}
    this.excludedOnsets = {}
    this.excludedRimes = {}
    this.parser = {
      syll: null,
      store: [],
      node: this.onsets,
      tier: []
    }
  }

  copy() {
    const that = new LanguagePhonotactics()
    that.onsets = this.onsets
    that.codas = this.codas
    that.excludedRimes = this.excludedRimes
    that.excludedOnsets = this.excludedOnsets
    that.parser = this.parser
    return that
  }

  changeAll(oldGraph, newGraph, removing) {
    const that = new LanguagePhonotactics()
    that.onsets = deepCopy(this.onsets, oldGraph, newGraph, removing)
    that.codas = deepCopy(this.codas, oldGraph, newGraph, removing)
    that.excludedOnsets = deepCopy(
      this.excludedOnsets,
      oldGraph,
      newGraph,
      removing
    )
    that.excludedRimes = deepCopy(
      this.excludedRimes,
      oldGraph,
      newGraph,
      removing
    )
    that.parser = {
      syll: null,
      store: [],
      node: that.onsets,
      tier: []
    }
    return that
  }

  addPermissibleOnsets(onsets) {
    const that = this.copy()
    that.onsets = deepCopy(this.onsets)
    addToTrie(that.onsets, onsets)
    return that
  }

  addPermissibleCodas(codas) {
    const that = this.copy()
    that.codas = deepCopy(this.codas)
    addToTrie(that.codas, codas)
    return that
  }

  editPermissibleOnsetFreq(strArr, freq) {
    const that = this.copy()
    that.onsets = deepCopy(this.onsets)
    const trie = trieAt(that.onsets, strArr)
    if (trie) trie._freq = freq
    return that
  }

  editPermissibleCodaFreq(strArr, freq) {
    const that = this.copy()
    that.codas = deepCopy(this.codas)
    const trie = trieAt(that.codas, strArr)
    if (trie) trie._freq = freq
    return that
  }

  deletePermissibleOnset(strArr) {
    const that = this.copy()
    that.onsets = deepCopy(this.onsets)
    const last = strArr.pop()
    const trie = trieAt(that.onsets, strArr)
    delete trie[last]
    return that
  }

  deletePermissibleCoda(strArr) {
    const that = this.copy()
    that.codas = deepCopy(this.codas)
    const last = strArr.pop()
    const trie = trieAt(that.codas, strArr)
    delete trie[last]
    return that
  }

  isWellFormed(syllable) {
    let onsetLookUp = this.onsets
    let badOnsetLookUp = this.excludedOnsets
    for (let i = 0; i < syllable.onset.length; i++) {
      onsetLookUp = onsetLookUp[syllable.onset[i].underlyingGraph]
      if (badOnsetLookUp)
        badOnsetLookUp = badOnsetLookUp[syllable.onset[i].underlyingGraph]
      if (!onsetLookUp || badOnsetLookUp === true) return false
    }
    if (!syllable.rime.nucleus.canBeSyllabic) return false
    let codaLookUp = this.codas
    let badCodaLookUp = this.excludedRimes[
      syllable.rime.nucleus.underlyingGraph
    ]
    for (let i = 0; i < syllable.rime.coda.length; i++) {
      codaLookUp = codaLookUp[syllable.rime.coda[i].underlyingGraph]
      if (badCodaLookUp) badCodaLookUp = badCodaLookUp[syllable.rime.coda[i]]
      if (!codaLookUp || badCodaLookUp === true) return false
    }
    return true
  }

  initParser(old = false) {
    this.parser.store = []
    this.parser.node = this.onsets
    if (old) this.parser.tier.push(this.parser.syll)
    else this.parser.tier = []
    this.parser.syll = new Syllable()
    console.log(this.parser)
  }

  valid(phoneme) {
    return !!this.parser.node[phoneme.underlyingGraph]
  }

  next(phoneme) {
    this.parser.store.push(phoneme)
    this.parser.node = this.parser.node[phoneme.underlyingGraph]
  }

  finish(yeah) {
    if (yeah) this.parser.tier.push(this.parser.syll)
  }

  makeNucleus(phoneme, ifDone) {
    this.parser.syll.setOnset(this.parser.store).setNucleus(phoneme)
    this.parser.node = this.codas
    this.parser.store = []
    this.finish(ifDone)
  }

  moveToCoda() {
    this.parser.syll
      .setNucleus(this.parser.store.pop())
      .setOnset(this.parser.store)
    this.parser.syll.parsing = 'coda'
    this.parser.store = []
    this.parser.node = this.codas
  }

  finishCoda(phoneme) {
    if (phoneme) this.parser.store.push(phoneme)
    this.parser.syll.setCoda(this.parser.store)
    this.initParser(true)
    // this.finish(ifDone)
  }

  parse(word) {
    this.initParser()
    const arr = word.phon.simple
    arr.forEach((phoneme, i) => {
      console.group(phoneme.underlyingGraph)
      if (this.parser.syll.parsing === 'onset') {
        console.log('parsing onset.')
        if (this.valid(phoneme)) {
          console.log('valid as onset.')
          const atLocalMax =
            !arr[i + 1] || phoneme.sonority > arr[i + 1].sonority
          if (atLocalMax) console.log('at local max -- making nucleus!')
          else console.log('continuining onset.')
          if (atLocalMax) this.makeNucleus(phoneme, !arr[i + 1])
          else this.next(phoneme)
        } else if (phoneme.canBeSyllabic) this.makeNucleus(phoneme, !arr[i + 1])
        else {
          console.log('not valid in onset; moving to coda')
          this.moveToCoda()
          if (this.valid(phoneme)) {
            console.log('parsing coda')
            console.log('valid in coda')
            const atLocalMin =
              !arr[i + 1] || phoneme.sonority < arr[i + 1].sonority
            if (atLocalMin) console.log('at local min -- finishing coda!')
            else console.log('continuing coda.')
            if (atLocalMin) this.finishCoda(phoneme)
            else this.next(phoneme)
          } else {
            console.log(
              'not valid in coda; wrapping up previous syllable and starting new one'
            )
            this.finishCoda()
            this.next(phoneme)
          }
          console.log(this.parser.tier[1])
        }
      } else if (this.valid(phoneme)) {
        console.log('parsing coda')
        console.log('valid in coda')
        const atLocalMin = !arr[i + 1] || phoneme.sonority < arr[i + 1].sonority
        if (atLocalMin) console.log('at local min -- finishing coda!')
        else console.log('continuing coda.')
        if (atLocalMin) this.finishCoda(phoneme, !arr[i + 1])
        else this.next(phoneme)
      } else {
        console.log(
          'not valid in coda; wrapping up previous syllable and starting new one'
        )
        this.finishCoda()
        this.next(phoneme)
      }
      console.groupEnd()
    })
    this.boundaryCheck()
    const {tier} = this.parser
    // console.log(tier)
    // console.groupEnd()
    return tier
  }

  boundaryCheck() {
    const tier = this.parser.tier
    // console.log('STARTING>>>>', ...tier) //tier.map(syll => syll.spell()))
    for (let i = 0; i < tier.length - 1; i++) {
      let done = false
      while (!done) {
        console.log(tier)
        if (tier[i].final) {
          tier[i + 1].onset.unshift(tier[i].rime.coda.pop())
          if (this.isWellFormed(tier[i + 1])) {
            tier[i + 1].setOnset(tier[i + 1].onset)
            tier[i + 1].done()
            tier[i].setCoda(tier[i].rime.coda)
            tier[i].done()
          } else {
            tier[i].coda.push(tier[i + 1].onset.shift())
            done = true
          }
        }
        done = true
        // console.log(tier.map(syll => syll.spell()))
      }
    }
  }
}

const Phonotactics = {Syllable, LanguagePhonotactics}

export default Phonotactics
