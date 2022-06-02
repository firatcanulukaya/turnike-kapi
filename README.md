# Turnike Kapı
Osman Örek Meslek Lisesi için hazırladığım turnike kapının web uygulamasının kaynak kodları.

Kullanılan teknolojiler: React, Redux, Express ve MySQL *(sequelize)*

## Adımlar

Öncelikle repository'i clone'layın.
```bash
$ git clone https://github.com/firatcanulukaya/turnike-kapi.git
```

Gerekli kütüphanaleri indirin. Sisteminizde [`nodejs`](https://nodejs.org/en/) & [`npm`](https://www.npmjs.com/) kurulu olduğundan emin olun.

```bash
$ cd client
$ npm install # ya da yarn
```
```bash
$ cd server
$ npm install # ya da yarn
```

`nodemon`'u global olarak kurduğunuzdan emin olun.
```bash
$ npm install -g nodemon # ya da yarn
```

`server/config/config.json` Dosyasında veritabanı ayarlamalarını değiştirdiğinizden emin olun. `username`, `password`, `database` ve `host` özelliklerini `development` alanında değiştirmelisiniz.

Veritabanı tablolarını oluşturmak için `npx sequelize db:migrate` komutunu terminale yazınız.

Ve çalıştırın.
```bash
$ cd server
$ npm start # ya da yarn start
```
```bash
$ cd client
$ npm start # ya da yarn start
```
