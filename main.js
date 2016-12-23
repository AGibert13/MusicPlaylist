// $(document).ready(function(){

	var Spotify = require('spotify-web-api-js');
	var s = new Spotify();

	
	d3.csv("playlist.csv", function(data){
		data.forEach(trackCreator)
	})

	function trackCreator(obj){
    s.search(obj.Song + " " + obj.Artist, ['track'], {limit: 1})
			.then(function(data){
				s.getTrack("6Knv6wdA0luoMUuuoYi2i1")
					.then(function(data2){
						console.log( "Track", data)
					})
			})
	var album = obj.album
	var albumImg = obj.AlbumImage
	var artist = obj.Artist
	var votes = obj.NumVotes
	var preview = obj.Preview
	var track = obj.Song

	$('body').append("<div><audio src="+preview+ " controls></audio><img src="+albumImg+"><ul><li>" + track + "</li><li>" + artist+ "</li><li>"+ album + "</li><li>"+ votes + "</ul></div>")
}


// 	import {Client, TrackHandler, PlaylistHandler} from 'spotify-sdk';
// let client = Client.instance;
// client.settings = {
// 	clientId: '9f8a2c181e9b434d8ea369340dd13ad3',
// 	secretId: '2f995ff7d2d64ab38fbccccfde00dc91',
// 	scope: ["-"],
// 	redirect_uri:'https://agibert13.github.io/MusicPlaylist/index.html'
// };

// })