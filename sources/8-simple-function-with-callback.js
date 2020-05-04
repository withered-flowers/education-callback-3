//fungsiPertama akan menerima sebuah parameter dengan nama cb yang merupakan callback
function fungsiPertama(cb) {
  //Simulasi delay sebagai analogi API Request
  setTimeout( () => {
    console.log("satu");

    //panggil parameter cb, as a function.
    cb();
  }, 500);
}

function fungsiKedua() {
  console.log("dua");
}

//masukkan fungsiKedua sebagai parameter fungsiPertama
fungsiPertama(fungsiKedua);
