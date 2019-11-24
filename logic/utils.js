/* eslint-disable guard-for-in */
export function parseStr(str) {
  return ('#' + str + '#')
    .split('')
    .join(' ')
    .split('')
}

export function randomFromTrie(trie) {
  console.log(Object.keys(trie))
  let total = Object.keys(trie)
    .filter(key => key !== '_freq')
    .reduce((prev, key) => {
      console.log(prev, trie[key]._freq)
      return prev + trie[key]._freq
    }, 0)
  let random = Math.random()
  console.log(total)
  console.log(random)
  let current = 0
  for (let key in trie) {
    if (key !== '_freq') {
      current += trie[key]._freq / total
      console.log(current)
      if (random < current) return key
    }
  }
  throw new Error('Failed to return a key.')
}

export function deepCopy(obj, oldKey, newKey, removing) {
  const that = {}
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object') {
      if (removing !== key)
        that[oldKey === key ? newKey : key] = deepCopy(obj[key], oldKey, newKey)
    } else that[oldKey === key ? newKey : key] = obj[key]
  })
  return that
}

export function trieContainsPath(trie, strArr) {
  let current = trie
  for (let i = 0; i < strArr.length; i++) {
    if (!current[strArr[i]]) return false
    current = current[strArr[i]]
  }
  return true
}

export function addToTrie(trie, arr, withFreq) {
  arr.forEach(strArr => {
    let pointer = trie
    strArr.forEach(graph => {
      if (!pointer[graph]) pointer[graph] = withFreq ? {_freq: 1} : {}
      pointer = pointer[graph]
    })
    pointer._end = true
  })
}

export function trieAt(trie, strArr) {
  let pointer = trie
  let notFound = false
  strArr.forEach(graph => {
    if (!notFound) {
      if (!pointer[graph]) notFound = true
      else pointer = pointer[graph]
    }
  })
  if (notFound) return
  return pointer
}
