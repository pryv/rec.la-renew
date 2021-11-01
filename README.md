# REC.LA RENEW

Tool to create wildcard *.rec.la SSL certificate with let's encrypt and GANDI. 

- output the certificates in `docs/` which are exposed on `https://pryv.github.io/rec-la-renew/`
- certifcates will be downloaded by [https://github.com/pryv/rec-la](rec-la) package

## Setup 

Note: We have a user on gandi, named `recla` with a Password in 1Password. 

You need to add your secret Gandi's API to a `secret.json`
```
{"APIKEY": "....."}
```

## Run 

`node src/index.js` to generate new SSL certificates.

## Dev

### CSR
The tool will use `./rec.la.csr` for the request. This has been generated with the following OpenSSL command. 
In further dev the CSR could be generated with 

```
const [certificateKey, certificateRequest] = await acme.forge.createCsr({
    commonName: 'test.example.com'
});
```

### Let's encrypt account & ACME-Client API

Now an account cert is generataed for each request. This could be reviewed and a single account kept for all manipulations. [ACME-CLIENT](https://github.com/publishlab/node-acme-client) offers plenty of options to create let's encrypt account. See: [ACME-CLIENT API](https://github.com/publishlab/node-acme-client/blob/master/docs/client.md)

### Helpers

#### generate new CSR and key with:

```
openssl req -new -newkey rsa:4096 -nodes \
    -keyout rec.la-key.pem -out rec.la.csr \
    -subj "/C=CH/ST=VD/L=Lausanne/O=Pryv/CN=*.rec.la"
```

#### Gandi API Key 
- Get your own from security tab

`set APIKEY=XXXXXXX`

**IMPORTANT ABOUT SHARING_ID:** This is only needed for our own accounts.. recla accounts has another type of sharing that gives direct access with no sharing id.. 

- Get "sharing_id" for Pryv: 
`curl -H "Authorization: ApiKey ${APIKEY}" https://api.gandi.net/v5/organization/organizations`

RES: `48e7a100-3ed9-11e7-htzs-00163e6dc886`  

- (Check) list domains

`curl -H "Authorization: ApiKey ${APIKEY}" "https://api.gandi.net/v5/livedns/domains`

or 

`curl -H "Authorization: ApiKey ${APIKEY}" "https://api.gandi.net/v5/livedns/domains?sharing_id=48e7a100-3ed9-11e7-htzs-00163e6dc886"`


- LIST Rec.la entries 

`curl -H "Authorization: ApiKey ${APIKEY}" "https://api.gandi.net/v5/livedns/domains/rec.la/records`

or

`curl -H "Authorization: ApiKey ${APIKEY}" "https://api.gandi.net/v5/livedns/domains/rec.la/records?sharing_id=48e7a100-3ed9-11e7-htzs-00163e6dc886"`

- UPDATE Entry;

`curl -X PUT -H "Authorization: ApiKey ${APIKEY}" -H 'Content-Type: application/json' -d '{"rrset_ttl":300,"rrset_values":["\"pki\""]}' "https://api.gandi.net/v5/livedns/domains/rec.la/records/_acme-challenge/TXT`

or

`curl -X PUT -H "Authorization: ApiKey ${APIKEY}" -H 'Content-Type: application/json' -d '{"rrset_ttl":300,"rrset_values":["\"pki\""]}' "https://api.gandi.net/v5/livedns/domains/rec.la/records/_acme-challenge/TXT?sharing_id=48e7a100-3ed9-11e7-htzs-00163e6dc886"`

