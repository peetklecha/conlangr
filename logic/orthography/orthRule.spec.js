/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {Word, OrthRule, OrthRuleset, Phoneme, _, ___, segments} from '../'
import {__} from '../phone/boundaries'

function word(...graphArr) {
  const phon = graphArr.map(underlyingGraph => ({
    underlyingGraph,
    isBoundary: false
  }))
  return new Word(phon, null, null)
}

const k = Phoneme.from('k')
const e = Phoneme.from('e')
const s = Phoneme.from('s')
const i = Phoneme.from('i')
const o = Phoneme.from('o')
const a = Phoneme.from('a')

function word2(orth, ...phonArr) {
  return new Word(phonArr, null, null)
}

const a_ = word('a')
const an = word('a', 'n')
const them = word('th', 'e', 'm')
const emptyRS = new OrthRuleset([])

const queso = word2('ceso', k, e, s, o)
const casa = word2('casa', k, a, s, a)
const queque = word2('cece', k, e, k, e)
const esquequi = word2('esceci', e, s, k, e, k, i)
const spanishKRule = new OrthRule(k, 'qu', null, 'e')
const spanishKRule2 = new OrthRule(k, 'qu', null, 'i')
const spanish1 = new OrthRuleset([spanishKRule])
const spanish2 = new OrthRuleset([spanishKRule, spanishKRule2])
const allSpanishKRules = OrthRule.or(k, 'qu', null, ['e', 'i'])
const spanish3 = new OrthRuleset(allSpanishKRules)

const quequeTarget = ['#', ' ', 'qu', ' ', 'e', '.', 'qu', ' ', 'e', ' ', '#']
const quesoTarget = ['#', ' ', 'qu', ' ', 'e', '.', 's', ' ', 'o', ' ', '#']
const esquequiTarget = [
  '#',
  ' ',
  'e',
  ' ',
  's',
  '.',
  'qu',
  ' ',
  'e',
  '.',
  'qu',
  ' ',
  'i',
  ' ',
  '#'
]

describe('Word', () => {
  it('correctly initializes .phon', () => {
    expect(a_.phon.segmentalTier.length).to.be.equal(5)
    expect(a_.phon.segmentalTier[0]).to.be.equal(___)
    // // expect(a_.phon[1]).to.be.equal(a)
    // expect(a_.phon[2]).to.be.equal(___)
    // expect(a_.phon[0].underlyingGraph).to.be.equal('#')
    // expect(a_.phon[1].underlyingGraph).to.be.equal('a')
    // expect(a_.phon[2].underlyingGraph).to.be.equal('#')
    expect(an.phon.segmentalTier.length).to.be.equal(7)
    expect(an.phon.segmentalTier[0]).to.be.equal(___)
    // expect(an.phon[1].underlyingGraph).to.be.equal('a')
    // expect(an.phon[2]).to.be.equal(_)
    // expect(an.phon[3].underlyingGraph).to.be.equal('n')
    // expect(an.phon[4]).to.be.equal(___)
    expect(them.phon.segmentalTier.length).to.be.equal(9)
    expect(them.phon.segmentalTier[0]).to.be.equal(___)
    // expect(them.phon[1].underlyingGraph).to.be.equal('th')
    // expect(them.phon[2]).to.be.equal(_)
    // expect(them.phon[3].underlyingGraph).to.be.equal('e')
    // expect(them.phon[4]).to.be.equal(_)
    // expect(them.phon[5].underlyingGraph).to.be.equal('m')
    // expect(them.phon[6]).to.be.equal(___)
  })

  it('correctly initializes .orth', () => {
    expect(a_.orth).to.deep.equal(['#', ' ', 'a', ' ', '#'])
    expect(a_.spell()).to.be.equal('a')
    expect(an.spell()).to.be.equal('an')
    expect(them.spell()).to.be.equal('them')
  })
})

describe('OrthRuleset.apply', () => {
  it('returns the correct string given an empty ruleset', () => {
    expect(emptyRS.apply(a_)).to.deep.equal(a_.orth)
    expect(emptyRS.apply(an)).to.deep.equal(an.orth)
    expect(emptyRS.apply(them)).to.deep.equal(them.orth)
  })

  it('correctly applies one rule', () => {
    expect(spanish1.apply(casa)).to.deep.equal(casa.orth)
    expect(spanish1.apply(queso)).to.deep.equal(quesoTarget)
    expect(spanish1.apply(queque)).to.deep.equal(quequeTarget)
  })

  it('correctly applies two rules', () => {
    expect(spanish2.apply(casa)).to.deep.equal(casa.orth)
    expect(spanish2.apply(queso)).to.deep.equal(quesoTarget)
    expect(spanish2.apply(queque)).to.deep.equal(quequeTarget)
    expect(spanish2.apply(esquequi)).to.deep.equal(esquequiTarget)
  })
})

describe('OrthRuleset.or', () => {
  it('generates an array of the correct length', () => {
    expect(allSpanishKRules.length).to.be.equal(2)
  })

  it('generates the right rules', () => {
    expect(spanish3.apply(casa)).to.deep.equal(casa.orth)
    expect(queso.phon.segmentalTier[5]).to.be.equal(__)
    expect(queso.orth[5]).to.be.equal('.')
    expect(spanish3.apply(queso)).to.deep.equal(quesoTarget)
    expect(spanish3.apply(queque)).to.deep.equal(quequeTarget)
    expect(spanish3.apply(esquequi)).to.deep.equal(esquequiTarget)
  })
})
