import * as segments from './segments'

export default class Phoneme {
  constructor(phone, graph, boundary) {
    this.isBoundary = !!boundary
    this.boundaryType = boundary
    this.underlyingPhone = phone
    this.underlyingGraph = graph
    this.sonority = this.isBoundary ? null : this.underlyingPhone.sonority
    this.canBeSyllabic = this.sonority > 3
    this.mustBeSyllabic = this.sonority > 4
  }

  copy() {
    const that = new Phoneme(
      this.underlyingPhone,
      this.underlyingGraph,
      this.boundaryType
    )
    that.canBeSyllabic = this.canBeSyllabic
    that.mustBeSyllabic = this.mustBeSyllabic
    return that
  }

  edit(graph, can, must) {
    const that = this.copy()
    that.underlyingGraph = graph
    that.canBeSyllabic = can
    that.mustBeSyllabic = must
    return that
  }
}

Phoneme.from = function(graph) {
  return new Phoneme(segments[graph], graph, false)
}
