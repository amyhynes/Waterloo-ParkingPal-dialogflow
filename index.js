// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';
 
//const functions = require('firebase-functions');
const { dialogflow } = require('actions-on-google');
const app = dialogflow();

var index;

app.intent('Default Fallback Intent', conv => {
    var res1 = (`Im sorry but I am having some trouble hearing you, can you try that again?`);
    var res2 = (`My apologies, my hearing is off today, can you repeat that?`);
    var res3 = (`I am having some issues hearing you, can you try once more?`);
    var res4 = (`I didn't understand`);
    var res5 = (`I'm sorry, can you try again?`);
    var responses = [ res1, res2, res3, res4, res5 ];
    index = Math.floor(Math.random() * responses.length);
    conv.ask(responses[index]);
});

app.intent('Default Welcome Intent', conv => {
    console.log("Welcome intent")
    conv.data.session = {}
    let session = conv.data.session;
    console.log(conv);
    
    session.questionStorage = [];
    
    conv.ask("Hi! I'm your Waterloo Parking Pal! I can help you park safely and legally in Waterloo. Would you like to begin?");
});

app.intent('firstQuestion', (conv, params) => {
    console.log("first question intent");
    console.log("params: " + JSON.stringify(params));
    
    if( params.Agreement == "Yes" ) {
        // yes, they would like to begin
        conv.ask("First question - Are you obstructing a sidewalk?");
    } else {
        // no, they don't want to begin
        conv.close("Alright, see you later! And remember - always park safe!");
    }
});

app.intent('secondQuestion', (conv, params) => {
    console.log("second question intent");
    console.log("params: " + JSON.stringify(params));
    
    if( params.Agreement == "Yes" ) {
        // yes obstructing, exit
        conv.close("Sorry, you can't park there! See you later, and remember - always park safe!");
    } else {
        // not obstructing, continue to next question
        conv.ask("Great! Are you parked within 5m of a driveway?");
    }
});

app.intent('thirdQuestion', (conv, params) => {
    console.log("thirddd question intent");
    console.log("params in third: " + JSON.stringify(params));
    
    if( params.Agreement == "Yes" ) {
        console.log("in third yes");
        // yes driveway, exit
        conv.close("Nice try, you can't park there! See you later, and remember - always park safe!");
    } else {
        console.log("in third NO");
        // not driveway, continue to next question
        conv.ask("Well done! Are you parked within 9m of an intersection?");
    }
});

app.intent('fourthQuestion', (conv, params) => {
    console.log("fourth question intent");
    console.log("params: " + JSON.stringify(params));
    
    if( params.Agreement == "Yes" ) {
        // yes intersection, exit
        conv.close("No way, you can't park there! Bye for now, and remember - always park safe!");
    } else {
        // not intersection, continue to next question
        conv.ask("Perfect! Are you parking for more than 3 hours?");
    }
});

app.intent('fifthQuestion', (conv, params) => {
    console.log("fifth question intent");
    console.log("params: " + JSON.stringify(params));
    
    if( params.Agreement == "Yes" ) {
        // yes more than 3, details + continue
        conv.close("Too bad, you can't park on the street for more than 3 consecutive hours! You should come back to move your car before 3 hours is up. See you soon, and remember - always park safe!");
    } else {
        // not more than 3, continue to next question
        conv.ask("Wow, what a great citizen! Are you parking between 2:30am and 6:00am?");
    }
});

app.intent('sixthQuestion', (conv, params) => {
    console.log("sixth question intent");
    console.log("params: " + JSON.stringify(params));
    
    if( params.Agreement == "Yes" ) {
        // yes in those hours, details + exit
        console.log("IN THE YES")
        conv.close("Too bad, you can't park here between those hours without registering your vehicle! Bye for now, and remember - always park safe!");
        
    } else {
        // not in those hours, congrats + exit
        conv.close("Congratulations, you can park here safely and legally. Happy parking!");
    }
    
});

exports.dialogflowFirebaseFulfillment = app;
