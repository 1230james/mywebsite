// Navigation Bar & Seamless page loading
"use strict";

const sep = "<b><b>|</b></b>";
const navlinks = {
    "Home": "file:///C:/Users/james/Desktop/ProgrammingProjects/1230james.github.io/index.html",
    "About Me": "file:///C:/Users/james/Desktop/ProgrammingProjects/1230james.github.io/about/index.html",
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
                console.log("Clicked " + e.innerText);
                console.log("Path to new page: " + navlinks[e.innerText]);
                history.pushState({ path: this.path }, '', navlinks[e.innerText]);
                loadPage(navlinks[e.innerText]);
                return false;
            };
        }
    });
    
    $(window).bind('popstate', function() {
        history.go(-1);
    });
});

// Load page (incl. animations)
function loadPage(url) {
    console.log("Loading page!");
    // "Unload" animation
        // TODO
    
    // Update page
    $("#content").load(url + " #content");
    
    // Load animation
        // TODO
}

