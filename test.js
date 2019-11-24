function deepCopy(obj, oldKey, newKey) {
  const that = {}
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object') {
      that[oldKey === key ? newKey : key] = deepCopy(obj[key], oldKey, newKey)
    } else that[oldKey === key ? newKey : key] = obj[key]
  })
  return that
}

function trieContainsPath(trie, strArr) {
  let current = trie
  for (let i = 0; i < strArr.length; i++) {
    if (!current[strArr[i]]) return false
  }
  return true
}

module.exports = trieContainsPath
