const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('this is my resolved data');
    // reject('something went wrong!')
  }, 1500);
});

promise.then((data) => {
  console.log('1', data);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('this is my second promise');
    }, 2000);
  });
}).then((data) => {
  console.log('2', data);
}).catch((error) => {
  console.log('ops!', error);
});
