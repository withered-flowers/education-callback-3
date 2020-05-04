const fs = require('fs');

console.log("Data akan kita baca sekarang !");

// Dari dokumentasi nodejs
// https://nodejs.org/dist/latest-v6.x/docs/api/fs.html#fs_fs_readfile_file_options_callback
// fs.readfile menerima 3 parameter
// - file, options, callback function dengan 2 parameter, err & data
fs.readFile('./0-generated.json', 'utf8', function callback(err, data) {
  if (err) {
    throw err;
  }

  data = JSON.parse(data);
  console.log(`Jumlah baris data adalah : ${data.length}`);
  console.log("Hore data sudah selesai dibaca !");
});

// lakukan logic lainnya, fs.readFile tidak akan nge-block program di bawah ini 