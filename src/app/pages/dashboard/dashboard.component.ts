import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {Subject} from 'rxjs';
import {AuthService} from '../../@core/shared/services/auth.service';
import {Router} from '@angular/router';
import {DashboardService} from '../../services/dashboard.service';
import MarkerClusterer from "@google/markerclustererplus";
import { PersonPhysical } from 'src/app/models/person';
import { PersonPhysicalService } from 'src/app/services/person-physical.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit, AfterViewInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private id = this._authService.getUserId();

  private numberPerson: number = 0;
  private numberPersonVoteIsConquistado: number = 0;
  private numberPersonVoteIsAConquistar: number = 0;
  private numberPersonVoteIsPerdido: number = 0;

  private user: any;
  persons: PersonPhysical[];


  constructor(
      private _dashboardService: DashboardService,
      private _router: Router,
      private _authService: AuthService,
      private personPhysicalService: PersonPhysicalService
      
  ) { }

  ngOnInit() {
    this.countPerson();
    this.countPersonVoteConquistado();
    this.countPersonVoteAConquistar();
    this.countPersonVotePerdido();
    this.user = this._authService.getUserName();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public Request Prams
  // -----------------------------------------------------------------------------------------------------

  getRequestParams(): any {
    const params = {};
    params['id'] = this.id;
    return params;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  countPerson(): any {
    const params = this.getRequestParams();
    return this._dashboardService.countUserPerson(params)
        .subscribe((value) => {
          this.numberPerson = value;
        });
  }

  countPersonVoteConquistado(): any {
    const params = this.getRequestParams();
    return this._dashboardService.countUserPersonVoteIsConquistado(params)
        .subscribe((value) => {
          this.numberPersonVoteIsConquistado = value;
        });
  }

  countPersonVoteAConquistar(): any {
    const params = this.getRequestParams();
    return this._dashboardService.countUserPersonVoteIsAConquistar(params)
        .subscribe((value) => {
          this.numberPersonVoteIsAConquistar = value;
        });
  }

  countPersonVotePerdido(): any {
    const params = this.getRequestParams();
    return this._dashboardService.countUserPersonVoteIsPerdido(params)
        .subscribe((value) => {
          this.numberPersonVoteIsPerdido = value;
        });
  }

  ///////////////////////// MAPS
  @ViewChild('map', {static: false}) mapElement: ElementRef;
  map: google.maps.Map;
  center = new google.maps.LatLng(-1.373118, -48.3056779);
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
    {lat: -1.4036915, lng: -48.45198},
    {lat: -1.402387, lng: -48.453199}
    
  ]
ngAfterViewInit(){
  this.mapInit();
}
mapInit(){
  this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
// this.marker = new google.maps.Marker({position: this.center, map:this.map})
  this.infoWindow = new google.maps.InfoWindow();

  this.personPhysicalService.list()
  .subscribe(
      persons => {
        this.persons = persons;
        for (let i of this.persons){
          console.log(i.address)
          const tempMarker = new google.maps.Marker({position: new google.maps.LatLng(Number(i.address?.lat), Number(i.address?.lng)), map: this.map});
          tempMarker.addListener('click',((tempMarker, map, infoWindow) => {
          return () => {
          infoWindow.setContent('<p><b>Nome</b> : ' + i.name + '</p><p><b>Status</b> : ' + i.vote +'</p>');
          infoWindow.open(map, tempMarker);
          }
          })(tempMarker, this.map, this.infoWindow));
       this.mapMarkers.push(tempMarker);
      }
      this.markerCluster = new MarkerClusterer(this.map,this.mapMarkers,{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'})
      
      }
  );

  }

}