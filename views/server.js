const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine','hbs');

app.use((req, res, next) =>
{
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server.log', log + '\n' , (err)=>
{
  if(err)
  {
    console.log('Unable to append server log')
  }
})
next();
});

// app.use((req, res, next) =>
// {
// res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));
hbs.registerHelper('screamIt',(text) =>
{
  return text.toUpperCase();
});

app.get('/',(req,res) =>
{
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome Home',

  });
});

app.get('/about',(req,res) =>{
  res.render('about.hbs',{
    pageTitle: 'About Page',

  });
});

app.get('/bad',(req,res) =>
{
  // res.send('<h1>Hello Express!</h1>');
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () =>{
  console.log('Server is up on port ' + port);
});

app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.post("/genres", function (req, res) {
    console.log(req.body.user.email);
    console.log(req.body.s1)
    res.redirect('back');

});
