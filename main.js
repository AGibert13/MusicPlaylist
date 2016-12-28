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
				var tempSong = songs(songInfo.artists[0].name,songInfo.album.name, songInfo.name, songInfo.album.images[1].url,songInfo.preview_url,obj.NumVotes)
				tempSong.getGenre(songInfo)
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