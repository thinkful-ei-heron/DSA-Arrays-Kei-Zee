const Memory = require('./Memory');
let memory = new Memory();
class Array {
  constructor() {
    //properties go here
    this.length = 0;
    this.ptr = memory.allocate(this.length);
    this.capacity = 0;
  }
  //methods: resize, push, pop, insert, remove, get
  resize(size){
    //save old pointer to use in copy
    let oldPtr = this.ptr;
    //allocate memory (based on size ratio) and set point to new zero index
    this.ptr = memory.allocate(size*Array.SIZE_RATIO);
    //check to make sure we have not exceeded available memory addresses
    if(this.ptr === null){
      return Error;
    }
    memory.copy(this.ptr, oldPtr, size);
    //copy the old array to the new pointer
    //free the old pointer??
    this.capacity = size*Array.SIZE_RATIO;
    //set the new capacity
    this.ptr = 0;
  }
  push(value){
    //check to make sure we have capacity to add at the end of the array 
    if(this.length + 1 > this.capacity){
      //resize by +1 if necessary
      this.resize(this.length + 1);
    }
    //set the memory to the value
    memory.set(this.ptr + this.length, value);
    //increase length
    this.length++;
    return memory.get(this.ptr + this.length);
  }
  pop(){
    //check to make sure we have values to pop
    if(this.length === 0){
      return Error;
    }
    //decrement length
    this.length--;
    //get value from memory
    return memory.get(this.ptr + this.length);
  }
  insert(index, value){
    //check to make sure we have enough capacity
    if(this.ptr + 1 > this.capacity){
      //resize by +1 if necessary
      this.resize(this.length + 1);
    }
    //when inserting first we need to preserve all values following index to insert
    //copy rest of array down one pointer
    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
  }
  remove(index){
    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index);
    //reduce length by 1
    this.length--;
  }
  get(index){
    return memory.get(this.ptr + index);
  }
}

function main(){
  Array.SIZE_RATIO = 3;
  // Create an instance of the Array class
  // let arr = new Array();
  // // Add an item to the array
  // arr.push(3);
  // arr.push(5);
  // arr.push(15);
  // arr.push(19);
  // arr.push(45);
  // arr.push(10);
  // arr.pop();
  // arr.pop();
  // arr.pop();
  // arr.remove(2);
  // arr.remove(1);
  // arr.remove(0);
  // console.log(arr);
  // arr.push('tauhida');
  // console.log(arr.get(0));
  // console.log(urlify('www.thinkful.com /tauh ida parv een'));
  // console.log(customFilter([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
  // console.log(findSum([-100, 4, 6, -3, 5, -2, 1]));
  // console.log(mergeArrays([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]));
  //console.log(vowelBattleTwo('Battle of the Vowels: Hawaii vs. Grozny', 'aeiou'));
  // console.log(products([1, 3, 9, 4]));
  // let zeroes = toZero([[1,0,1,1,0],
  //   [0,1,1,1,0],
  //   [1,1,1,1,1],
  //   [1,0,1,1,1],
  //   [1,1,1,1,1]]);
  // console.log(zeroes[0]);
  // console.log(zeroes[1]);
  // console.log(zeroes[2]);
  // console.log(zeroes[3]);
  // console.log(zeroes[4]);
  console.log(rotation('amazon', 'azonam'));
  console.log(rotation('amazon', 'azonma'));
}

main();

function urlify(value) {
  const input = String(value);
  const inputArray = input.split('');
  for (let i = 0; i < inputArray.length; i++){
    if (inputArray[i] === ' '){
      inputArray[i] = '%20';
    }
  }
  return inputArray.join('');
}

function customFilter(array){
  for (let i = 0; i < array.length;){
    if (array[i] < 5){
      array.splice(i, 1);
    } else {
      i++;
    }
  }
  return array;
}
//possibly may need to do a nest for loop in order to hit every single consecutive sequence
function findSum(array){
  let max = array[0];
  let sum = 0;
  for (let i = 0; i < array.length; i++){
    sum = sum + array[i];
    if (sum > max){
      max = sum;
    }
  }
  return max;
}

function mergeArrays(array1, array2){
  let sortedArray = [];
  let firstIndex = 0;
  let secondIndex = 0;
  let min;
  while (firstIndex < array1.length && secondIndex < array2.length) {
    if (array1[firstIndex] <= array2[secondIndex]){
      min = array1[firstIndex];
      firstIndex++;
    } else {
      min = array2[secondIndex];
      secondIndex++;
    }
    sortedArray.push(min);
  }
  return sortedArray;
}

function vowelBattleTwo(str, remove){
  let newStr = '';
  for (let i = 0; i < str.length; i++){ 
    let status = false;
    for (let j = 0; j < remove.length; j++){
      if (str[i] === remove[j]){
        status = true;
      }
    }
    if (!status){
      newStr = newStr + str[i];
    }
  }
  return newStr;
}

function products(arr){
  let total = arr[0];
  let newArr = [];
  for (let i = 1; i < arr.length; i++){
    total = total * arr[i];
  }
  for (let j = 0; j < arr.length; j++){
    newArr.push(total/arr[j]);
  }
  return newArr;
}

function toZero(array){
  let xZero = [];
  let yZero = [];
  for (let y = 0; y < array.length; y++){
    for (let x = 0; x < array[y].length; x++){
      if (array[y][x] === 0){
        yZero.push(x);
        xZero.push(y);
      }
    }
  }
  for (let y = 0; y < array.length; y++){
    if (xZero.includes(y)){
      for (let x = 0; x < array[y].length; x++){
        array[y][x] = 0;
      }
    }
    for (let x = 0; x < array[y].length; x++){
      if(yZero.includes(x)){
        array[y][x] = 0;
      }
    }
  }
  return array;
}

function rotation(str1, str2){
  if (str1.length !== str2.length){
    return false;
  } else {
    for (let i = 0; i < str1.length; i++){
      let tempStr = str2[i] + str2.slice(i+1) + str2.slice(0, i);
      if (tempStr === str1){
        return true;
      }
    }
    return false;
  }
}
Array.SIZE_RATIO = 3;