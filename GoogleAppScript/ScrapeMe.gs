function showForm(){  
  var html = HtmlService.createHtmlOutputFromFile('index.html')
  html.setTitle('ScrapeMe - Formula Creator');
  SpreadsheetApp.getUi().showSidebar(html);
}

//function userInput() {
//  Logger.log(userInput);
//}
//
//function doGet(e) {
//  Logger.log(e);
//  return HtmlService.createHtmlOutputFromFile("index");
//}

function sendData(requestURL, selector){
  var data = {
	"requestURL": requestURL,
	"selector": selector
  }
  
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    // Convert the JavaScript object to a JSON string.
    'payload' : JSON.stringify(data)
  };
  
  var url = "https://us-central1-scrapeme.cloudfunctions.net/scraperSelector";
  var response = UrlFetchApp.fetch(url, options);
  var cellData = JSON.parse(response.getContentText())
  doTest(cellData);
//  doTest({content: "food"})

}


function putDatainCell(requestURL, selector) {
  
}

function doSomething() {
  
}

function doTest(cellData) {
  var cell = SpreadsheetApp.getActiveSheet().getCurrentCell()
  cell.setValue(cellData.content)
//  SpreadsheetApp.getActiveSheet().getRange(cellID).setValue(cellData.content);
}
