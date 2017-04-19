
let lista = require('./lista')
let vapeline = require('../vapeline')

let filters = [
  {
    attribute: 'fname',
    values: ['Alejandro', 'Ricarda'],
    partialMatches: true,
    caseSensitive: false
  },
  {
    attribute: 'lname',
    values: ['salazar'],
    partialMatches: true,
    caseSensitive: true
  }
]

let result = vapeline.filter(lista, filters)

console.log(result)