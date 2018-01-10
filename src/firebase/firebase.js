import * as firebase from 'firebase';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);
const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

// // const onValueChange = database.ref('expenses').on('value', (snapshot) => {
// //   const expenses = [];
    
// //     snapshot.forEach((childSnapshot) => {
// //       expenses.push({
// //         id: childSnapshot.key,
// //         ...childSnapshot.val()
// //       });
// //     });

// //     console.log(expenses);
// //   }, (e) => {
// //     console.log('Error fetching data', e);
// //   });

// database.ref('expenses').on('child_removed', (snapshot) => {
//   console.log("CHILD REMOVED", snapshot.val());
// });

// database.ref('expenses').on('child_changed', (snapshot) => {
//   console.log("CHILD CHANGED", snapshot.val());
// });

// database.ref('expenses').on('child_added', (snapshot) => {
//   console.log("CHILD ADDED", snapshot.val());
// });


// database.ref('expenses').push({
//   description: 'Gum',
//   note: '',
//   amount: 195,
//   createdAt: 0
// });

// // database.ref('notes/-L20T4i_gxJf5PjYysg7').update({
// //   body: 'this is the new note'
// // });
// setTimeout(() => {
//   database.ref('expenses').push({
//     description: 'Gum',
//     note: '',
//     amount: 195,
//     createdAt: 0
//   });
// }, 2000);

// setTimeout(() => {
//   database.ref('expenses').push({
//     description: 'Gum',
//     note: '',
//     amount: 195,
//     createdAt: 0
//   });
// }, 4000);

// // const firebaseNotes = {
// //   notes: {
// //     a34k5345: {

// //     },
// //     kgj3hg534: {
// //       title: 'Second note',
// //       body: 'Another body note'
// //     }
// //   }
// // };

// // database.ref('notes').set(firebaseNotes);

// // const onValueChange = database.ref().on('value', (snapshot) => {
// //     const {name, job: {title, company} } = snapshot.val();
// //     console.log(`${name} is a ${title} at ${company}.`)
// //   }, (e) => {
// //     console.log('Error fetching data', e);
// //   });

// // database
// //   .ref()
// //   .set({
// //   name: 'Riccardo',
// //   age: 34,
// //   stressLevel: 5,
// //   job: {
// //     title: 'developer',
// //     company: 'aziendona'
// //   },
// //   isSingle: false,
// //   location: {
// //     city: 'Perugia',
// //     region: 'Umbria',
// //     country: 'Italy'
// //   }
// // }).then(() => {
// //   console.log('Data is saved');
// // }).catch((error) => {
// //   console.log('Data is NOT saved', error);
// // });

// // setTimeout(() => {
// //     database.ref('job/title').set('coglionazzo');
// //   }, 3500);

// // setTimeout(() => {
// //     database.ref('job/company').set('malwarebytes');
// //   }, 7000);

// // setTimeout(() => {
// //     database.ref('name').set('fantocci');
// //   }, 10500);

// // database.ref()
// //   .once('value')
// //   .then((snapshot) => {
// //     const val = snapshot.val();
// //     console.log(val);
// //   })
// //   .catch((e) => {
// //     console.log('Error fetching data', e);
// //   });

// // database
// //   .ref()
// //   .set({
// //   name: 'Riccardo',
// //   age: 34,
// //   stressLevel: 5,
// //   job: {
// //     title: 'developer',
// //     company: 'aziendona'
// //   },
// //   isSingle: false,
// //   location: {
// //     city: 'Perugia',
// //     region: 'Umbria',
// //     country: 'Italy'
// //   }
// // }).then(() => {
// //   console.log('Data is saved');
// // }).catch((error) => {
// //   console.log('Data is NOT saved', error);
// // });

// // database.ref().update({
// //   stressLevel: 9,
// //   'job/company': 'aziendona2',
// //   'location/city': 'Foligno'
// // }).then(() => {
// //   console.log("Data updated");
// // }).catch((e) => {
// //   console.log("Error updating data", e);
// // });

// // // .set(null) è come .remove()
// // database.ref('isSingle').set(null).then(() => {
// //     console.log('Data removed');
// //   }).catch((e) => {
// //     console.log('Error removing data', e);
// //   });

  
// // database.ref().remove().then(() => {
// //   console.log('Data removed');
// // }).catch((e) => {
// //   console.log('Error removing data', e);
// // });