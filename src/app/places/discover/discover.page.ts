import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { Place } from "../place.model";
import { PlacesService } from "../places.service";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.page.html",
  styleUrls: ["./discover.page.scss"],
})
export class DiscoverPage implements OnInit {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.loadedPlaces = this.placesService.places;
    this.listedLoadedPlaces = this.loadedPlaces.slice(1);
    console.log(this.loadedPlaces);
  }

  // ionViewWillEnter() {
  //   this.loadedPlaces = this.placesService.places;
  //   this.listedLoadedPlaces = this.loadedPlaces.slice(1);
  //   console.log("ion view of discover page");
  // }

  segmentChanged(event) {
    console.log(event.detail);
  }

  onOpenMenu() {
    this.menuCtrl.toggle("first");
  }
}
