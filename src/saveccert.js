const { write } = require('./files');

function save (domain, certificate) {
  write(['docs', domain + '-bundle.crt'], certificate);
  // strip bundle in ca + cert 
  const FirstEnd = certificate.indexOf('-----END CERTIFICATE-----');
  const SecondBegin = certificate.indexOf('-----BEGIN CERTIFICATE-----', FirstEnd);
  write(['docs', domain + '-cert.crt'], certificate.substring(0, SecondBegin - 1));
  write(['docs', domain + '-ca.crt'], certificate.substring(SecondBegin));
}

module.exports = save;