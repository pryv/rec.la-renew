# `rec.la` renew

Renew and publish `*.rec.la` wildcard SSL certificate with Let's Encrypt and Gandi.

- Outputs the certificates to `docs/`, published on `https://pryv.github.io/rec.la-renew/`
- The published certificates are used by the [rec.la](https://github.com/pryv/rec.la) package


## Usage

### Install

```
npm install
```

### Run

```
GANDI_REC_LA_API_KEY=${KEY} npm start
```
to generate new SSL certificates into `docs/`

Add `IS_PRODUCTION=true` to use Let's Encrypt's production API **which has a call limit!**

### Generating CSR and key

The tool uses `./rec.la.csr` for the request. It can be regenerated with OpenSSL:

```
openssl req -new -newkey rsa:4096 -nodes \
    -keyout rec.la-key.pem -out rec.la.csr \
    -subj "/C=CH/ST=VD/L=Lausanne/O=Pryv/CN=*.rec.la"
```

In further development, the CSR could be generated in the code with:

```
const [certificateKey, certificateRequest] = await acme.forge.createCsr({
    commonName: 'test.example.com'
});
```

### Let's Encrypt account & ACME-Client API

Currently, an account cert is generated for each request. This could be reviewed and a single account kept for all manipulations. [ACME-CLIENT](https://github.com/publishlab/node-acme-client) offers plenty of options to create a Let's Encrypt account; see the [ACME-CLIENT API](https://github.com/publishlab/node-acme-client/blob/master/docs/client.md).

### Gandi API key

Get your own key from the security tab on gandi.net, then you can `set APIKEY=XXXXXXX`.

**Important note about sharing_id:** This is only needed for our own accounts. `rec.la` account has another type of sharing that gives direct access with no sharing id.

#### Get "sharing_id" for Pryv

`curl -H "Authorization: ApiKey ${APIKEY}" https://api.gandi.net/v5/organization/organizations`

RES: `48e7a100-3ed9-11e7-htzs-00163e6dc886`

#### (Check) list domains

`curl -H "Authorization: ApiKey ${APIKEY}" "https://api.gandi.net/v5/livedns/domains`

or

`curl -H "Authorization: ApiKey ${APIKEY}" "https://api.gandi.net/v5/livedns/domains?sharing_id=48e7a100-3ed9-11e7-htzs-00163e6dc886"`

#### List `rec.la` entries

`curl -H "Authorization: ApiKey ${APIKEY}" "https://api.gandi.net/v5/livedns/domains/rec.la/records`

or

`curl -H "Authorization: ApiKey ${APIKEY}" "https://api.gandi.net/v5/livedns/domains/rec.la/records?sharing_id=48e7a100-3ed9-11e7-htzs-00163e6dc886"`

#### Update entry

`curl -X PUT -H "Authorization: ApiKey ${APIKEY}" -H 'Content-Type: application/json' -d '{"rrset_ttl":300,"rrset_values":["\"pki\""]}' "https://api.gandi.net/v5/livedns/domains/rec.la/records/_acme-challenge/TXT`

or

`curl -X PUT -H "Authorization: ApiKey ${APIKEY}" -H 'Content-Type: application/json' -d '{"rrset_ttl":300,"rrset_values":["\"pki\""]}' "https://api.gandi.net/v5/livedns/domains/rec.la/records/_acme-challenge/TXT?sharing_id=48e7a100-3ed9-11e7-htzs-00163e6dc886"`
