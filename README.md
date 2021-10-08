
# Setup 

Add your Gandi's API to a `secret.json`
```
{"APIKEY": "Hwbb9f0fvdXTstQTiAT0PeKE"}
```


# Helpers

## generate new CSR and key with:

```
openssl req -new -newkey rsa:4096 -nodes \
    -keyout rec.la-key.pem -out rec.la.csr \
    -subj "/C=CH/ST=VD/L=Lausanne/O=Pryv/CN=*.rec.la"
```

## Gandi API Key 
- Get your own from security tab

`set APIKEY=XXXXXXX`

- Get "sharing_id" for Pryv: 
`curl -H "Authorization: ApiKey ${APIKEY}" https://api.gandi.net/v5/organization/organizations`

RES: `48e7a100-3ed9-11e7-a6ef-00163e6dc886`  

- (Check) list domains
`curl -H "Authorization: ApiKey ${APIKEY}" "https://api.gandi.net/v5/livedns/domains?sharing_id=48e7a100-3ed9-11e7-a6ef-00163e6dc886"`


- LIST Rec.la entries 

`curl -H "Authorization: ApiKey ${APIKEY}" "https://api.gandi.net/v5/livedns/domains/rec.la/records?sharing_id=48e7a100-3ed9-11e7-a6ef-00163e6dc886"`

- UPDATE Entry;

`curl -X PUT -H "Authorization: ApiKey ${APIKEY}" -H 'Content-Type: application/json' -d '{"rrset_ttl":300,"rrset_values":["\"pki\""]}' "https://api.gandi.net/v5/livedns/domains/rec.la/records/_acme-challenge/TXT?sharing_id=48e7a100-3ed9-11e7-a6ef-00163e6dc886"`

