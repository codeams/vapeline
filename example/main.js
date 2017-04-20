
let lista = require('./lista')
let vapeline = require('../vapeline')

let filters = [
  {
    type: 'filter',
    attribute: 'age',
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