require("dotenv").config();
var keys = require("./keys.js"); //required to import the `keys.js` file and store it in a variable.
var Spotify = require('node-spotify-api');
var twitter = require("twitter");
var fs = require("fs");
var request = require('request');
var userInput = '';
for (var i = 3; i < process.argv.length; i++) {
	userInput += process.argv[i] + ' ';
}


function showTweets(){
    var client = new twitter(keys.twitter);
    var params = {screen_name: 'Jane51403652'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
     if (!error) {
         for (var i=0; i<tweets.length;i++){
             var theTweet = tweets[i].text;
             var tweetDate = tweets[i].created_at;
             console.log(theTweet + " POSTED ON:  " + tweetDate);
            }
        }
    else {
        console.log ("An error has occurred")
    }
    });
}

function spotifySearch(song) {
    var spotify = new Spotify(keys.spotify);
    if (song  == "") {
        var userInput = "The Sign Ace of Base";
    }
    else {
        var userInput = song;
    }
        spotify.search({ type: 'track', query: userInput}, function(error, data){
            if(error){
                console.log ("An error has occurred")
            }
            else {
                console.log ("Song name: "+ data.tracks.items[0].name + " Artist(s): " + data.tracks.items[0].artists[0].name + " Album: "+ data.tracks.items[0].album.name + " Preview URL: " + data.tracks.items[0].preview_url);
            }
    });
}

function movieSearch(movie){
    var search;
	if (movie === '') {
		userInput = "Mr. Nobody";
    } 
    else {
		userInput = movie;
	}
    request('http://www.omdbapi.com/?apikey=trilogy&t=' + userInput + '&y=&plot=short&tomatoes=true&r=json', function(error, response, body){
        if (!error){
            var data=JSON.parse(body);
            console.log ("Movie name: " + data.Title);
            console.log ("Release Year: " + data.Year);
            console.log ("IMDB Rating: "+ data.imdbRating);
            console.log ("Rotten Tomatoes Rating: " + data.tomatoRating);
            console.log ("Produced in: " + data.Country);
            console.log ("Language: " + data.Language);
            console.log ("Plot: " + data.Plot);
            console.log ("Actors: "+ data.Actors);

    }
        else{
            console.log("an error has occured")
        }
});
}

function doThis(){
    fs.readFile("random.txt","utf8",function(error,data){
        data = data.split(',');
        var liriCom;
        if (data.length==2){
            liriCom = data[0];
            userInput = data[1];
        }

        if (data[0]=="my-tweets"){
            showTweets();
        }

        if (data[0]=="spotify-this-song"){
            spotifySearch(userInput);
        }

        if (data[0] === "movie-this"){
            movieSearch(userInput);
        }

});
}

if (process.argv[2] === "my-tweets"){
    showTweets();
}

if (process.argv[2] === "spotify-this-song"){
    spotifySearch(userInput);
}

if (process.argv[2] === "movie-this"){
    movieSearch(userInput);
}

if (process.argv[2] === "do-what-it-says"){
    doThis();
}