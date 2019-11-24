import Phoneme from './phoneme'

//
//boundaries
//
function boundary(type, graph) {
  return new Phoneme(null, graph, type)
}

export const _ = boundary('segment', ' ')
export const __ = boundary('syllable', '.')
export const ___ = boundary('word', '#')
