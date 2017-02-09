


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
        uploadCSV(file, function(data){
            data.forEach(function(obj){
                var search = new XMLHttpRequest();

                var song = obj.Song.replace(/ /g, "+");
                var artist = obj.Artist.replace(/ /g, "+");
                search.open('GET', "https://api.spotify.com/v1/search?q=track:"+song+ "+artist:"+artist+"&type=track&limit=1");
                search.send();
                search.onreadystatechange = function(){
                    if(this.readyState === 4 && this.status === 200){
                        var songInfo = JSON.parse(this.responseText);
                        songInfo = songInfo.tracks.items[0];
                        var numVotes = parseInt(obj.NumVotes);
                        if (isNaN(numVotes) == true) {
                            numVotes = 0;
                        };
                        var tempSong = new Song(songInfo, numVotes);
                        tempSong.getGenre(tempSong.info.artists[0].id, tempSong);
                        tempArray.push(tempSong);
                    };
                };
            });
        });
        this.songs = tempArray.sort(function(a,b){
            return a.votes - b.votes;
        });
    };

    displaySongs(genre){
        this.songs.forEach(function(j){
            j.genre.forEach(function(z){
                if (z === genre) {
                    j.displaySong;
                };
            });
        });
    };
};

//Main

var list = new Playlist;
list.getSongs("playlist.csv");

$('#songs').keypress(function(){
	var val = $("input").val();
	list.searchSong(val);
	
})
function uploadCSV(file, callback){
    var csv = new XMLHttpRequest();
    csv.open("GET", "playlist.csv");
    csv.send();
    csv.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            var tempList = this.responseText.split(/\r\n|\n/);
            var headers = tempList[0].split(',');
            var songObjs = [];
            for (j =1; j < tempList.length; j++){
                var tempInfo = tempList[j].split(',');
                if (tempInfo.length === headers.length){
                    var tempObj = new Object();
                    for(k = 0; k < headers.length; k++){
                        tempObj[headers[k]] = tempInfo[k]  ;
                    }
                    songObjs.push(tempObj);
                }
            }
           callback(songObjs)
        }
    }
}
$('#search').click(function(){
    var text = $('input').val();
    var search = new XMLHttpRequest();

    var param = text.replace(/ /g, "+");
    search.open("GET", "https://api.spotify.com/v1/search?q="+param+"&type=album,track,artist&limit=10");
    search.send();
    search.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            var songInfo = JSON.parse(this.responseText);
            songInfo = songInfo.tracks.items;
            songInfo.forEach(function(j){
                console.log(j);
            });
        };
    };
});

$('#hambugerMenu').click(function(){
    $(this).css("display", "none")
    $('#navBar').animate({left: "+=20%"});   
});
$('#x').click(function(){
    $('#navBar').animate({left: "-=20%"});
    $('#hambugerMenu').css("display", "block")
})

var genres = ["All Songs","Hip Hop", "Rock", "Pop", "Country", "R&B"]

genres.forEach(function(data){
    var gButton = "<button type=\"button\" style=\" background:linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),url(images/" + data.replace(" ", "_")+ ".jpg); background-size: cover;\">" + data + "</button>"
    $('#genres').append(gButton)
})
$('button').mouseenter(function(data){
    var background = $(this).attr("style")
    background = background.replace("45", "00")
    $(this).attr("style", background)
})
$('button').mouseleave(function(data){
    var background = $(this).attr("style")
    background = background.replace("00", "45")
    $(this).attr("style", background)
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
