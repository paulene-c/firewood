/*
    Code to be hosted on Google App Service, and url replaced with the published web app URL in `contact-form-script.js`
*/

var TO_ADDRESS = ""; // where to send form data

function doPost(e) {

  try {
    Logger.log(e);

    MailApp.sendEmail({
      to: TO_ADDRESS,
      subject: "New firewood order",
      htmlBody:  e.parameters.html[0]});
    
    return ContentService
          .createTextOutput(
            JSON.stringify({"result":"success",
                            "data": JSON.stringify(e.parameters)}))
          .setMimeType(ContentService.MimeType.JSON);
  } catch(error) { // if error return this
    Logger.log(error);
    return ContentService
          .createTextOutput(JSON.stringify({"result":"error", "error": e}))
          .setMimeType(ContentService.MimeType.JSON);
  }
}