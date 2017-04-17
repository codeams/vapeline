
let lista = require('./lista').lista
let vapeline = require('../vapeline')

let filters = [
  {
    attribute: 'name',
    value: 'Alejandro',
    permissive: true,
    caseSensitive: false
  },
  {
    attribute: 'name',
    value: 'Montañez',
    permissive: true,
    caseSensitive: false
  }
]

let result = vapeline.filter(lista, filters)

console.log(result)