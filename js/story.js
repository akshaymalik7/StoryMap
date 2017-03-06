// Defining the first slide
var currentData = pageData[0];
var currentPath = currentData.info.features[0]


/* =====================
  Map Setup
===================== */
mapboxgl.accessToken = 'pk.eyJ1IjoibWFha3MiLCJhIjoiY2l6cjRrZDMxMDF4dTM2cWc3eGxsYjU3diJ9.5wHed5clNi25rKFn34ZMXg';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/maaks/cizxbj1vs003a2ssj17j2ls5y',
zoom: 12,
center: [76.785958, 30.733821]
});

map.on('load', function () {
map.scrollZoom.disable();

    map.addLayer({
        "id": "route",
        "type": "line",
        "source": {
            "type": "geojson",
            "data": currentData.info
        },
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#EA1D1D",
            "line-width": 2,
            "line-opacity": 0.2

        }
    });
});

/* =====================
  Slides
===================== */

// Function for clicks
var cllickFunction = function (i)
{
  $("#header").text(i.head);
  $("#paragraph01").text(i.par);
  map.setCenter(i.center);
  console.log(i.center);

}

// Load first slide
console.log(currentData.head);
cllickFunction(currentData);


var previousClick = function()
{
    var i = currentData.number-2;
    var len = pageData.length

    if ((len -i)<= len ) {
      currentData= pageData[i];
      cllickFunction(currentData); }

    else if ((len-i)> len) {
      currentData = pageData[5];
      cllickFunction(currentData); }
}

var nextClick = function()
{
  var i = currentData.number;
  var len = (pageData.length-1)
  if ((len -i)>=0) {
    currentData = pageData[i];
    cllickFunction(currentData); }

  else if ((len-i)< 0) {
    currentData = pageData[0];
    cllickFunction(currentData); }
}

/* =====================
  Turf - moving a point along the path
===================== */

//var slicedLines = turf.lineSLice(startChadigarh, stopChadigarh, pathChandigarh.features[0]);
var lengthAlongLines = turf.lineDistance(currentPath, 'kilometers');
console.log(lengthAlongLines);
var movingMarker = turf.along(currentPath,0, 'kilometers');

map.on('style.load', function () {

  map.addSource("circleMarker", {
    "type": "geojson",
    "data": movingMarker,
    "maxzoom": 13
  });


  map.addLayer({
    "id": "circleMarker",
    "type": "circle",
    "source": "circleMarker",
    "layout": {},
    "paint": {
      "circle-radius": 6,
      "circle-color" : "#EA1D1D"

    }
  });

  var step = 0;
  var numSteps = 500; //Change this to set animation resolution
  var timePerStep = 50; //Change this to alter animation speed
  var pointSource = map.getSource('circleMarker');
  var interval = setInterval(function() {
    step += 1;
    if (step < numSteps)  {
      var curDistance = step / numSteps * lengthAlongLines;
      var movingMarker = turf.along(currentPath, curDistance, 'miles');
      pointSource.setData(movingMarker);
      //map.setCenter(movingMarker.geometry.coordinates);

    }

    else {
    //  nextClick();
    }
  }
  , timePerStep);
  });
