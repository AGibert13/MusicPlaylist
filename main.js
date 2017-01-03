


//Classes

class Song {
	constructor(info, votes = 0){ 
		this.artist = info.artists[0].name;
		this.album= info.album.name;
		this.track= info.name;
		this.albumImage= info.album.images[1].url;
		this.preview = info.preview_url
		this.votes= votes;
		this.genre= [];
		this.info = info;
	};

    displaySong()
    {
        $('#songs').append("<div><span>"+ index+ "</span><img src="+albumImg+"><ul><li>" + track + "</li><li>" + artist+ "</li><li>"+ album + "</li><li>"+ votes + "</ul><audio src="+preview+ " controls></audio></div>")
    }

    getGenre(id,obj)
    {
    	
     	var search = new XMLHttpRequest()
     	search.open('GET', "https://api.spotify.com/v1/artists/"+id);
     	search.send();
     	search.onreadystatechange = function(){
			if(this.readyState === 4 && this.status === 200){
				var artistInfo = JSON.parse(this.responseText);
				obj.genre = artistInfo.genres;
			}
		}
		 
    }	
		
		
	addVote()
	{
		votes+=1
	}
}

class Playlist {
	constructor(){
		this.songs = [];
	}

	getSongs(file){
		var tempArray = []
		d3.csv(file, function(data){
			data.forEach(function(obj){
				var search = new XMLHttpRequest()

				var song = obj.Song.replace(/ /g, "+")
				var artist = obj.Artist.replace(/ /g, "+")
				search.open('GET', "https://api.spotify.com/v1/search?q=track:"+song+ "+artist:"+artist+"&type=track&limit=1")
				search.send()
				search.onreadystatechange = function(){
					if(this.readyState === 4 && this.status === 200){
						var songInfo = JSON.parse(this.responseText)
						songInfo = songInfo.tracks.items[0]
						var numVotes = parseInt(obj.NumVotes)
						if (isNaN(numVotes) == true) {
							numVotes = 0
						}
						var tempSong = new Song(songInfo, numVotes)
						tempSong.getGenre(tempSong.info.artists[0].id, tempSong)
						tempArray.push(tempSong)
					}
				}
			})
		})
		this.songs = tempArray.sort(function(a,b){
			return b.votes - a.votes
		})
	}

	displaySongs(genre){
		this.songs.forEach(function(j){
			j.genre.forEach(function(z){
				if (z === genre) {
					j.displaySong;
				}
			})
		})
	}

	searchSong(text){
		var search = new XMLHttpRequest();

		var param = text.replace(/ /g, "+")
		search.open("GET", "https://api.spotify.com/v1/search?q="+param+"&type=album,track,artist&limit=10")
		search.send()
		search.onreadystatechange = function(){
			if(this.readyState === 4 && this.status === 200){
				var songInfo = JSON.parse(this.responseText)
				songInfo = songInfo.tracks.items
				songinfo.forEach(function(j){
					console.log(j)
				})
			}
		}
	}
}

//Main

var list = new Playlist;
list.getSongs("playlist.csv")

$('#songs').keypress(function(){
	var val = $("input").val();
		list.searchSong(val)
	
})

//Test Functions

/*$(document).ready(function(){

	//var Spotify = require('spotify-web-api-js');
	//var s = new SpotifyWebApi();


 	function trackCreator(obj,index){
     s.search(obj.Song + " " + obj.Artist, ['track'], {limit: 1})
 			.then(function(data){
 				var songInfo = data.tracks.items[0]
 				var tempSong = songs(songInfo.artists[0].name,songInfo.album.name, songInfo.name, songInfo.album.images[1].url,songInfo.preview_url,obj.NumVotes)
 				tempSong.getGenre(songInfo)
			})
	

	
}

 	import {Client, TrackHandler, PlaylistHandler} from 'spotify-sdk';
 let client = Client.instance;
 client.settings = {
 	clientId: '9f8a2c181e9b434d8ea369340dd13ad3',
 	secretId: '2f995ff7d2d64ab38fbccccfde00dc91',
 	scope: ["-"],
 	redirect_uri:'https://agibert13.github.io/MusicPlaylist/index.html'
 };

 })*/
