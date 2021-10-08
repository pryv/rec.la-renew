const { writeFileSync } = require('fs');


function save (certificate) {
  writeFileSync('./docs/rec.la-bundle.crt', certificate);
  // strip bundle in ca + cert 
  const FirstEnd = certificate.indexOf('-----END CERTIFICATE-----');
  const SecondBegin = certificate.indexOf('-----BEGIN CERTIFICATE-----', FirstEnd);
  writeFileSync('./docs/rec.la-cert.crt', certificate.substring(0, SecondBegin - 1));
  writeFileSync('./docs/rec.la-ca.crt', certificate.substring(SecondBegin));
}

module.exports = save;