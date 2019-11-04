# ScrapeMe
A work in Progress: 
A restful API that accepts URL and CSS Selector, proccesses the input to a puppeteer function, and post to JSON.

Here is a test link to a heroku app but it currently breaks after the first two tries: https://stark-hollows-84026.herokuapp.com/
I'm porting this over to a cloud function since this is ram intensive.

Cloud function link is here: https://us-central1-scrapeme.cloudfunctions.net/scraperSelector

Use postman to create a json request: {"requestURL": "https://www.somerequestURL.com", "selector": "#someselectorelemement"}

# Install
npm install
 
 # Run
 node easy.js or nodemon easy.js


![UI Example](https://raw.githubusercontent.com/andrewpolemeni/ScrapeMe/master/DemoExample/UI%20Example.JPG)

How to get CSS Selector

![UI Example](https://github.com/andrewpolemeni/ScrapeMe/blob/master/DemoExample/selector.gif?raw=true)
