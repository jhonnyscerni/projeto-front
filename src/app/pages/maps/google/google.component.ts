import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import MarkerClusterer from "@google/markerclustererplus";

@Component({
  selector: "app-google",
  templateUrl: "./google.component.html"
})
export class GoogleComponent implements AfterViewInit {
  
  @ViewChild('map', {static: false}) mapElement: ElementRef;
  map: google.maps.Map;
  center = new google.maps.LatLng(-1.323118, -48.4056779);
  marker: google.maps.Marker;
  mapMarkers: any = [];
  markerCluster: any;
  mapOptions: google.maps.MapOptions = {
    styles:[{
      "featureType": "poi",
      "stylers": [{
        "visibility": "off"
      }]
    }],
    center: this.center,
    zoom: 12,
  };
  infoWindow: google.maps.InfoWindow;
  locations: any = [
    {lat: -1.323118, lng: -48.2056779, nm : "teste"},
    {lat: -1.323118, lng: -49.4056779, nm : "teste"},
    {lat: -1.323118, lng: -48.4057779, nm : "teste"},
    {lat: -1.323118, lng: -48.4056179, nm : "teste"},
    {lat: -1.323118, lng: -48.4056729, nm : "teste"},
    {lat: -1.323118, lng: -49.4056379, nm : "teste"},
    
  ]
ngAfterViewInit(){
  this.mapInit();
}
mapInit(){
  this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
// this.marker = new google.maps.Marker({position: this.center, map:this.map})
  this.infoWindow = new google.maps.InfoWindow();
  for (let i of this.locations){
    const tempMarker = new google.maps.Marker({position: i, map: this.map});
    tempMarker.addListener('click',((tempMarker, map, infoWindow) => {
    return () => {
    infoWindow.setContent('<p><b>teste</b> : ' + i.nm + '</p><p><b>Latitude</b> : ' + i.lat +'</p>');
    infoWindow.open(map, tempMarker);
    }
    })(tempMarker, this.map, this.infoWindow));
 this.mapMarkers.push(tempMarker);
}
this.markerCluster = new MarkerClusterer(this.map,this.mapMarkers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'})
}
  /////////////////////////////////////////////////////////////////////////////////////////// OBJECT
  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ]
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
