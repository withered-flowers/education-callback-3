const fs = require('fs');

console.log("Data akan kita baca sekarang !");

let data = JSON.parse(fs.readFileSync('./0-generated.json', 'utf8'));
console.log(`Jumlah baris data adalah : ${data.length}`);

console.log("Hore data sudah selesai dibaca !");