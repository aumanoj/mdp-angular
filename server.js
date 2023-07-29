const path = require('path');

const express = require('express');

const app = express();

// login-jwt

app.use(express.static(__dirname + '/login-jwt'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'login-jwt', 'index.html'));
});

app.get('*', (req, res) => {
	//this is for i18n
  const supportedLocales = ['en', 'fr'];
  const defaultLocale = 'en';
  const matches = req.url.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)\//);
  //check if the requested url has a correct format '/locale' and matches any of the supportedLocales
  const locale = (matches && supportedLocales.indexOf(matches[1]) !== -1) ? matches[1] : defaultLocale;
  res.render("${locale}/index", {req});
});

app.listen({
    port: process.env.PORT || 8080
},
    ()=> console.log('Servidor iniciado http://localhost:8080')
);