function iniFungsiPertama(param1, callback) {
  let variablePertama = 'Hello ';

  variablePertama += param1;

  console.log('Ini dipanggil dari fungsi pertama !');
  callback(variablePertama);
}

function iniFungsiKedua(param1Lanjutan) {
  console.log(`Hasil lemparan dari iniFungsiPertama adalah: ${param1Lanjutan}`);
  console.log('Ini dipanggil dari fungsi kedua !');
}

iniFungsiPertama('World', iniFungsiKedua);