import OrthRule from './orthRule'

/*eslint-disable no-loop-func*/
// import {_, __, ___} from './phone/boundaries'

// export default class OrthRuleset {
class OrthRuleset {
  constructor(ruleset) {
    this.ruleset = ruleset
    // this.ruleset.forEach((rule, i) => {
    //   rule.id = i
    // })
    // this.nextId = this.ruleset.length
  }

  copy() {
    return new OrthRuleset([...this.ruleset])
  }

  addOrthRule(target, output, after, before) {
    const that = this.copy()
    that.ruleset.push(new OrthRule(target, output, after, before))
    return that
  }

  removeOrthRule(index) {
    const that = this.copy()
    that.ruleset.splice(index, 1)
    return that
  }

  editOrthRule(id, target, output, after, before) {
    const that = this.copy()
    that.ruleset[id] = new OrthRule(target, output, after, before)
  }

  apply(word) {
    const UR = word.phon.segmentalTier
    let IR = word.orth
    let changed = true
    let counter = 0
    while (changed) {
      changed = false
      IR = IR.map((graph, i) => {
        for (let j = 0; j < this.ruleset.length; j++) {
          const result = this.ruleset[j].apply(UR, IR, i)
          if (result !== IR[i]) {
            changed = true
            return result
          }
        }
        return graph
      })
      if (++counter >= 100)
        throw new Error('orthographic rule application is taking too long.')
    }
    return IR
  }
}

export default OrthRuleset
// module.exports = OrthRuleset
