// Music page loading

// ============================================================================

var musicList;
$.get("musiclist.json",null,function(data) {
    musicList = JSON.parse(data);
}, "json");
/* Template for one entry in musicList
{
    name: "Name of song",
    origin: "Name of origin of song",
    icon: "path/to/the/icon.png",
    desc: "Description of the song",
    archive: "path/to/the/archive.zip",
    completed: boolean
}
*/

// ============================================================================

// On ready
$(document).ready(function() {
    
});

// Functions for days
function loadSong(songObj) {
    let obj = $("<div></div>");
}