
/* Transformers */
let forceArray = obj => obj instanceof Array ? obj : [obj]

/* Information bridgers */
let isPartOf = (substr, str) => str.indexOf(substr) >= 0


/* The actual vapeline */
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

      if (isPartOf(value, compareTo)) {
        satisfy = true
        break
      }
    }
    return satisfy
  })
}

let pipe = (list, filters) => {
  filters = forceArray(filters)
  
  return filters.reduce((list, filter) => {
    let { attribute: attr } = filter
    let { values: values } = filter
    let { partialMatches: permissive } = filter
    let { caseSensitive: sensitive } = filter

    return vape(list, attr, values, permissive, sensitive)
  }, list)
}

/* Exporting vapes */
let vapeline = { vape, pipe }
module.exports = vapeline
