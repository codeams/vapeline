
let lista = require('./lista')
let vapeline = require('../vapeline2')

let filters = [
  {
    type: 'filter',
    attribute: 'fname',
    values: ['Ricarda', 'Alejandro'],
    partialMatches: true,
    caseSensitive: false
  },
  {
    type: 'search',
    attributes: ['lname'],
    value: 'salazar',
    partialMatches: true,
    caseSensitive: false
  }
]

let result = vapeline(lista, filters)

console.log('RESULT', result)