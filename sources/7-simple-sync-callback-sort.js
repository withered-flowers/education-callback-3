let unsortedArray = [3, 2, 4, 1, 5, 7, 6];

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// arr.sort([compareFunction])
// compareFunction 
//   firstEl
//   secondEl

unsortedArray.sort(function pembanding(inputPertama, inputKedua) {
  if(inputPertama < inputKedua) {
    return -1;
  }
  if(inputPertama > inputKedua) {
    return 1;
  }
});

// atau bisa ditulis juga dengan cara seperti ini
function pembanding(inputPertama, inputKedua) {
  if(inputPertama < inputKedua) {
    return -1;
  }
  if(inputPertama > inputKedua) {
    return 1;
  }
};

unsortedArray.sort(pembanding);
console.log(unsortedArray);