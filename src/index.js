const acme = require('acme-client');
const { readFileSync, writeFileSync } = require('fs');
const gandi = require('./gandi');

const CSR = readFileSync('./rec-la.csr', 'utf-8');
const accountPrivateKey = readFileSync('./rec.la-key.pem', 'utf-8');;

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
    directoryUrl: acme.directory.letsencrypt.production,  // change to production when dev is OK
    accountKey: await acme.forge.createPrivateKey()
  });

  console.log('START');
  const certificate = await client.auto(autoOpts);
  writeFileSync('./rec.la-bundle.crt', certificate);
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

