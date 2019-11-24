'use strict'
/* global describe it */
import {expect} from 'chai'
import seed from './seed'
import {Word} from '../'

// const seed = require('./seed')

// describe('seed script', () => {
//   it('completes successfully', seed)
// })

// const [Spanish] = require('./seed')

const Spanish = seed[0]

describe('seed script', () => {
  it('completes successfully', () => {
    expect(!!Spanish.phonemicInventory.a).to.be.equal(true)
    expect(!!Spanish.lexicon.casa).to.be.equal(true)
  })

  it('applies its Orthographic rules properly', () => {
    expect(
      Spanish.orthographicRules.apply(Spanish.lexicon.queso)
    ).to.deep.equal(['#', ' ', 'qu', ' ', 'e', '.', 's', ' ', 'o', ' ', '#'])
  })
})
