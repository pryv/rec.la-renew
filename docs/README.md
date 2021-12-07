# rec.la files

Loopback domain and SSL certs.


## Why ?

At [Pryv](http://pryv.com) we often have to locally develop web applications that intensively use AJAX REST requests. CORS layer is enforced by pure HTTPS only policies from browsers.

This is why we refurbished a domain and its SSL certs to a full loopback domain.

This will enable any developer to benefit from a loopback signed certificate.

#### See also:

- [GitHub repository](https://github.com/pryv/rec.la)
- [npm package](https://www.npmjs.com/package/rec.la)


## The files

- [rec.la-cert.crt](rec.la-cert.crt) : The certificate
- [rec.la-key.pem](rec.la-key.pem) : The key
- [rec.la-ca.crt](rec.la-ca.crt) : Certificate of the authority
- [rec.la-bundle.crt](rec.la-bundle.crt) : Bundle of key + ca
- [pack.json](pack.json) : All this packed in a json file

Provided by [Pryv](https://www.pryv.com) — Data & Privacy, Managed
