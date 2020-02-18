// Music page loading
"use strict";

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
    video: "url to video",
    completed: boolean
}
*/

/* Sample of intended HTML for each song container
<div class="song">
    <img src="icon" alt="name"></img>
    <h3 class="textcenter">name</h3>
    <h4 class="textcenter">origin</h4>
    <p>desc</p>
    <div class="buttons">
        <button type="button">Download</button>
        <button type="button">Video</button>
    </div>
</div>
*/

// ============================================================================

// On ready
$(document).ready(function() {
    for (songObj of musicList) {
        let container = getSongContainer(songObj);
        addToTableOfContents(songObj);
    }
});

// Construct the song container
function getSongContainer(obj) { // oh yeah we out here about to use jQuery like a retard
    // Create container
    let container = $("<div id=\"" + obj.name + "\" class=\"song\"></div>");
    
    // Icon
    let iconImg = $("<img src=\"" + obj.icon + "\" alt=\""
        + obj.name + "\"></img>");
    container.append(iconImg);
    
    // Text
    let header = $("<h3 class=\"textcenter\">" + obj.name + "</h3>");
    let subheader = $("<h4 class=\"textcenter\">" + obj.origin + "</h4>");
    let desc = $("<p>" + obj.desc + "</p>");
    container.append(header,subheader,desc);
    
    // Buttons
    if (obj.completed) {
        let buttons = $("<div class=\"buttons\"></div>");
        let downloadBtn = $("<button type=\"button\">Download</button>");
        let videoBtn = $("<button type=\"button\">Video</button>");
        downloadBtn.click(function(e) {
            window.open(obj.archive);
        });
        videoBtn.click(function(e) {
            window.open(obj.video);
        });
        buttons.append(downloadBtn,videoBtn);
        container.append(buttons);
    }
    
    return container;
}

// Add song to the ToC
function addToTableOfContents(obj) {
    let anchor = "<a href=\"#" + obj.name + "\">" + obj.name + "</a>";
    let listObj = $("<li>" + anchor + "</li>");
    if (obj.completed) 
        $("#completedList").append(listObj);
    else
        $("#inProgressList").append(listObj);
}