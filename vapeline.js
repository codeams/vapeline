
let isPartOf = (substr, str) => {
  return str.indexOf(substr) >= 0
}

let filterBy = (list, attribute, value, permissive, caseSensitive) => {
  if (caseSensitive) { // Of course, false by default
    attribute = attribute.toLowerCase()
    value = value.toLowerCase()
  }

  if (permissive) return list.filter((element) => { // Also false by default
    return isPartOf(value, element[attribute])
  })
  else return list.filter((element) => {
    return value === element[attribute]
  })
}

let filter = (list, filters) => {
  if (!(filters instanceof Array)) filters = [filters]

  filters.forEach(function(filter) {
    list = filterBy(list, filter.attribute, filter.value, filter.permissive)
  })

  return list
}

module.exports = {
  isPartOf: isPartOf,
  filterBy: filterBy,
  filter: filter
}