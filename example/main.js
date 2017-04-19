
let lista = require('./lista')
let vapeline = require('../vapeline')

let filters = [
  {
    attributes: ['fname'],
    values: ['Alejandro', 'Ricarda'],
    permissive: true,
    caseSensitive: false
  },
  {
    attributes: ['lname'],
    values: ['Salazar'],
    permissive: true,
    caseSensitive: false
  }
]

let result = vapeline.filter(lista, filters)

console.log(result)