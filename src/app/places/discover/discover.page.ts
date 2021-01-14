import { Component, OnDestroy, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { Subscription } from "rxjs";

import { PlacesService } from "../places.service";
import { Place } from "../place.model";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.page.html",
  styleUrls: ["./discover.page.scss"],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  private placesSubscription: Subscription;

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.placesSubscription = this.placesService.places.subscribe((places) => {
      this.loadedPlaces = places;
      this.listedLoadedPlaces = this.loadedPlaces.slice(1);
    });
    console.log(this.loadedPlaces);
  }

  ngOnDestroy() {
    if (this.placesSubscription) {
      this.placesSubscription.unsubscribe();
    }
  }

  // ionViewWillEnter() {
  //   this.loadedPlaces = this.placesService.places;
  //   this.listedLoadedPlaces = this.loadedPlaces.slice(1);
  //   console.log("ion view of discover page");
  // }

  segmentChanged(event) {
    console.log("discover page console", event.detail);
  }

  onOpenMenu() {
    this.menuCtrl.toggle("first");
  }
}
