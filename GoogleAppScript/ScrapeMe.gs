//------------------------------------------------------------------------------------------------------------------------------
// Author: Andrew Polemeni
// Purpose: To create an app script to scrape web data and project for IT project management.
// Date Written: November 4, 2019
//------------------------------------------------------------------------------------------------------------------------------- 

//-------------------------------------------------------------------------------------------------------------------------------
// Display the UI here
//-------------------------------------------------------------------------------------------------------------------------------
function onInstall() {
  var html = HtmlService.createHtmlOutputFromFile('authMenu.html')
  html.setTitle('ScrapeMe - Formula Creator');
  SpreadsheetApp.getUi().showSidebar(html);
  
  
  // create submenu in show form
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('ScrapeMe')
      .addItem('Authentication', 'authMenu') // first param is text in menu and second param is the function name
      .addItem('Refresh', 'menuItemRefresh')
      .addSeparator()
      .addSubMenu(ui.createMenu('About')
          .addItem('Website Info', 'menuItem2'))
      .addToUi();
}

function onOpen(){  
  var html = HtmlService.createHtmlOutputFromFile('index.html')
  html.setTitle('ScrapeMe - Formula Creator');
  SpreadsheetApp.getUi().showSidebar(html);
  
  
  // create submenu in show form
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('ScrapeMe')
      .addItem('Authentication', 'authMenu') // first param is text in menu and second param is the function name
      .addItem('Formula Creator', 'mainMenu')
      .addSeparator()
      .addSubMenu(ui.createMenu('About')
          .addItem('Website Info', 'menuItem2'))
      .addToUi();
}


function authMenu() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
  var html = HtmlService.createHtmlOutputFromFile('authMenu.html')
  html.setTitle('ScrapeMe - Auth Menu');
  SpreadsheetApp.getUi().showSidebar(html);
}

function mainMenu() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
  var html = HtmlService.createHtmlOutputFromFile('index.html')
  html.setTitle('ScrapeMe - Formula Creator');
  SpreadsheetApp.getUi().showSidebar(html);
}

function menuItemRefresh() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
  createTrigger();
}


//-----------------------------------------------------------------------------------------------------------------------------
// function to send request URL and selector to cloud function
//-----------------------------------------------------------------------------------------------------------------------------
function sendData(requestURL, selector){
  var data = {
	"requestURL": requestURL,
	"selector": selector
  }
  
//  var data = {
//	"requestURL": "https://nodejs.org/en/",
//	"selector": "#home-downloadhead"
//  }
  
  var options = {
    'method' : 'post',
    'contentType': 'application/json',
    // Convert the JavaScript object to a JSON string.
    'payload' : JSON.stringify(data),
    "muteHttpExceptions": true
  };
  
  var url = "https://us-central1-scrapeme.cloudfunctions.net/scraperSelector";
  try{
    var response = UrlFetchApp.fetch(url, options);
    var cellData = JSON.parse(response.getContentText())
    Logger.log(response.getContentText());
    return cellData.content
  }
  catch(error) {
    Logger.log("This is and ERROR" + error);
  }
  
//  var cellData = JSON.parse(response.getContentText())
//  Logger.log(cellData)
//  createTrigger();
//  doTest(cellData);
//  return cellData;
//  return requestURL;
//  doTest({content: "food"})
}


//-----------------------------------------------------------------------------------------------------------------------------
// function to set data into current cell
//-----------------------------------------------------------------------------------------------------------------------------
//function doTest(cellData) {
//  var cell = SpreadsheetApp.getActiveSheet().getCurrentCell()
//  cell.setValue(cellData.content)
//}

function stringifyCustomFunction(requestURL, selector) {
  var cell = SpreadsheetApp.getActiveSheet().getCurrentCell();
  cell.setValue("=sendData(" + "\"" + requestURL + "\"" + "," + "\"" + selector +"\"" + ")")
//  cell.setValue("")
}

