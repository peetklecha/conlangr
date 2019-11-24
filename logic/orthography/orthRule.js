export default class OrthRule {
  constructor(target, output, after = null, before = null) {
    this.id = 0
    this.target = target
    // this.output = typeof output === string ? output :
    this.orthoPrior = after
    this.orthoPost = before
    if (typeof output === 'string') this.output = output
    else this.makeProbabilistic(...output)
  }

  // copy(){
  // 	return new OrthRule(this.target, this.output, this.orthoPrior, this.orthoPost)
  // }

  // edit(target, output, after, before){
  // 	return new OrthRule()
  // }

  makeProbabilistic(...arr) {
    const probSum = arr.reduce((x, y) => x + y.freq, 0)
    if (probSum !== 1)
      arr.forEach(obj => {
        obj.freq = obj.freq / probSum
      })
    this.output = arr
    return this
  }

  pickOutput() {
    if (typeof this.output === 'string') return this.output
    const rand = Math.random()
    let sum = 0
    for (let i = 0; i < this.output.length; i++) {
      sum += this.output[i].freq
      if (rand <= sum) {
        return this.output[i].output
      }
    }
    throw new Error('Probabilistic rule error! Failed to pick output.')
  }

  matchEnvironment(before, after) {
    return (
      (!this.orthoPrior || this.orthoPrior === before) &&
      (!this.orthoPost || this.orthoPost === after)
    )
  }

  match(graphBefore, phone, graphAfter) {
    return (
      phone === this.target && this.matchEnvironment(graphBefore, graphAfter)
    )
  }

  apply(UR, IR, index) {
    const offset = UR[index].isBoundary ? 1 : 2
    let output = this.pickOutput()
    if (output === '*') {
      return IR[index]
    }
    return this.match(IR[index - offset], UR[index], IR[index + offset])
      ? output
      : IR[index]
  }
}

OrthRule.or = function(target, output, after, before) {
  if (Array.isArray(after) && !Array.isArray(before)) {
    return after.map(
      condition => new OrthRule(target, output, condition, before)
    )
  } else if (Array.isArray(before) && !Array.isArray(after)) {
    return before.map(
      condition => new OrthRule(target, output, after, condition)
    )
  } else throw new Error('Either too many or too few conditions.')
}
