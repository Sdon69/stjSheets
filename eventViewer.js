
const app = require('./app.js');
var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');
module.exports.getDataFromSheets = (dept) =>
{
var dept_filter = dept;

var itemDetails_Gl;



var itemDetails = [{
  name: 's89',
  age:   'str2'
}];



// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'sheets.googleapis.com-nodejs-quickstart.json';


// Load client secrets from a local file.
fs.readFile('client_secret.json', function processClientSecrets(err, content) {
  if (err) {
    console.log('Error loading client secret file: ' + err);
    return;
  }

  authorize(JSON.parse(content), listMajors)

  });

  // .
  // .
  // .
  // .
  // The Server Processes Ends here




/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  var clientSecret = credentials.installed.client_secret;
  var clientId = credentials.installed.client_id;
  var redirectUrl = credentials.installed.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, function(err, token) {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client, callback) {
  var authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function(code) {
    rl.close();
    oauth2Client.getToken(code, function(err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
}

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
function listMajors(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '1_lodhrWpyuJSvJRi4MNyw8k7W7hSBKrXS7ukBVE4cI0',
    range: 'Class Data!A2:K',
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var rows = response.values;
    if (rows.length == 0) {
      console.log('No data found.');
    } else {
      console.log('Name, Major:');


      var used = false;
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        // Print columns A and E, which correspond to indices 0 and 4.








                    var str1 = row[0];
                    var str2 = row[1];
                    var str7 = row[6]


                    if (str1.includes("BonBlank88"))
                    {

                        end = true;

                        continue;
                    }




                    var status =  row[9];

                    console.log("dept_filter",dept_filter);



                    // dept_filter = 'Debate';

                    if(status==="A"){
                         cataegories = row[6];


                        if (cataegories.includes(dept_filter)) {

                            title = row[0];
                            description = row[1];
                            console.log();("descr", description);
                            var fullName = row[8];;
                            var publishDate = row[2];;
                            var eventDate = row[3];;
                            var lastDateofRegistration = row[4];;
                            var fees = row[5];;
                            var fees = " ₹".concat(fees);
                            var uniqueId = row[10];
                            var trimmedString = description.substring(0, 64);
                            var dottedString = trimmedString.concat('....')

                            console.log('Virat Kohli');
                            console.log("Departments", dept_filter);
                            if(!used)
                            {


                            itemDetails.pop({
                            name: 'str1',
                            age:   'str2'
                              })
                              ;
                              itemDetails.push({
                                title: title,
                                description:  description,
                                dateOfPublish: publishDate,
                                eventDate: eventDate,
                                lastDateofRegistration:lastDateofRegistration,
                                entryFees: fees,
                                fullName:fullName,
                                uniqueId: uniqueId,
                                cataegories:cataegories,
                                dottedString:dottedString
                              });


                              used = true;
                            }
                            else{
                              itemDetails.push({
                                title: title,
                                description:  description,
                                dateOfPublish: publishDate,
                                eventDate: eventDate,
                                lastDateofRegistration:lastDateofRegistration,
                                entryFees: fees,
                                fullName:fullName,
                                uniqueId: uniqueId,
                                cataegories:cataegories,
                                    dottedString:dottedString
                              });
                            }


                            module.exports.itemDetails = itemDetails;
                            app.totalData = itemDetails;

                            // console.log('please' , app.totalData);


                          //  module.exports.length = Object.keys(itemDetails.shareInfo[i]).length;
                            // words.add(new Word(description, title, publishDate, eventDate, lastDateofRegistration, fees, fullName));
                        }
                    }

      }
      console.log(itemDetails);



      // return itemDetails;




    }
  })

}

//
//
//   //The Server Processes Starts here
//   // .
//   // .
//   // .
//   // .
// function loadToHtml()
// {
//
// console.log('it starts');
//
//
//   var data = [ { name: 'Vivamus eu',
//     age: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean diam nulla, gravida eu quam et, rutrum consectetur diam. Vivamus consectetur mi sit amet odio tincidunt, et vehicula orci tincidunt. Duis ac justo facilisis lacus pharetra semper sed et dolor. Vivamus mi erat, tincidunt quis tincidunt ac, varius quis leo. Nam tincidunt, lacus at tempus mollis, magna nulla lobortis orci, sit amet malesuada lacus augue luctus massa. Fusce lobortis risus sed dignissim accumsan. Quisque sit amet dui urna. Etiam ac tempus felis. Sed nec neque nec sapien varius hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel blandit nisi. Nunc porttitor nisl dictum semper tempor. Suspendisse fringilla, velit non viverra pulvinar, diam ex aliquet purus, in lobortis ligula nulla vel metus.' } ];
//   var transform = {"<>":"table border = '0.8' cellspacing='12' cellpadding='18' ","html":[
//                       {'<>':"tr",'html':[
//                                           {'<>':"td style='width:100%;padding-left:20px; background:#ccf5ff';",'html':"${name} : <br>  ${age}"}]}]};
//
//   var htmlBody = json2html.transform(data,transform);
//   var app = express();
//   hbs.registerPartials(__dirname + '/views/partials');
//
//   app.set('view engine','hbs');
//
//   app.use((req, res, next) =>
//   {
//   var now = new Date().toString();
//   var log = `${now}: ${req.method} ${req.url}`;
//   console.log(log);
//   fs.appendFile('server.log', log + '\n' , (err)=>
//   {
//     if(err)
//     {
//       console.log('Unable to append server log')
//     }
//   })
//   next();
//   });
//
//
//
//   app.use(express.static(__dirname + '/public'));
//   hbs.registerHelper('screamIt',(text) =>
//   {
//     return text.toUpperCase();
//   });
//
//   app.get('/',(req,res) =>
//   {
//     // res.send('<h1>Hello Express!</h1>');
//
//     res.send('<form method="post" action="/genres"><select name ="s1">  <option>All Events</option><option>Technology</option>  <option>Social Gathering</option>  <option>Debate</option>  <option>Social Awareness</option><option>Convention</option><option>Sports</option><option>Other</option></select><input type="submit" value="Submit"></form>' + htmlBody);
//   });
//
//   app.get('/about',(req,res) =>{
//     res.render('about.hbs',{
//       pageTitle: 'About Page',
//
//     });
//   });
//
//   app.get('/bad',(req,res) =>
//   {
//     // res.send('<h1>Hello Express!</h1>');
//     res.send({
//       errorMessage: 'Unable to handle request'
//     });
//   });
//
//
//
//   app.use(bodyParser.urlencoded({
//       extended: true
//   }));
//
//   /**bodyParser.json(options)
//    * Parses the text as JSON and exposes the resulting object on req.body.
//    */
//   app.use(bodyParser.json());
//
//   app.post("/genres", function (req, res) {
//
//
//       dept_filter = req.body.s1;
//       console.log(dept_filter);
//       res.redirect('back');
//
//
//   });
//
//   // .
//   // .
//   // .
//   // .
//   // The Server Processes Ends here
//
//


}
