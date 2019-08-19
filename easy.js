const puppeteer = require("puppeteer");
const chalk = require("chalk");
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');

// Create pretty console log messages for debugging
const error = chalk.bold.red;
const success = chalk.keyword("green");

// Express app
const app = express();
const port = 3000;

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '../'));

// use body parser to easy fetch post body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//route that receives the post body and returns your computation
app.post('/api/selector', function sendScrapyParams(req, res, next) {
    // res.render(__dirname + '/index.html');
    const myData = {
        URL_1: req.body.param1,
        selector: req.body.param2
    };
    res.json(myData);
    console.log(success(myData["URL_1"]));
    console.log(success(myData["selector"]));
    module.exports.myData = myData;
});


app.listen(port, () => console.log(chalk.blue(`This app is listening on port ${port}`, '\n')));

// Here is where puppeteer starts
(async () => {
    try {
        
        const browser = await puppeteer.launch({headless: false});
        // open a new page
        const page = await browser.newPage();
        //enter url in page
        await page.waitForRequest('api/selector', {waitUtil: 'domcontentloaded'});
        await page.goto(this.myData["URL_1"], {waitUtil: 'domcontentloaded'});
        
        console.log(this.myData["URL_1"]);
        console.log(this.myData["selector"]);

        // set the page size
        await page.setViewport({
            width: 1200,
            height: 1200
        });

        // go to the bookstore and take a picture
        await page.screenshot({ path: "1.png"});

        const result = await page.evaluate(() => {
            let selectorCSS = document.querySelector(this.myData["selector"]).innerText;

            return {
                selectorCSS
            }
        });
        await browser.close();
        console.log(result + '\n');
        console.log(success("Got Data Hooray! 🎉 🎉 🎉 \n"));
        return result;    

    }   catch (err){
        console.log(error(err));
        await browser.close();
        console.log(error("Aw Snap, somethings not working correctly 💩 💩 💩 \n"));
    }
})();