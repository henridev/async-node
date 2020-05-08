function* generatorFunction() {
  console.log("generator runing");

  let x = 5;
  yield x;
  x++;
  yield x;
  x++;
  yield x;
  x++;
  yield x;
  x++;
  console.log("pass an y parameter back");
  y = yield x;
  x += y;
  return x;
}

const iterator = generatorFunction();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next(-4));
console.log("All done return instead of yield means done executing!");
