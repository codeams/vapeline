
/* Transformers */
let forceArray = obj => obj instanceof Array ? obj : [obj]
let arrayToLowerCase = arr => arr.map(elem => elem.toLowerCase())

/* Information bridgers */
let isPartOf = (substr, str) => str.indexOf(substr) >= 0

/* The actual vapeline */
let filterBy = (list, attribute, values, permissive, caseSensitive) => {
  if (caseSensitive) { // Of course, false by default
    attribute = attribute.toLowerCase()
    values = arrayToLowerCase(values)
  }

  return list.filter(element => {
    let satisfy = false
    for (let index in values) {
      if (isPartOf(values[index], element[attribute])) {
        satisfy = true
        break
      }
    }
    return satisfy
  })
}

let filter = (list, filters) => {
  filters = forceArray(filters)
  
  return filters.reduce((list, { attribute, values, permissive, caseSensitive }) => {
    return filterBy(list, attribute, values, permissive, caseSensitive)
  }, list)
}

/* Exporting vapes */
let vapeline = { filterBy, filter }
module.exports = vapeline
