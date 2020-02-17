// Music page loading

// ============================================================================

var musicList;
$.get("musiclist.json",null,function(data) {
    musicList = JSON.parse(data);
}, "json");
/* Template for one entry in musicList
{
    name: "SongName",
    origin: "SongOrigin",
    icon: "IconPath",
    desc: "Description",
    meta: "MetaText",
    archive: "ArchivePath"
}
*/

// ============================================================================

