// Navigation Bar & Seamless page loading
"use strict";

const sep = "<b><b>|</b></b>";
const navlinks = {
    "Home": "/",
    "About Me": "/",
    "Half Past Noon": "/",
    "Programming Projects": "/",
    "Sheet Music": "/",
    "Contact": "/",
}

// Run on ready
$(document).ready(function() {
    // Create nav links
    let str = "";
    for (let text in navlinks) {
        str += `<a href="${navlinks[text]}">${text}</a> ${sep} `;
    }
    $("#navbar").html(str);
    
    // Bind them
    $("#navbar").children().each(function(i,e) {
        if (navlinks[e.innerText] != null) {
            e.onclick = function() {
                history.pushState({ path: this.path }, '', this.href);
                $.get(this.href, function(data) {
                    console.log(data);
                });
                return false;
            };
        }
    });
});

/*

// Smooth loading functions

// Page load
function loadPage(url) {
    
}

// On click
function handleClicked(element) {
    if (navlinks[element.innerText]) {
        loadPage(navlinks[element.innerText]);
        return false; // stop default behavior
    }
    return true;
}

// On click event
$(document).onclick = function(e) {
    // https://stackoverflow.com/questions/1760096/override-default-behaviour-for-link-a-objects-in-javascript
    e = e || window.event;
    let element = e.target || e.srcElement;
    if (element.tagName == "A") {
        return handleClicked(element);
    }
}

*/