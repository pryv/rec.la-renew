# REC-LA Files

Loopback domain and SSL certs. 

## Why ?

At [Pryv](http://pryv.com) we often have to locally develop web applications that intensively use AJAX REST requests. CORS layer is enforced by pure HTTPS only policies from browsers.

This is why we refurbished a domain and its SSL certs to a full loopback domain.

This will enable any developer to benefit from a loopback signed Certificate.

#### See:

- [On Gihub](https://github.com/pryv/rec-la)
- [On NPM](https://www.npmjs.com/package/rec-la)

From here you can download rec-la SSL certificates.

**Files:** 

- [rec.la-cert.crt](rec.la-cert.crt) : The certificate
- [rec.la-key.pem](rec.la-key.pem) : The key
- [rec.la-ca.cert](rec.la-ca.cert) : Certificate of the authority
- [rec.la-bundle.crt](rec.la-bundle.ccert) : Bundle of key + ca
- [pack.json](pack.json) : All this packed in a json file 

This is provide, by [Pryv](https://www.pryv.com) - Privacy & Data managed