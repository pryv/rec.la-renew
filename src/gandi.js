
const SHARINGID = null;

const superagent = require('superagent');
const API_KEY = process.env.GANDI_REC_LA_API_KEY

// only set shqring_id query param if defined
const query = SHARINGID ? {'sharing_id': SHARINGID} : {};

async function update(domain, keyAuthorization) {
  if (! API_KEY) return console.log('missing API key as env variable "GANDI_REC_LA_API_KEY"')

  const res = await superagent.put('https://api.gandi.net/v5/livedns/domains/' + domain + '/records/_acme-challenge/TXT')
    .query(query)
    .set('Authorization', 'ApiKey ' + API_KEY)
    .send({rrset_ttl:300,rrset_values:[keyAuthorization]});
  console.log(res.body);
}

module.exports = {
  update
}