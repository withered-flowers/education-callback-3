console.log("Process A");
setTimeout(function() {
  console.log("Process Async A");
}, 1000);
console.log("Process B");
console.log("Process C");

// Output
// Process A
// Process B
// Process C
// Process Async A