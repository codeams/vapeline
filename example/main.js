
let lista = require('./lista').lista
let vapeline = require('../vapeline')

let result = vapeline.filter(lista, [
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
])

console.log(result)