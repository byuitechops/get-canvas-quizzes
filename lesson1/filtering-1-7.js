/*eslint-env node*/
/*eslint no-unused-vars:0, no-console:0*/

function objToQuery(obj) {
    var query = Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
    return '?' + encodeURI(query);
}

var fs = require('fs'),
    got = require('got'),
    token = require('../getToken.js')('../token.json'),
    color = require('chalk'),
    domain = 'https://canvas.instructure.com',
    apiCall = '/api/v1/calendar_events',
    query = {
        //format yyyy-mm-dd or ISO 8601 YYYY-MM-DDTHH:MM:SSZ
        start_date: "2010-12-01",
        //defaults to start_date
        end_date: "2011-01-31",
        access_token: token
    };

//test my api key
got(domain + apiCall + objToQuery(query))
    .then(function (response) {
        var body = JSON.parse(response.body);
        console.log("Responce Body:")
        console.log(color.gray(JSON.stringify(body, null, 4)));
        console.log('answer:');
        console.log(color.green('event id: ' + body[0].id));
    })
    .catch(function (error) {
        console.log(color.red(error.response.body));
    });
