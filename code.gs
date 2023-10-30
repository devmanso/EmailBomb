// Author: devmanso
// Date of last mod: Oct 30 2023 (10/30/23)

const ITERATIONS = 100 // be sure to abide by the email quota
const WAIT = 1000 // msec
var counter = 0
var debugStatements = true
var subject = ""
var body = ""
var webpage


function custom() {
  main("youremail@domain.net")
}

// Function to generate random number
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// generate random string for body and subject
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function main(address) {
  Logger.log(address)
  Logger.log("STARTING")
  //emails person five times, once per 5 seconds
  for(i = 0; i < ITERATIONS; i++) {
    subject = makeid(randomNumber(5, 11));
    body = makeid(randomNumber(25, 120))
    MailApp.sendEmail(address, subject, body)
    counter +=1
    if(debugStatements) {console.log("EMAIL SENT \n")
      Logger.log("subject "+ subject)
      Logger.log("body "+ body)
      Logger.log("EMAIL COUNT "+ counter)
      
    }
    
    Utilities.sleep(WAIT)
  }
  Logger.log("ENDED")
}

// when user sends GET request
function doGet(e) {
  webpage = HtmlService.createHtmlOutputFromFile('ui')
  var userdata = JSON.stringify(e)
  output = ContentService.createTextOutput()
  output.append(userdata)
  output.append("fetching userdata... \n")
  output.append(e.queryString)
  output.append(e.parameters)
  output.append(e.contentLength)
  if(debugStatements) {
      output.append("subject "+ subject)
      output.append("body "+ body)
      output.append("EMAIL COUNT "+ counter)
  }
  
  
  //return ContentService.createTextOutput(userdata).setMimeType(ContentService.MimeType.JSON);
  //return output

  // create ui
  return webpage;
}

