## Table of Content
1. [Prelude What is JSON?](#prelude-what-is-json)
1. [Sync & Async Process](#sync-&-async-process)
1. [What is Callback?](#what-is-callback)
1. [Why we need callback?](#why-we-need-callback)
1. [Let's Make Callback - Synchronous](#lets-make-callback---synchronous)
1. [Let's Make Callback - Asynchronous](#lets-make-callback---asynchronous)
1. [Real world case study](#real-world-case-study)
1. [Nested Callback](#nested-callback)
1. [Referensi](#referensi)

## Prelude What is JSON?
Pada pertemuan sebelumnya, kita menggunakan data dengan format ekstensinya
adalah CSV atau `comma separated value`, pada pertemuan kali ini kita akan
menggunakan data dengan format JSON atau disebut dengan `JavaScript Object 
Notation`.

JSON ini merupakan tipe data ringan yang sekarang ini banyak digunakan dalam 
pertukaran data antar browser ataupun server, data dalam JSON ini hanya bisa
berbentuk `text` saja.

Contoh file dalam bentuk JSON:
```json
[
  {
    "name": "Kenny O'Connell",
    "email": "Arvel.Hilll71@hotmail.com",
    "dob": "2020-03-24T16:07:39.706Z",
    "company": "Hagenes and Sons",
    "image": "https://s3.amazonaws.com/"
  },
  {
    "name": "Jaden Mann",
    "email": "London79@hotmail.com",
    "dob": "2019-06-26T02:55:01.276Z",
    "company": "Schuster - Pollich",
    "image": "gs://gcs.google.com/"
  }
]
```

Keterangan:  
Notasi JSON ini sangat mirip dengan deklarasi array dan object 
di dalam javascript sendiri, dimana `[ ]` menyatakan `array` dan `{ }` 
menyatakan `object`.

Tipe data yang diperbolehkan dalam JSON sendiri pun terbatas, hanya boleh
berupa:
* string
* angka
* object
* array
* boolean
* null

WARNING:  
*undefined* tidak diperbolehkan dalam notasi JSON.

Untuk cara penggunaan (membaca dan menulis json, akan dijelaskan di materi
ini nantinya).

## Sync & Async Process
Di dalam dunia *programming*, ada beberapa istilah dalam melakukan kodingan:
* Synchronous (sync)
* Asynchronous (async)

**Synchronous** itu adalah kita membuat kodingan kita memiliki proses yang tidak  
dieksekusi selama proses sebelumnya belum selesai (*blocking*)

**Asynchronous** itu adalah kita membuat kodingan kita memiliki proses yang dapat  
dieksekusi walaupun proses sebelumnya belum selesai (*non-blocking*)

Analogi: *Drive-through* dan *Order di restoran*

Coba kita lihat kode sederhana di bawah ini
Kode ini akan menuliskan output sederhana
```javascript
console.log("Process A");
console.log("Process B");
console.log("Process C");
```

Output:
```javascript
Process A
Process B
Process C
```

Coba kita bandingkan ketika jalankan kode di bawah ini

Code:
```javascript
console.log("Process A");
setTimeout(function() {
  console.log("Process Async A");
}, 1000);
console.log("Process B");
console.log("Process C");
```

Output:
```javascript
Process A
Process B
Process C
Process Async A
```

Coba kita lihat kode di bawah ini  
Kode ini akan membaca file json sebesar 226 MB kemudian menghitung jumlah objectnya  

Code: 
```javascript
const fs = require('fs');

console.log("Data akan kita baca sekarang !");

let data = JSON.parse(fs.readFileSync('./0-generated.json', 'utf8'));
console.log(`Jumlah baris data adalah : ${data.length}`);

console.log("Hore data sudah selesai dibaca !");
```

Coba bila kita akan mencoba untuk membaca file secara async  

Code:
```javascript
const fs = require('fs');

console.log("Data akan kita baca sekarang !");

// Abaikan dulu untuk cara penggunaan yang aneh ini, nanti kita akan flashback lagi
// Contoh kode ini pasti error, jadi jangan dikira tidak jalan yah
let data = JSON.parse(fs.readFile('./0-generated.json', 'utf8'));
console.log(`Jumlah baris data adalah : ${data.length}`);

console.log("Hore data sudah selesai dibaca !");
```

## What is Callback?
Secara sederhananya:
Callback merupakan sebuah fungsi yang akan dijalankan setelah sebuah fungsi lain
telah selesai dijalankan, sehingga, dinamakan dengan *callback*

Secara kompleksnya:
Dalam javascript, perlu diingat bahwa fungsi adalah sebuah objek atau sering
disebut dengan *first-class object*, yang artinya:
* fungsi bisa dijadikan sebagai parameter
* fungsi bisa disimpan ke dalam variabel
* fungsi bisa memiliki *property* dan *method*

## Why we need Callback?
Javascript sendiri merupakan *event-driven language*.
Ini artinya dalam Javascript, *ketimbang* menunggu sebuah respon berjalan,
Javascript akan mengeksekusi sesuatu sambil menunggu event lainnya.

Code:
```javascript
function fungsiPertama() {
  console.log("satu");
}

function fungsiKedua() {
  console.log("dua");
}

fungsiPertama();
fungsiKedua();
```

Output:
```javascript
satu
dua
```

Penjelasan:

Pada kode di atas, `fungsiPertama` akan dijalankan terlebih dahulu sebelum 
`fungsiKedua`. semua terkesan baik-baik saja.

Tapi apa yang terjadi bila `fungsiPertama` memiliki kode yang tidak bisa 
dijalankan dengan cepat? Contohnya API request dimana harus mengirim request
dan menunggu response?

Untuk mensimulasikan ini, kita akan mengubah kode kita di atas dengan menambahkan
fungsi bawaan Javascript `setTimeout`

Code:
```javascript
function fungsiPertama() {
  //Simulasi delay sebagai analogi API Request
  setTimeout( () => {
    console.log("satu");
  }, 500);
}

function fungsiKedua() {
  console.log("dua");
}

fungsiPertama();
fungsiKedua();
```

Output:
```javascript
dua
satu
```

Pertanyaan:

*Loh,* mengapa output-nya menjadi **dua** terlebih dahulu baru **satu**?
Padahal *kan* `fungsiPertama` dipanggil terlebih dahulu sebelum `fungsiKedua`?

Penjelasan:

Ini bukan berarti Javascript *ngeyel* dengan tidak menjalankan `fungsiPertama`
dahulu baru menjalankan `fungsiKedua`, hanya saja ***Javascript tidak menunggu***
***respon dari*** `fungsiPertama` ***sebelum menjalankan*** `fungsiKedua`.

Jadi pada javascript, kita **tidak** bisa mengharapkan dengan memanggil fungsi
secara berurutan dan berharap urutan tersebut akan dijalankan dengan benar.

Solusinya bagaimana? salah satunya adalah dengan menggunakan **callback**.

## Let's make callback - Synchronous
Kita mengetahui bahwa callback memiliki dua tipe, yaitu sync dan async,
pada bagian ini kita akan coba membuat sync callback yaitu `sort` pada array.

Code:
```javascript
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
```

Output:
```javascript
[1, 2, 3, 4,
 5, 6, 7]
```

## Let's make callback - Asynchronous
Dengan contoh yang sama pada bagian [Why we need calllback](#why-we-need-callback), 
kita akan memodifikasi kode sehingga walaupun `fungsiPertama` menggunakan `setTimeout` sebagai analogi API Request, namun tetap "ditunggu" oleh 
`fungsiKedua`

Code:
```javascript
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
```

Output:
```javascript
satu
dua
```

Penjelasan:

Pada kode di atas, `fungsiPertama` sekarang menerima sebuah parameter bernama
`cb` yang merupakan sebuah *callback*. Kemudian setelah mencetak tulisan
**satu** (yang dianalogikan setelah API Request berhasil diperoleh), kita akan
memanggil parameter `cb` sebagai fungsi.

Saat memanggil `fungsiPertama`, kita memasukkan sebuah parameter, yaitu
`fungsiKedua` yang akan dijadikan sebagai *callback*-nya. sehingga setelah
mencetak tulisan **satu**, kita akan menggail `fungsiKedua` untuk mencetak
tulisan **dua**

Parameter dalam sebuah function pun bisa digunakan sebagai parameter untuk callback  

Code:
```javascript
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
```

## Real world case study
Mari kita kembali ke kasus membaca file secara asynchronous

Code:
```javascript
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
```

## Nested Callback
Misalkan kita ingin membaca 3 file yang berbeda, sebut saja namanya:
* 0-file1.json
* 0-file2.json
* 0-file3.json

Kemudian kita ingin menulis filenya ke dalam `0-result.json`

Bagaimana cara kita menuliskannya secara async?

Code:
```javascript
const fs = require('fs');

fs.readFile('./0-file1.json', 'utf8', function cb1(err1,data1) {
  if(err1) {
    throw err1;
  }

  fs.readFile('./0-file2.json', 'utf8', function cb2(err2,data2) {
    if(err2) {
      throw err2;
    }

    fs.readFile('./0-file3.json', 'utf8', function cb3(err3,data3) {
      if(err3) {
        throw err3;
      }

      data1 = JSON.parse(data1);
      data2 = JSON.parse(data2);
      data3 = JSON.parse(data3);

      objResult = {
        name: data1[0].name,
        company: data2[0].company,
        email: data3[0].email
      }

      fs.writeFile('./0-result.json', JSON.stringify(objResult), function(err4) {
        if(err4) {
          throw err4;
        }
      });
    });
  });
});
```

## Referensi
* [JSON Array type - W3School](https://www.w3schools.com/js/js_json_datatypes.asp)
* [Sync & Async in Javascript - Hongkiat](https://www.hongkiat.com/blog/synchronous-asynchronous-javascript)
* [fs API - NodeJS](https://nodejs.org/api/fs.html)
* [Array prototype sort - Mozilla Dev](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)