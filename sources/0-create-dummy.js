const faker = require('faker');
const fs = require('fs');

// Gunakan 500000 untuk mendapatkan 113 MB
// Gunakan 1000000 untuk mendapatkan 226 MB
const DATASIZE = 1000000;
let arrData = [];


for(let ctr = 0; ctr < DATASIZE; ctr++) {
  let name = faker.name.findName();
  let email = faker.internet.email();
  let dob = faker.date.past();
  let company = faker.company.companyName();
  let image = faker.image.avatar();

  objPerson = {
    name,
    email,
    dob,
    company,
    image
  }

  arrData.push(objPerson);
}

fs.writeFileSync('./0-generated.json', JSON.stringify(arrData,null,2));