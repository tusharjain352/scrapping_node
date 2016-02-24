var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/',function(req,res){
    console.log("request get /---------------");

    res.end("use /data url for get scrapping data")
})

app.get('/data', function(req, res){
    // The URL we will scrape from - in our example Anchorman 2.
    console.log("request-------------------in  appscrapping------------")
    url = 'http://www.imdb.com/title/tt1229340/';

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            //console.log(html);
            /*fs.writeFile("data.txt", html, function(err) {
                if(err) {
                    return console.log(err);
                }else{
                    console.log("The file was saved!");
                }

            }); */

    

            var outputJson = [];
            var a =0;
            var $ = cheerio.load(html);
            var parsedHTML = $.load(html)
            // Finally, we'll define the variables we're going to capture
            parsedHTML('.itemprop').map(function(i, foo) {
              // the foo html element into a cheerio object (same pattern as jQuery)
              foo = $(foo)
              var str = foo.text().replace(/\r?\n|\r/g, " ");
              str = str.replace(/ /g,'');
              outputJson.push({a :str})
              a++;
              console.log("foo-----------------------",foo.text())
            })

            var outputJson1 = [];
            var b =0;
            parsedHTML('.character').map(function(i, foo) {
              // the foo html element into a cheerio object (same pattern as jQuery)
              foo = $(foo)
              var str = foo.text().replace(/\r?\n|\r/g, " ");
              str = str.replace(/ /g,'');
              outputJson1.push({b :str})
              
              console.log("tagName-----------------------",foo.get(0).tagName);
            })
            var title, release, rating,story;
            var json = { title : "", release : "", rating : "", story :""};


            /*$('.title_wrapper').filter(function(){
                var data = $(this);
                title = data.children().first().text().trim();
                release = data.children().last().children().last().text().trim();

                json.title = title;
                json.release = release;
            })

            $('.ratingValue').filter(function(){
                var data = $(this);
                rating = data.text().trim();

                json.rating = rating;
            })

            $('.article').filter(function(){
                var data = $(this);
                story = data.text();
            })*/
            //console.log("json---",json)
        }

        // var finalRes=xmlToJson(html)
        // console.log("finalRes",finalRes)
        outputJson = outputJson.concat(outputJson1); 
        res.send(outputJson)
    })
})



app.listen(process.env.PORT || 5000)
console.log('Magic happens on port 5000');
exports = module.exports = app;