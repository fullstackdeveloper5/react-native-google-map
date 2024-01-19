/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Animated

} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import MapView from 'react-native-maps';
import { Marker, Polygon, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import WebView from 'react-native-webview';

const DrawOnMap = () => {
  const [position, setPosition] = useState({});
  const [currentLocation, setcurrentLocation] = useState({lat:30.7001314,lng:76.6990167});

  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [polygonHoles, setPolygonHoles] = useState([]);
  const [editing, setediting] = useState(true);
  const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);
  const mapRef = useRef<MapView>(null);
  const webViewRef = useRef(null);


const getlocationData = async()=>{
  Geolocation.getCurrentPosition((pos) => {
 
    const crd = pos.coords;
    setPosition({
      latitude: crd.latitude,
      longitude: crd.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setcurrentLocation({
      lat: crd.latitude,
      lng: crd.longitude})
  }
  )
}
  useEffect(() => {
    // setInterval(() => {
      getlocationData();
    // }, 2000);
  }, []);
  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    console.log(polygonCoordinates);
    setPolygonCoordinates([...polygonCoordinates, coordinate]);
  };
  const handlePolygonChange = (newCoords) => {
    setPolygonCoordinates(newCoords);
  };
  const onMessage = data => {
    let response = JSON.parse(data.nativeEvent.data);
      if (response.action === 'go-back') {
        alert("Going Back");
    }
}
  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>

<WebView
   ref={webViewRef}
   bounces={false}
   originWhitelist={['*']}
   style={{ opacity: 0.99 }}
   androidHardwareAccelerationDisabled={true}
   onMessage={onMessage}
        source={{html:`<html>

        <head>
          <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
          <title>Drawing Tools</title>
          <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

        </head>
        
        <body style="position: relative;">
          <div class="custom-icons">
            <button id="drawonmap" class="drawonmap">
              <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet" width="100" height="100">
                <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                  <path d="M910 4674 c-223 -58 -408 -245 -465 -469 -19 -76 -19 -224 0 -300 22
                                      -86 86 -211 140 -273 54 -61 151 -132 218 -161 l47 -20 0 -890 0 -890 -46 -20
                                      c-68 -30 -166 -103 -219 -163 -55 -63 -119 -188 -141 -278 -24 -95 -15 -262
                                      18 -352 70 -187 209 -326 396 -396 90 -33 257 -42 352 -18 90 22 215 86 278
                                      141 61 54 132 151 161 218 l20 47 890 0 890 0 20 -46 c30 -68 103 -166 163
                                      -219 63 -55 188 -119 277 -141 88 -22 252 -15 341 14 186 61 336 209 408 400
                                      33 90 42 257 18 352 -22 90 -86 215 -141 278 -53 60 -151 133 -219 163 l-46
                                      20 0 890 0 890 47 20 c67 29 164 100 218 161 55 63 119 188 141 278 24 95 15
                                      262 -18 352 -70 188 -208 326 -396 396 -90 33 -257 42 -352 18 -90 -22 -215
                                      -86 -278 -141 -60 -53 -133 -151 -163 -219 l-20 -46 -890 0 -890 0 -20 47
                                      c-29 67 -100 164 -161 218 -62 54 -187 118 -273 140 -74 19 -232 18 -305 -1z
                                      m267 -440 c116 -67 135 -233 39 -329 -69 -69 -157 -83 -245 -39 -134 67 -158
                                      244 -45 342 75 66 166 76 251 26z m2931 24 c66 -16 135 -87 151 -154 24 -98
                                      -20 -193 -110 -238 -89 -44 -176 -30 -246 40 -68 68 -81 154 -37 243 28 56 79
                                      98 136 111 47 11 54 11 106 -2z m-623 -495 c53 -108 170 -225 278 -278 l77
                                      -38 0 -887 0 -887 -77 -38 c-59 -29 -98 -58 -159 -119 -61 -61 -90 -100 -119
                                      -158 l-38 -78 -887 0 -887 0 -38 77 c-53 108 -170 225 -277 278 l-78 38 0 887
                                      0 887 78 38 c106 52 223 170 277 278 l38 77 887 0 887 0 38 -77z m-2351 -2495
                                      c81 -25 146 -118 146 -210 0 -51 -46 -135 -91 -165 -92 -61 -192 -51 -269 27
                                      -106 105 -81 268 51 334 58 29 101 32 163 14z m3015 -14 c132 -66 157 -229 51
                                      -334 -105 -106 -268 -81 -334 51 -44 90 -31 175 39 245 69 69 154 82 244 38z" />
                </g>
              </svg>
            </button>
            <button id="deletePolygon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path
                  d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
              </svg>
            </button>
            <button id="LiveIcon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path id="dylocation"
                  d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
              </svg>
            </button>
          </div>
          <input id="pac-input" class="controls" type="text" placeholder="Search Box" />
          <div id="area"></div>
          <div class="closeMain">
          <button class="closeButton">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="[http://www.w3.org/2000/svg"
          >
            ](http://www.w3.org/2000/svg%22%3E)
            <path
              d="M15 1L1 15"
              stroke="red"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1 1L15 15"
              stroke="red"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          </button>
          </div>
          <div id="map">
          </div>
          <script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDLTWltjt4XGXEQouRg3UgbZXEtCTdqKY&callback=initMap&libraries=drawing,places&v=weekly"
            defer></script>
        
          <script>
            var currentLocation = {};
            var mapOptions;
            var map;
            var livelocation = {};
            var coordinates = [
              { lat: 30.70899386452467, lng: 76.6757279925251 },
              { lat: 30.709003088878333, lng: 76.67643877791404 },
              { lat: 30.708463462704476, lng: 76.6764495067501 },
              { lat: 30.708470381007835, lng: 76.6757279925251 }
            ]
            let new_coordinates = []
            let lastElement
        
            function InitMap() {
              var centerPoints = {};
              if (coordinates?.length > 0) {
                centerPoints = findCenter(coordinates);
              }
        
        
              var zoomLevel = getZoomLevel(coordinates);
              
              var location = {};
              if (Object.keys(centerPoints).length > 0) {
                location = new google.maps.LatLng(centerPoints.lat, centerPoints.lng)
              }
              else {
                location = new google.maps.LatLng(livelocation.lat, livelocation.lng)
              }
        
              mapOptions = {
                zoom: zoomLevel ? zoomLevel : 18,
                center: location,
                mapTypeId: google.maps.MapTypeId.SATELLITE
              }
        
              // Get center Points
        
              function findCenter(coordinates) {
                const lats = coordinates.map(m => m.lat);
                const lngs = coordinates.map(m => m.lng);
                return {
                  lat: (Math.min(...lats) + Math.max(...lats)) / 2,
                  lng: (Math.min(...lngs) + Math.max(...lngs)) / 2
                };
              }
        
              // Get Zoom Level from polygon
        
              function getZoomLevel(polygon) {
                // Step 1: Find bounding box
                let minLat = Number.MAX_VALUE,
                  maxLat = -Number.MAX_VALUE,
                  minLng = Number.MAX_VALUE,
                  maxLng = -Number.MAX_VALUE;
        
                polygon.forEach((point) => {
                  minLat = Math.min(minLat, point.lat);
                  maxLat = Math.max(maxLat, point.lat);
                  minLng = Math.min(minLng, point.lng);
                  maxLng = Math.max(maxLng, point.lng);
                });
        
                // Step 2: Calculate center and dimensions
                const centerLat = (minLat + maxLat) / 2;
                const centerLng = (minLng + maxLng) / 2;
                const boxWidth = maxLng - minLng;
                const boxHeight = maxLat - minLat;
        
                // Step 3: Convert dimensions to pixels
                const pixelWidth = 256 * Math.pow(2, 21); // 21 is an arbitrary initial value for zoom level
        
                // Step 4: Calculate zoom level
                const zoomLevel = Math.log2(pixelWidth / boxWidth);
        
                return zoomLevel;
              }
        
              // Change Live location Button if User have not boundary yet
        
              if (coordinates?.length >= 0) {
                var setcolor = document.getElementById("dylocation");
                setcolor.setAttribute("style", "fill: #4285f4;");
              }
        
              map = new google.maps.Map(document.getElementById('map'), mapOptions);

                  var image = 'https://justpaste.in/fls/74g.png';
                  var marker = new google.maps.Marker({
                    position: {lat:${currentLocation?.lat},lng:${currentLocation?.lng}},
                    map: map,
                    icon: image,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25),
                  });
               
        
              const AddPolygon = new google.maps.Polygon({
                paths: coordinates,
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 6,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                editable: true,
                icons:{
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 6,
                    fillColor: '#fff',
                    fillOpacity: 0.5,
                    strokeWeight: 2,
                    strokeColor: 'white',
                    zIndex:1
                  }
              });
        
              google.maps.event.addListener(AddPolygon.getPath(), 'insert_at', function () {
                var area = google.maps.geometry.spherical.computeArea(AddPolygon.getPath());
                  var newArea = Math.round(area * 1) / 4046.86;
                  document.getElementById("area").innerHTML = "Area =" + newArea.toFixed(2);
        
                });
        
                google.maps.event.addListener(AddPolygon.getPath(), 'set_at', function () {
                  var area = google.maps.geometry.spherical.computeArea(AddPolygon.getPath());
                  var newArea = Math.round(area * 1) / 4046.86;
                  document.getElementById("area").innerHTML = "Area =" + newArea.toFixed(2);
                })
        
              var all_overlays = [];
        
              // Assign edit boundary shape object
        
              var selectedShape;
              const bounds = new google.maps.LatLngBounds();
        
              AddPolygon.setMap(map);
              AddPolygon.addListener('click', function (event) {
                AddPolygon.setEditable(!AddPolygon.getEditable());
                selectedShape = AddPolygon;
              })
        
              setSelection(AddPolygon);
        
              var drawingManager = new google.maps.drawing.DrawingManager({
                //drawingMode: google.maps.drawing.OverlayType.MARKER,
                //drawingControl: true,
                drawingControlOptions: {
                  position: google.maps.ControlPosition.TOP_RIGHT,
                  drawingModes: [
                    // google.maps.drawing.OverlayType.MARKER,
                    // google.maps.drawing.OverlayType.CIRCLE,
                    // google.maps.drawing.OverlayType.POLYGON,
                    //google.maps.drawing.OverlayType.RECTANGLE
                  ]
                },
                markerOptions: {
                  //icon: 'images/beachflag.png'
                },
                circleOptions: {
                  fillColor: '#ffff00',
                  fillOpacity: 0.2,
                  strokeWeight: 6,
                  clickable: false,
                  editable: true,
                  zIndex: 1
                },
                polygonOptions: {
                  clickable: true,
                  draggable: false,
                  editable: true,
                  fillColor: '#FF0000',
                  fillOpacity: 0.35,
                  strokeWeight: 6,
                  strokeColor: "red",
                  zIndex: 1,
                },
                rectangleOptions: {
                  clickable: true,
                  draggable: true,
                  editable: true,
                  fillColor: '#ffff00',
                  fillOpacity: 0.5,
        
                }
              });
        
              function clearSelection() {
                if (selectedShape) {
                  selectedShape.setEditable(false);
                  selectedShape = null;
                }
              }
              //to disable drawing tools
              function stopDrawing() {
                drawingManager.setMap(null);
              }
        
              function setSelection(shape) {
                console.log(shape);
                clearSelection();
                // stopDrawing()
                selectedShape = shape;
                shape.setEditable(true);
              }
              function saveSelectedBoundary() {
                if (selectedShape) {
        
                  var newdata = selectedShape.getPath();
                  var coordinates = [];
                  for (var i = 0; i < newdata.length; i++) {
                    var point = {
                      lat: newdata.getAt(i).lat(),
                      lng: newdata.getAt(i).lng()
                    };
                    coordinates.push(point);
        
                  }
                  
                  console.log(coordinates, "fhghghghghghg")
                }
                else {
                  var newdata = AddPolygon.getPath();
                  var bounds = [];
                  for (var i = 0; i < newdata.length; i++) {
                    var point = {
                      lat: newdata.getAt(i).lat(),
                      lng: newdata.getAt(i).lng()
                    };
                    bounds.push(point);
                  }
                }
              }
              function deleteSelectedShape() {
        
                if (selectedShape) {
        
                  selectedShape.setMap(null);
                  drawingManager.setMap(map);
                  coordinates.splice(0, coordinates.length)
        
                  // AddPolygon.setMap(null);
                }
              }
        
              function CenterControl(controlDiv, map) {
        
                // Set CSS for the control border.
                var saveControlUI = document.createElement('div');
                saveControlUI.style.backgroundColor = '#fff';
                saveControlUI.style.border = '2px solid #fff';
                saveControlUI.style.borderRadius = '3px';
                saveControlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
                saveControlUI.style.cursor = 'pointer';
                saveControlUI.style.marginBottom = '22px';
                saveControlUI.style.textAlign = 'center';
                saveControlUI.title = 'Select to delete the shape';
                controlDiv.appendChild(saveControlUI);
        
                // Set CSS for the control interior.
                var controlTextSave = document.createElement('div');
                controlTextSave.style.color = 'rgb(25,25,25)';
                controlTextSave.style.fontFamily = 'Roboto,Arial,sans-serif';
                controlTextSave.style.fontSize = '16px';
                controlTextSave.style.lineHeight = '38px';
                controlTextSave.style.paddingLeft = '5px';
                controlTextSave.style.paddingRight = '5px';
                controlTextSave.innerHTML = 'Save Selected Area';
                saveControlUI.appendChild(controlTextSave);
        
                saveControlUI.addEventListener('click', function () {
                  saveSelectedBoundary();
                });
              }
        
              drawingManager.setMap(map);
        
        
        
        
              var getPolygonCoords = function (newShape) {
        
                coordinates.splice(0, coordinates.length)
        
                var len = newShape.getPath().getLength();
        
                for (var i = 0; i < len; i++) {
                  coordinates.push(newShape.getPath().getAt(i).toUrlValue(6))
                }
        
              }
        
              google.maps.event.addListener(drawingManager, 'polygoncomplete', function (event) {
        
                event.getPath().getLength();
                google.maps.event.addListener(event, "dragend", getPolygonCoords(event));
        
                google.maps.event.addListener(event.getPath(), 'insert_at', function () {
                  getPolygonCoords(event)
        
                  // On expand polygon
                  var area = google.maps.geometry.spherical.computeArea(event.getPath());
                  var newArea = Math.round(area * 1) / 4046.86;
                  document.getElementById("area").innerHTML = "Area =" + newArea.toFixed(2);
        
                });
        
                google.maps.event.addListener(event.getPath(), 'set_at', function () {
                  getPolygonCoords(event)
        
                  // On expand polygon
                  var area = google.maps.geometry.spherical.computeArea(event.getPath());
                  var newArea = Math.round(area * 1) / 4046.86;
                  document.getElementById("area").innerHTML = "Area =" + newArea.toFixed(2);
        
                })
                var element = document.getElementById("drawonmap");
                element.classList.remove("active");
        
              })
        
              google.maps.event.addListener(drawingManager, "drawingmode_changed", function () {
                if (coordinates?.length > 0) {
                  AddPolygon.setOptions({
                    editable: false,
                  });
                  selectedShape.setEditable(false);
                  console.log("drawing mode changed:" + drawingManager.getDrawingMode());
                }
              })
              google.maps.event.addDomListener(map, 'click', function () {
                AddPolygon.setOptions({
                  editable: false,
                });
              });
        
        
        
              google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
        
                all_overlays.push(event);
                if (event.type !== google.maps.drawing.OverlayType.MARKER) {
                  drawingManager.setDrawingMode(null);
        
                  var newShape = event.overlay;
                  newShape.type = event.type;
                  google.maps.event.addListener(newShape, 'click', function () {
        
                    setSelection(newShape);
                  });
                  var area = google.maps.geometry.spherical.computeArea(newShape.getPath());
                  var newArea = Math.round(area * 1) / 4046.86;
                  document.getElementById("area").innerHTML = "Area =" + newArea.toFixed(2);
                  setSelection(newShape);
                }
              })
              document.querySelector(".closeButton").onclick = function () {
                window.ReactNativeWebView.postMessage(
                  JSON.stringify({ action: "go-back" })
                );
              };
        
              var centerControlDiv = document.createElement('div');
              var centerControl = new CenterControl(centerControlDiv, map);
        
        
              centerControlDiv.index = 1;
              map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);
        
              document.getElementById("drawonmap").onclick = function () {
                var element = document.getElementById("drawonmap");
                if(element.classList.contains('active')){
                  element.classList.remove("active");
                  drawingManager.setDrawingMode(null);
                }else{
                  element.classList.add("active");
                  drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
                }
                
              };
              document.getElementById("deletePolygon").onclick = function () {
                deleteSelectedShape();
              };
              // Move to live Location
              document.getElementById("LiveIcon").onclick = function () {
                    map.setZoom(zoomLevel ? zoomLevel : 22);
                    map.setCenter(new google.maps.LatLng({lat:${currentLocation?.lat},lng:${currentLocation?.lng}}));
              };
        
              // Map Search Functionality
        
              // Create the search box and link it to the UI element.
              const input = document.getElementById("pac-input");
              const searchBox = new google.maps.places.SearchBox(input);
        
              map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
              // Bias the SearchBox results towards current map's viewport.
              map.addListener("bounds_changed", () => {
        
                searchBox.setBounds(map.getBounds());
              });
        
              let markers = [];
        
              searchBox.addListener("places_changed", () => {
                const places = searchBox.getPlaces();
        
                if (places.length == 0) {
                  return;
                }
        
                // Clear out the old markers.
                markers.forEach((marker) => {
                  marker.setMap(null);
                });
                markers = [];
        
                // For each place, get the icon, name and location.
        
        
                places.forEach((place) => {
                  if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                  }
        
                  const icon = {
                    // url: place.icon,
                    url: 'https://justpaste.in/fls/74g.png',
                    // size: new google.maps.Size(71, 71),
                    // origin: new google.maps.Point(0, 0),
                    // anchor: new google.maps.Point(17, 34),
                    // scaledSize: new google.maps.Size(25, 25),
                  };
        
                  // Create a marker for each place.
                  markers.push(
                    new google.maps.Marker({
                      map,
                      icon,
                      title: place.name,
                      position: place.geometry.location,
                      // onclick:alert()
                    }),
                  );
                  if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    // bounds.union(place.geometry.viewport);
                    bounds.extend(place.geometry.location);
                  } else {
                    bounds.extend(place.geometry.location);
                  }
        
                  // Move to search location after click on a address
                
                  // map.fitBounds(bounds);
                  var latitude = place.geometry.location.lat();
                  var longitude = place.geometry.location.lng();  
                  map.setCenter(new google.maps.LatLng(latitude, longitude));
                  // map.setZoom(zoomLevel ? zoomLevel : 22);
                });
        
              });
            }
        
            window.initMap = InitMap
        
        
          </script>
          <style>
            #map {
              height: 100%;
            }
        
            html,
            body {
              height: 100%;
              margin: 0;
              padding: 0;
            }
        
            button[title="Stop drawing"],
            button[title="Toggle fullscreen view"] {
              display: none !important;
            }
        
            svg {
              width: 25;
              /* background: #fff; */
              height: 25;
            }
        
            .custom-icons {
              position: absolute;
              right: 0;
              top: 0;
              z-index: 99999999;
              /* background: #ffff; */
              justify-content: center;
            }
        
            button[title="Draw a shape"] div {
              content: url('polygon.svg') !important;
              height: 25 !important;
              width: 25 !important;
              cursor: pointer;
            }
        
            #LiveIcon {
              border: none;
              display: block;
        
            }
        
            button.drawonmap.active {
              background: green;
              border: none;
            }
        
            .drawonmap,
            #LiveIcon {
              border: none;
              display: block;
            }
        
            button#deletePolygon {
              margin-top: 20;
              border: none;
              margin-bottom: 20;
            }
        
            div#area {
              position: absolute;
              bottom: 80;
              z-index: 99999;
              background: #fff;
              padding: 10px;
              left: 47%;
            }
            
            div[style="position: absolute; left: 0px; top: 0px; z-index: 1;"] div:first-child, div[style="position: absolute; left: 0px; top: 0px; z-index: 0;"] div:first-child , div[style="position: absolute; left: 0px; top: 0px; z-index: -1;"] div:first-child {
            // height: 15px !important;
            // width: 15px !important;
            // border-radius: 10px !important;
        }
        div[style="position: absolute; left: 0px; top: 0px; z-index: -1;"] div div, div[style="position: absolute; left: 0px; top: 0px; z-index: -1;"] div div {
        
            // left: -3px !important;
            // top: -3px !important;
        }
        div[style="position: absolute; left: 0px; top: 0px; z-index: 0;"] div div[style="position: absolute; left: 0px; top: 0px; width: 9px; height: 9px; border-width: 1px; border-style: solid; border-radius: 6px; opacity: 0.5; background-color: white; border-color: red;"] {
            // top: -3px !important;
            // left: -3px !important;
        }
        div[style="position: absolute; left: 0px; top: 0px; z-index: 0;"] div div[style="position: absolute; left: 0px; top: 0px; width: 9px; height: 9px; border-width: 1px; border-style: solid; border-radius: 6px; opacity: 0.5; border-color: red; background-color: white;"] {
            top: -3px !important;
            left: -3px !important;
        }
        div[style="position: absolute; left: 0px; top: 0px; z-index: 0;"] div div[style="position: absolute; left: 0px; top: 0px; width: 9px; height: 9px; border-width: 1px; border-style: solid; border-radius: 6px; background-color: white; border-color: rgb(255, 0, 0);"], div[style="position: absolute; left: 0px; top: 0px; z-index: 1;"] div div[style="position: absolute; left: 0px; top: 0px; width: 9px; height: 9px; border-width: 1px; border-style: solid; border-radius: 6px; background-color: white; border-color: red;"] {
            top: -3px !important;
            left: -3px !important;
        }
            input#pac-input {
              width: 80%;
              height: 28;
              padding-left: 10px;
              left: 0 !important;
              right: 0;
              margin: auto;
            }
            .gmnoprint.gm-style-mtc-bbw {
              display: none;
          } 
            .closeMain {
              position: absolute;
              left: 0;
              top: 0;
              z-index: 99999999;
              justify-content: center;
            }

            .closeButton {
              border: none;
              display: block;
            }
          </style>
        </body>
        
        </html>`}}
/>


      {/* {Object.keys(position).length > 0 &&
      <MapView
        onPress={handleMapPress}
        initialRegion={position}
        style={{ height: "100%" }}
        zoomEnabled={true}
        scrollEnabled={false}
        userLocationPriority='high'
        mapType='satellite'
        maxZoomLevel={17}
      >
        <Marker
          draggable
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
            // onDragEnd={(e) => {console.log('dragEnd', e.nativeEvent.coordinate)}}
          />
        {polygonCoordinates?.map((position)=>{
          return(<Marker
            draggable
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
            onDragEnd={e => {
              console.log('dragEnd', e.nativeEvent.coordinate);
              setPolygonCoordinates([...polygonCoordinates, e.nativeEvent.coordinate]);
              // setPin(e.nativeEvent.coordinate);
            }} 
          />)
        })
        }
        {polygonCoordinates?.length > 0 &&
        <>
          <Polygon
            coordinates={polygonCoordinates}
            holes={[polygonHoles]}
            strokeColor="rgba(0, 0, 200, 0.8)"
            strokeWidth={5}
            fillColor="rgba(0, 200, 0, 0.5)"
            onDragEnd={(e) => {
              // Update the coordinates when the polygon is dragged
              const newCoordinates = e.nativeEvent.coordinate;
              handlePolygonChange(newCoordinates);
            }}
            
          />
        
    
        </>
        }
      </MapView>
    } */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24, 
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default DrawOnMap;
