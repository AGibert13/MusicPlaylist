$(document).ready(function(){
	d3.csv("playlist.csv", function(data){
		console.log(data[0])
	})
})