function songs(art, alb, name, albImg, preview, votes = 0){ 
	var Song = {
		artist: art,
		album: alb,
		track: name,
		albumImage: albImg,
		votes: votes
	};

    Song.displaySong =function()
    {
        $('#songs').append("<div><span>"+ index+ "</span><img src="+albumImg+"><ul><li>" + track + "</li><li>" + artist+ "</li><li>"+ album + "</li><li>"+ votes + "</ul><audio src="+preview+ " controls></audio></div>")
    }

    Song.getGenre = function(song)
    {
        var artist = s.getArtist(song.artists[0].id)
        console.log(artist)
    }	
		
		
	Song.addVote= function()
	{
		votes+=1
	}
	return Song
}
