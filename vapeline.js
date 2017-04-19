
let forceArray = x => x instanceof Array ? x : [x]

let isPartOf = (x, y) => y.indexOf(x) >= 0

let compare = (x, y, permissive) => permissive ? isPartOf(x, y) : x === y

/**
 * The vape:
 * Take a list, an attribute name and an array of values,
 * return a list with the elements in which the attribute matches
 * (according to the options) one or more of the given values.
 */
let vape = (list, attr, values, permissive, sensitive) => {
  return list.filter(element => {
    let satisfy = false
    for (let index in values) {
      let value = values[index]
      let compareTo = element[attr]

      if (!sensitive) { // Of course, false by default
        value = value.toLowerCase()
        compareTo = compareTo.toLowerCase()
      }

      if (compare(value, compareTo, permissive)) {
        satisfy = true
        break
      }
    }

    return satisfy
  })
}

/**
 * The pipe:
 * Takes an array of filters and vape them
 */
let pipe = (list, filters) => {
  filters = forceArray(filters)

  return filters.reduce((list, filter) => {
    if (!filter) return list

    let { attribute: attr } = filter
    let { values } = filter
    let { partialMatches: permissive } = filter
    let { caseSensitive: sensitive } = filter

    values = forceArray(values)

    return vape(list, attr, values, permissive, sensitive)
  }, list)
}

export default { vape, pipe }
