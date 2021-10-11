const acme = require('acme-client');
const { read } = require('./files');
const gandi = require('./gandi');
const savecert = require('./saveccert');
const pack = require('./pack');

const DOMAIN = 'rec.la';

const CSR = read([DOMAIN + '.csr']); // could be self genreated with acme.forge

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
  //const certificate = read(['docs', DOMAIN + '-bundle.crt']);
  savecert(DOMAIN, certificate);
  await pack(DOMAIN);
  console.log('DONE');
})()

async function challengeCreateFn(authz, challenge, keyAuthorization) {
  console.log('****challengeCreateFn: ' + keyAuthorization);
  await gandi.update(DOMAIN, keyAuthorization);
}

async function challengeRemoveFn(authz, challenge, keyAuthorization) {
  console.log('****challengeRemoveFn');
}

