import {Phoneme, Word, Phonotactics} from './'
import {randomFromTrie} from './utils'

export default class Language {
  constructor(name) {
    this.name = name
    this.phonemicInventory = {}
    this.orthographicRules = {}
    this.allophonicRules = []
    this.phonotacticConstraints = new Phonotactics.LanguagePhonotactics()
    this.lexicon = {}
  }

  copy() {
    const that = new Language(this.name)
    that.phonemicInventory = this.phonemicInventory
    that.orthographicRules = this.orthographicRules
    that.allophonicRules = this.allophonicRules
    that.phonotacticConstraints = this.phonotacticConstraints
    that.lexicon = this.lexicon
    return that
  }

  editName(newName) {
    const that = this.copy()
    that.name = newName
    return that
  }

  addPhoneme(phone) {
    const that = this.copy()
    that.phonemicInventory = {...this.phonemicInventory}
    that.phonemicInventory[phone.ipa] = new Phoneme(phone, phone.ipa, false)
    //update phonotactics...? nah
    return that
  }

  removePhoneme(phonemeGraph) {
    const that = this.copy()
    that.phonemicInventory = {...this.phonemicInventory}
    delete that.phonemicInventory[phonemeGraph]
    that.phonotacticConstraints = this.phonotacticConstraints.copy(
      null,
      null,
      phonemeGraph
    )
    return that
  }

  editPhoneme(oldgraph, newgraph, can, must) {
    const that = this.copy()
    that.phonemicInventory = {...this.phonemicInventory}
    that.phonemicInventory[newgraph] = that.phonemicInventory[oldgraph].edit(
      newgraph,
      can,
      must
    )
    if (oldgraph !== newgraph) {
      delete that.phonemicInventory[oldgraph]
      that.phonotacticConstraints = this.phonotacticConstraints.copy(
        oldgraph,
        newgraph
      )
    }
    return that
  }

  addOrthRule(...args) {
    const that = this.copy()
    that.orthographicRules = this.orthographicRules.addOrthRule(...args)
    return that
  }

  removeOrthRule(index) {
    const that = this.copy()
    that.orthographicRules = this.orthographicRules.removeOrthRule(index)
    return that
  }

  editOrthRule(...args) {
    const that = this.copy()
    that.orthographicRules = this.orthographicRules.editOrthRule(...args)
    return that
  }

  addPermissibleOnsets(onsets) {
    const that = this.copy()
    that.phonotacticConstraints = this.phonotacticConstraints.addPermissibleOnsets(
      onsets
    )
    return that
  }

  addPermissibleCodas(codas) {
    const that = this.copy()
    that.phonotacticConstraints = this.phonotacticConstraints.addPermissibleCodas(
      codas
    )
    return that
  }

  editPermissibleOnsetFreq(strArr, freq) {
    const that = this.copy()
    that.phonotacticConstraints = this.phonotacticConstraints.editPermissibleOnsetFreq(
      strArr,
      freq
    )
    return that
  }

  editPermissibleCodaFreq(strArr, freq) {
    const that = this.copy()
    that.phonotacticConstraints = this.phonotacticConstraints.editPermissibleCodaFreq(
      strArr,
      freq
    )
    return that
  }

  deletePermissibleCoda(strArr) {
    const that = this.copy()
    that.phonotacticConstraints = this.phonotacticConstraints.deletePermissibleCoda(
      strArr
    )
    return that
  }

  deletePermissibleOnset(strArr) {
    const that = this.copy()
    that.phonotacticConstraints = this.phonotacticConstraints.deletePermissibleOnset(
      strArr
    )
    return that
  }

  getPhones() {
    return Object.values(this.phonemicInventory).map(
      phoneme => phoneme.underlyingPhone
    )
  }

  fillInventory(dict) {
    Object.keys(dict).forEach(graph => {
      this.phonemicInventory[graph] = new Phoneme(dict[graph], graph)
    })
  }

  fillLexicon(arr) {
    console.log('yep!')
    arr.forEach(graphArr => {
      const word = new Word(
        graphArr.map(graph => this.phonemicInventory[graph]),
        null,
        null
      )
      word.orth = this.orthographicRules.apply(word)
      this.lexicon[word.spell()] = word
    })
  }

  generateMorphs(n) {
    let trie
    const collector = []
    let status
    let anotherSyllable = 0.8
    for (let _ = 0; _ < n; _++) {
      console.group()
      status = 'onsets'
      const innerCollector = []
      trie = this.phonotacticConstraints.onsets
      while (status !== 'done') {
        let key = randomFromTrie(trie)
        innerCollector.push(key)
        if (trie[key]._end) {
          status = status === 'onsets' ? 'codas' : 'done'
          if (status === 'codas') trie = this.phonotacticConstraints.codas
        } else trie = trie[key]
        if (status === 'done') {
          if (Math.random() < anotherSyllable) {
            status = 'onset'
            trie = this.phonotacticConstraints.onsets
            anotherSyllable /= 3
          } else anotherSyllable = 0.8
        }
      }
      collector.push(innerCollector)
      console.groupEnd()
    }
    this.fillLexicon(collector)
  }
}
