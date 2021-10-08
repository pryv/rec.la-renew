
const secret = require('../secret.json');
const SHARINGID = '48e7a100-3ed9-11e7-a6ef-00163e6dc886';

const superagent = require('superagent');


async function update(domain, keyAuthorization) {
  const res = await superagent.put('https://api.gandi.net/v5/livedns/domains/' + domain + '/records/_acme-challenge/TXT')
    .query('sharing_id', SHARINGID)
    .set('Authorization', 'ApiKey ' + secret.APIKEY)
    .send({rrset_ttl:300,rrset_values:[keyAuthorization]});
  console.log(res.body);
}

module.exports = {
  update
}