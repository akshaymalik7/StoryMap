// Defining the first slide
var myData = pageData[0];

console.log(myData.center);
/* =====================
  Map Data
===================== */
var downloadData = $.ajax("http://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-solar-installations.json");
var parseData = function(i) {
  return JSON.parse(i);
};

var makeMarkers = function(i) {
  var lat;
  var long;
  var list=[];

  $.map(i, function(element){
    var lat =  element.LAT ;
    var long =  element.LONG_ ;
    list.push([lat, long]);
  })

  return list;
};


var plotMarkers = function(somelist) {
  $.map(somelist, function(list){
    L.circleMarker(list).addTo(map);
  }
)};

downloadData.done(function(data) {
  var parsed = parseData(data);
  var markers = makeMarkers(parsed);
  //console.log(markers);
  plotMarkers(markers);
});

/* =====================
  Map Setup
===================== */

var map = L.map('map', {
  center: myData.center,
  zoom: 12
});

var Stamen_Watercolor = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 1,
	maxZoom: 16,
	ext: 'png'
}).addTo(map);

/* =====================
  Slides
===================== */


// Load first slide
console.log(myData.head);
$("#title1").text(myData.head);
$("#title2").text(myData.par);

// Function for clicks
var previousClick = function(){
  var i = myData.number-2;
  var len = pageData.length
  if ((len -i)<= len ) {
    myData = pageData[i];
    $("#title1").text(myData.head);
    $("#title2").text(myData.par);
    map.setView(myData.center);
  }
  if ((len-i)> len) {
    myData = pageData[5];
    $("#title1").text(myData.head);
    $("#title2").text(myData.par);
    map.setView(myData.center);
  }
}
var nextClick = function(){
  var i = myData.number;
  var len = (pageData.length-1)
  if ((len -i)>=0) {
    myData = pageData[i];
    $("#title1").text(myData.head);
    $("#title2").text(myData.par);
    map.panTo(myData.center);
  }
  if ((len-i)< 0) {
    myData = pageData[0];
    $("#title1").text(myData.head);
    $("#title2").text(myData.par);
    map.panTo(myData.center);
  }
}
