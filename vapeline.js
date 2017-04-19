
/* Transformers */
let arrayToLowerCase = arr => arr.map(elem => elem.toLowerCase())

/* Information bridgers */
let isPartOf = (substr, str) => str.indexOf(substr) >= 0

/* The actual vapeline */
let filterBy = (list, attributes, values, permissive, caseSensitive) => {
  if (caseSensitive) { // Of course, false by default
    attributes = arrayToLowerCase(attributes)
    values = arrayToLowerCase(values)
  }

  /*MIDDLE IMPLEMENTATION*/
  let attribute = attributes[0]
  /*END MIDDLE IMPLEMENTATION*/

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
  //if (!(filters instanceof Array)) filters = [filters]
  filters.forEach(filter => {
    list = filterBy(list, filter.attributes, filter.values, filter.permissive, filter.caseSensitive)
  })

  return list
}

let vapeline = {
  isPartOf: isPartOf,
  filterBy: filterBy,
  filter: filter
}

module.exports = vapeline