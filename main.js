// $(document).ready(function(){

	var Spotify = require('spotify-web-api-js');
	var s = new Spotify();

	
	d3.csv("playlist.csv", function(data){
		data.forEach(trackCreator)
	})

	function trackCreator(obj,index){
    s.search(obj.Song + " " + obj.Artist, ['track'], {limit: 1})
			.then(function(data){
				var songInfo = data.tracks.items[0]
				var album = songInfo.album.name
				var albumImg = songInfo.album.images[1].url
				console.log(albumImg)
				var artist = songInfo.artists[0].name
				var votes = obj.NumVotes
				var preview = songInfo.preview_url
				var track = songInfo.name
				$('#songs').append("<div><span>"+ index+ "</span><img src="+albumImg+"><ul><li>" + track + "</li><li>" + artist+ "</li><li>"+ album + "</li><li>"+ votes + "</ul><audio src="+preview+ " controls></audio></div>")
			})
	

	
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