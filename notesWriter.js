module.exports.notesWriteFunction = (title,description,cataegories,userId,fullName) =>
{

    let google = require('googleapis');
    let authentication = require("./authentication");

    var globalRange;
    var rowNumber;


    function updateData(auth) {
      var sheets = google.sheets('v4');

      sheets.spreadsheets.values.update({
        auth: auth,
        spreadsheetId: '12UOUdDm2VoETOSM_zyP2Kfx6Mzuh-SdrXKLmv-yNZLM',
        range: globalRange, //Change Sheet1 if your worksheet's name is something else
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [ [title,description,cataegories,userId,fullName,rowNumber]]
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
        spreadsheetId: '12UOUdDm2VoETOSM_zyP2Kfx6Mzuh-SdrXKLmv-yNZLM',
        range: 'Stj Teacher Notes!A2:F',
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

          globalRange = `Stj Teacher Notes!A${rowNumber}:F`;
            updateData(auth);
            return;
        }
      });
    }

    authentication.authenticate().then((auth)=>{

        getData(auth);
    });


}
