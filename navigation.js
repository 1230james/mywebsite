// Navigation Bar & Seamless page loading
"use strict";

// Configureables
const animationTime = 750;
const timeBetweenAnim = 250; // only change the number
const animationDistance = 300; // # of pixels to slide content by when changing page

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
var debounce = false;
var isUnloadAnimationPlaying = false;
var currentPath;
var contentPaddingTopHigh; // too bad they can't be consts qq
var contentPaddingTopLow;

// Run on ready
$(document).ready(function() {
    // Set contentPaddingTop values
    contentPaddingTopHigh = $("#content").css("paddingTop");
    contentPaddingTopLow = (parseInt(contentPaddingTopHigh.replace(/\D/g,''))
        + animationDistance) + "px";
    
    // Create nav links
    fixLinks();
    let str = `${sep} `;
    for (let text in navlinks) {
        str += `<a href="${navlinks[text]}">${text}</a> ${sep} `;
    }
    $("#navbar").html(str);
    currentPath = location.pathname;
    
    // Bind 
    $("a").each(function(i,e) {
        e.onclick = function() {
            if (isLocalAnchor(e)) {
                history.pushState({}, '', navlinks[e.innerText]);
                if (!debounce) {
                    debounce = true;
                    loadPage();
                } else {
                    return false;
                }
                return false;
            } else return true;
        };
    });
    
    $(window).bind('popstate', function() {
        if (!isUnloadAnimationPlaying) {
            debounce = true;
            loadPage();
        } else {
            setInterval(function() { // Wait until unload anim is done
                if (!isUnloadAnimationPlaying) {
                    clearInterval();
                    loadContent();
                }
            }, 100);
        }
    });
});

// Load page (incl. animations)
function loadPage() {
    // Same page check (return if the page is the same)
    if (location.pathname == currentPath) return;
    
    // "Unload" animation
    isUnloadAnimationPlaying = true
    $("#content").animate({paddingTop: contentPaddingTopLow, opacity: "0"}, animationTime, "swing", function() {
        setTimeout(function() {
            loadContent();
            isUnloadAnimationPlaying = false;
            // Load animation
            $("#content").animate({paddingTop: contentPaddingTopHigh, opacity: "1"}, animationTime, "swing", function() {
                debounce = false;
            });
        }, timeBetweenAnim);
    });
}

// Load content
function loadContent() {
    // Load new content
    currentPath = location.pathname;
    $("#content").load(currentPath + " #content >");
    // Load new title
    $.get(currentPath, function(html) {
        $("title").html($(html).find("title").html());
    });
}

// Check whether hostname is local or external
function isLocalAnchor(element) {
    if (element.rel == "external") return false;
    let hostname = element.hostname;
    console.log(hostname);
    return (location.hostname == hostname || hostname.length < 1);
}

// Fix some links for offline testing
function fixLinks() {
    if (location.protocol == "file:") {
        let path = location.pathname;
        path = path.substring(0,path.lastIndexOf("/"));
        let isHome = true;
        for (let k in navlinks) {
            if (navlinks[k] == "/") continue;
            if (path.includes(navlinks[k])) {
                isHome = false;
                break;
            }
        }
        if (!isHome) {
            path = path.substring(0,path.lastIndexOf("/"));
        }
        for (let k in navlinks) {
            navlinks[k] = path + navlinks[k] + "/index.html";
        }
        $("#content a").each(function(i,e) {
            if (isLocalAnchor(e)) {
                let href = e.href.substring( e.href.indexOf("///") + 2, e.href.length );
                e.href = path + href + "/index.html";
            }
        });
    }
}