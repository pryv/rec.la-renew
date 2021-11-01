
const secret = require('../secret.json');
const SHARINGID = null;

const superagent = require('superagent');

// only set shqring_id query param if defined
const query = SHARINGID ? {'sharing_id': SHARINGID} : {};

async function update(domain, keyAuthorization) {
  const res = await superagent.put('https://api.gandi.net/v5/livedns/domains/' + domain + '/records/_acme-challenge/TXT')
    .query(query)
    .set('Authorization', 'ApiKey ' + secret.APIKEY)
    .send({rrset_ttl:300,rrset_values:[keyAuthorization]});
  console.log(res.body);
}

module.exports = {
  update
}