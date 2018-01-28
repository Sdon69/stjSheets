module.exports.eventWriteFunction = (title,description,publishDate,eventDate,lastDateOfRegistration,entryFees,cataegories,userId,fullName) =>
{

    let google = require('googleapis');
    let authentication = require("./authentication");

    var globalRange;
    var rowNumber;


    function updateData(auth) {
      var sheets = google.sheets('v4');

      sheets.spreadsheets.values.update({
        auth: auth,
        spreadsheetId: '1_lodhrWpyuJSvJRi4MNyw8k7W7hSBKrXS7ukBVE4cI0',
        range: globalRange, //Change Sheet1 if your worksheet's name is something else
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [ [title,description,publishDate,eventDate,lastDateOfRegistration,entryFees,cataegories,userId,fullName,"A",rowNumber]]
        }
      }, (err, response) => {
        if (err) {
          console.log('The API returned an error: ' + err);
          return;
        } else {
            console.log("Updated");
              return;
        }

      });
    }

    function getData(auth) {
      var sheets = google.sheets('v4');
      rowNumber = 2;
      sheets.spreadsheets.values.get({
        auth: auth,
        spreadsheetId: '1_lodhrWpyuJSvJRi4MNyw8k7W7hSBKrXS7ukBVE4cI0',
        range: 'Class Data!A2:K',
      }, (err, response) => {
        if (err) {
          console.log('The API returned an error: ' + err);
          return;
        }
        var rows = response.values;
        if (rows.length === 0) {
          console.log('No data found.');
        } else {
          for (var i = 0; i < rows.length; i++) {
var row = rows[i];
                        var Str1 = row[0];
                        console.log("check", Str1);
                        if (Str1.includes("BonBlank88"))
                        {
                            console.log('range',rowNumber);
                            console.log("if", Str1);


                            break;
                        }
                        rowNumber++;
          }

          globalRange = `A${rowNumber}:K`;
            updateData(auth);
            return;
        }
      });
    }

    authentication.authenticate().then((auth)=>{

        getData(auth);
    });


}
