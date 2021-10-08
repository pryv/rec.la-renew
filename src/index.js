const acme = require('acme-client');
const { readFileSync } = require('fs');
const gandi = require('./gandi');
const savecert = require('./saveccert');

const CSR = readFileSync('./rec-la.csr', 'utf-8');
const accountPrivateKey = readFileSync('./docs/rec.la-key.pem', 'utf-8');;

const autoOpts = {
  csr: CSR,
  email: 'info@pryv.com',
  termsOfServiceAgreed: true,
  challengePriority: ['dns-01'],
  challengeCreateFn,
  challengeRemoveFn
};

(async () => {
  const client = new acme.Client({
    directoryUrl: acme.directory.letsencrypt.production,  // change to production or staging when dev is OK
    accountKey: await acme.forge.createPrivateKey() // generate an account key each time
  });

  console.log('START');
  const certificate = await client.auto(autoOpts);
  //const certificate = readFileSync('./rec.la-bundle.crt', 'utf-8');
  savecert(certificate);
  console.log('DONE');
})()

async function challengeCreateFn(authz, challenge, keyAuthorization) {
  const dnsChallenge = challenge
  console.log('****challengeCreateFn');
  await gandi.update('rec.la', keyAuthorization);
}

async function challengeRemoveFn(authz, challenge, keyAuthorization) {
  console.log('****challengeRemoveFn');
}

