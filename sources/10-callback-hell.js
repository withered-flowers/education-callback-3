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

      fs.writeFile('./0-result.json', JSON.stringify(objResult), function(err) {
        
      });
    });
  });
});