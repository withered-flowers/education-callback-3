const fs = require('fs');

const fileReader3 = (data1, data2) => {
  fs.readFile('./0-file3.json', 'utf8', (err, data3) => {
    if(err) {
      throw err;
    }

    data3 = JSON.parse(data3);

    console.log(`${data1[0].dob} dengan ${data2[0].name} dan ${data3[0].email}`);
  });
};

const fileReader2 = (data1, next) => {
  fs.readFile('./0-file2.json', 'utf8', (err, data2) => {
    if(err) {
      throw err;
    }

    data2 = JSON.parse(data2);

    next(data1, data2);
  });
};

const fileReader1 = (next) => {
  fs.readFile('./0-file1.json', 'utf8', (err, data) => {
    if(err) {
      throw err;
    }

    data = JSON.parse(data);

    next(data, fileReader3);
  });
};

fileReader1(fileReader2);