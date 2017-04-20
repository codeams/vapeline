
/* Bridgers */
let isDefined = x => x !== false && x !== undefined && x !== null
let isPartOf = (x, y) => y.indexOf(x) >= 0
let areEqual = (x, y, permissive, sensitive) => {
  if (!sensitive) {
    x = x.toLowerCase()
    y = y.toLowerCase()
  }

  if (permissive) return isPartOf(x, y)
  else return x === y
}

/* Transformers */
let forceArray = x => x instanceof Array ? x : [x]
let removeFalses = x => x.filter(y => isDefined(y))
let transformOptions = (options, type) => {
  let { partialMatches: permissive, caseSensitive: sensitive } = options

  if (type === 'filter') {
    let { attribute: attr, values } = options
    return { attr, values, permissive, sensitive }
  } else {
    // console.log('Running options-transform for search')
    let { attributes: attrs, value } = options
    return { attrs, value, permissive, sensitive }
  }
}

/* Sanitizers */
let sanitizeFilters = filters => {
  filters = forceArray(filters)
  filters = removeFalses(filters)

  return filters

  // TODO: Sanitize each filter accordig to its type
  // TODO: Ignore invalid filters
}

/* Filters */
let vape = (list, { attr, values, permissive, sensitive }) => {
  let output = list.filter(elem => {
    for (let index in values) {
      let satisfy = areEqual(values[index], elem[attr], permissive, sensitive)
      if (satisfy) return true
    }
    return false
  })
  return output
}

let search = (list, { attrs, value, permissive, sensitive }) => {
  // console.log('Search method called')
  // console.log('list', list)
  // console.log('attrs', attrs)
  // console.log('value', value)
  let output = list.filter(elem => {
    for (let index in attrs) {
      let satisfy = areEqual(value, elem[attrs[index]], permissive, sensitive)
      if (satisfy) return true
    }
    return false
  })
  // console.log('output', output)
  return output
}

let applyFilter = (list, filter) => {
  let { type } = filter

  if (type === 'filter') {
    let options = transformOptions(filter, 'filter')
    return vape(list, options)
  } else {
    // console.log('options before transform', filter)
    let options = transformOptions(filter, 'search')
    // console.log('options after transform', options)
    return search(list, options)
  }
}

/* Vapeline interface */
let vapeline = (list, filters) => {
  filters = sanitizeFilters(filters)

  // We asume that everything that comes out of the
  // main sanitizer is sane, if it isn't then just let
  // it crash. LOL
  let output = filters.reduce((list, filter) => {
    return applyFilter(list, filter)
  }, list)
  return output
}

module.exports = vapeline