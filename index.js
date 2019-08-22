const puppeteer = require("puppeteer");
const chalk = require("chalk");
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
// const http = require('http');

// Create pretty console log messages for debugging
const error = chalk.bold.red;
const success = chalk.keyword("green");

// Express app
const app = express();
const port = process.env.PORT || 5000;

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '../'));
app.use(cors());

// use body parser to easy fetch post body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//route that receives the post body and returns your computation
app.post('/api/selector', async function sendScrapyParams(req, res, next) {

    const myData = {
        URL_1: req.body.param1,
        selector: req.body.param2
    };

    const result = await scrappyFunction(myData);
    res.json( { result, URL: myData.URL_1 });
    module.exports.myData = myData;
});


app.listen(port, () => console.log(chalk.blue(`This app is listening on port ${port}`, '\n')));

// Here is where puppeteer starts
const scrappyFunction = async (myData) => {
    try {

        const browser = await puppeteer.launch({
            // headless: true, // browser runs headless locally 
            args: [
                '--no-sandbox', // So puppeteer can run on heroku
                '--disable-setuid-sandbox',
            ],
        });
        // open a new page
        const page = await browser.newPage();
        //enter url in page
        // await page.waitForRequest('api/selector', {waitUtil: 'domcontentloaded'});
        
        await page.goto(myData["URL_1"], {waitUtil: 'domcontentloaded'});
        
        // console.log(myData["URL_1"]);
        // console.log(myData["selector"]);

        // set the page size
        await page.setViewport({
            width: 1200,
            height: 1200
        });

        console.log("evaluating " + myData.URL_1);

        const result = await page.evaluate((myData) => {
            console.log(JSON.stringify(myData));

            let selectorCSS = document.querySelector(myData["selector"]).innerText;
            console.log(selectorCSS);

            return selectorCSS;

        }, myData);

        await browser.close();
        console.log(JSON.stringify(result));
        console.log(success("Got Data Hooray! 🎉 🎉 🎉 \n"));
        return result;    

    }   catch (err){
        console.log(error(err));
        console.log(error("Aw Snap, somethings not working correctly 💩 💩 💩 \n"));
    }
};
