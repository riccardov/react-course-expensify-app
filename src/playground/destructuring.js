// const person = {
//   // name: 'Pippo',
//   age: 30,
//   location: {
//     city: 'Perugia',
//     temp: 20
//   }
// };

// const { name = 'Ciaone', age } = person;

// console.log(`${name} is ${age}.`);

// const { city, temp: temperature = 1} = person.location;

// if (city && temperature) {
//   console.log(`It's ${city} in ${temperature}`);
// }

// const book = {
//   title: 'Ego is the enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     name: 'Penguin'
//   }
// };

// const { name: publisherName = 'Self-Published'} = book.publisher;

// console.log(publisherName);

const address = ['primo', 'secondo', 'terzo', 'quarto'];
const [, , t, q] = address;
console.log(`stampiamo elemento: ${t} e pure questo: ${q}`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [primo, , terzo] = item;

console.log(primo, terzo);