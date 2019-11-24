import {expect} from 'chai'
import {seed} from '../'
import {trieContainsPath} from '../utils'

const Spanish1 = seed[0].copy()
const lex = Spanish1.lexicon
const px = Spanish1.phonotacticConstraints
const inv = Spanish1.phonemicInventory

const Spanish2 = seed[0].copy()

describe('phontactic parsing', () => {
  it('produces correct number of syllables', () => {
    // console.log('LEX.QUESO', lex.queso)
    // console.log(px)
    expect(px.parse(lex.queso).length).to.be.equal(2)
  })

  it('correctly structures syllables', () => {
    expect(px.parse(lex.queso)[0].onset.includes(inv.c)).to.be.equal(true)
    expect(px.parse(lex.queso)[0].onset.length).to.be.equal(1)
    expect(px.parse(lex.queso)[0].rime.nucleus).to.be.equal(inv.e)
    expect(px.parse(lex.queso)[0].rime.coda.length).to.be.equal(0)
    expect(px.parse(lex.leer)[0].spell()).to.be.equal('.l(e).')
    expect(px.parse(lex.leer)[1].spell()).to.be.equal('.(e)r.')
  })
})

describe('phonotactics.changeAll', () => {
  it('replaces labels correctly', () => {
    expect(
      Spanish2.phonotacticConstraints.changeAll('c', 'k').onsets.c
    ).to.be.equal(undefined)
    expect(
      !!Spanish2.phonotacticConstraints.changeAll('c', 'k').onsets.k
    ).to.be.equal(true)
  })
  it('removes labels correctly', () => {
    expect(
      Spanish2.phonotacticConstraints.changeAll(null, null, 'c').onsets.c
    ).to.be.equal(undefined)
    expect(!!Spanish2.phonotacticConstraints.onsets.c).to.be.equal(true)
  })
})

describe('addPermissibleOnsets', () => {
  it('adds onsets correctly', () => {
    expect(trieContainsPath(px.onsets, ['j', 'ch'])).to.be.equal(false)
    console.log(px.addPermissibleOnsets([['j', 'ch']]).onsets)
    expect(
      trieContainsPath(px.addPermissibleOnsets([['j', 'ch']]).onsets, [
        'j',
        'ch'
      ])
    ).to.be.equal(true)
  })
})

describe('editPermissibleOnsetFreq', () => {
  it('edits freq correctly', () => {
    expect(px.onsets.t.r.u._freq).to.be.equal(1)
    expect(
      px.editPermissibleOnsetFreq(['t', 'r', 'u'], 2).onsets.t.r.u._freq
    ).to.be.equal(2)
  })
})

describe('deletePermissibleOnset', () => {
  it('deletes correctly', () => {
    expect(trieContainsPath(px.onsets, ['t', 'r', 'u'])).to.be.equal(true)
    expect(trieContainsPath(px.onsets, ['t', 'r'])).to.be.equal(true)
    expect(trieContainsPath(px.onsets, ['t', 'u'])).to.be.equal(true)

    expect(
      trieContainsPath(px.deletePermissibleOnset(['t', 'r']).onsets, [
        't',
        'r',
        'u'
      ])
    ).to.be.equal(false)
    expect(
      trieContainsPath(px.deletePermissibleOnset(['t', 'r']).onsets, ['t', 'r'])
    ).to.be.equal(false)
    expect(
      trieContainsPath(px.deletePermissibleOnset(['t', 'r']).onsets, ['t', 'u'])
    ).to.be.equal(true)
  })
})
