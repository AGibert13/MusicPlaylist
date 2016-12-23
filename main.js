// $(document).ready(function(){

	var Spotify = require('spotify-web-api-js');
	var s = new Spotify();

	var spotifyApi = new SpotifyWebApi();

	
	d3.csv("playlist.csv", function(data){
		data.forEach(trackCreator)
	})

	function trackCreator(obj){
		spotifyApi.search(['track:'+obj.Song, 'artist:'+ obj.Artist])
			.then(function(data){
				console.log('Search artist by'+obj.Song, data)
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