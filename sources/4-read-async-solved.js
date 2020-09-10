const fs = require('fs');

console.log("Data akan kita baca sekarang !");

// Abaikan dulu untuk cara penggunaan yang aneh ini, nanti kita akan flashback lagi
// Contoh kode ini pasti error, jadi jangan dikira tidak jalan yah
fs.readFile('./0-generated.json', 'utf8', (err, data) => {
  if(err) {
    throw err;
  }
  console.log(`Jumlah baris data adalah : ${data.length}`);
});

console.log("Hore data sudah selesai dibaca !");