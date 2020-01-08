// Navigation Bar & Seamless page loading
"use strict";

// Configureables
const animationTime = 750;
const timeBetweenAnim = animationTime + 250; // only change the number

// Variables
const sep = "<b><b>|</b></b>";
const navlinks = {
    "Home": "/",
    "About Me": "/about",
    "Half Past Noon": "/hpn",
    "Programming Projects": "/programming",
    "Sheet Music": "/music",
    "Contact": "/contact",
}
var debounce = false
var currentPath = location.pathname;

// Run on ready
$(document).ready(function() {
    // Create nav links
    let str = `${sep} `;
    for (let text in navlinks) {
        str += `<a href="${navlinks[text]}">${text}</a> ${sep} `;
    }
    $("#navbar").html(str);
    
    // Bind them
    $("#navbar").children().each(function(i,e) {
        if (navlinks[e.innerText] != null) {
            e.onclick = function() {
                if (debounce) return false;
                history.pushState({}, '', navlinks[e.innerText]);
                loadPage();
                return false;
            };
        }
    });
    
    $(window).bind('popstate', function() {
        loadPage(location.pathname);
    });
});

// Load page (incl. animations)
function loadPage() {
    
    // Debounce + Same page check (return if the page is the same)
    if (debounce || location.pathname == currentPath) return;
    else debounce = true; 
    
    let content = $("#content");
    
    // "Unload" animation
    content.animate({paddingTop: "+=300px", opacity: "0"}, animationTime);
    
    // Wait half a second
    setTimeout(function() {
        // Update page
        currentPath = location.pathname;
        content.load(currentPath + " #content");
        // Load animation
        content.animate({paddingTop: "-=300px", opacity: "1"}, animationTime);
        // Debounce
        setTimeout(function() { debounce = false; }, animationTime);
    }, timeBetweenAnim);
    
}

