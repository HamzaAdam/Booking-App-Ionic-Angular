import { Component, OnDestroy, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { SegmentChangeEventDetail } from "@ionic/core";
import { Subscription } from "rxjs";

import { PlacesService } from "../places.service";
import { Place } from "../place.model";
import { AuthService } from "src/app/auth/auth.service";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.page.html",
  styleUrls: ["./discover.page.scss"],
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[];
  relevantPlaces: Place[];
  loadingSpinner = false;
  private placesSubscription: Subscription;

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.placesSubscription = this.placesService.places.subscribe((places) => {
      this.loadedPlaces = places;
      this.relevantPlaces = this.loadedPlaces;
    });
    console.log("discover Page Console, loaded places =>", this.loadedPlaces);
  }

  ionViewWillEnter() {
    this.loadingSpinner = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.loadingSpinner = false;
    });
  }

  ngOnDestroy() {
    if (this.placesSubscription) {
      this.placesSubscription.unsubscribe();
    }
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log("discoverPage, segment change function ", event.detail);
    if (event.detail.value === "All") {
      this.relevantPlaces = this.loadedPlaces;
    } else {
      this.relevantPlaces = this.loadedPlaces.filter((places) => {
        return places.userId === this.authService.userId;
      });
    }
  }

  onOpenMenu() {
    this.menuCtrl.toggle("first");
  }
  // ionViewWillEnter() {
  //   this.loadedPlaces = this.placesService.places;
  //   this.listedLoadedPlaces = this.loadedPlaces.slice(1);
  //   console.log("ion view of discover page");
  // }

  //this is another method for filtering but there are some bugs
  // onFilterUpdate(filter) {
  //   this.relevantPlaces = this.loadedPlaces.filter(
  //     (place) => filter === "All" || place.userId !== this.authService.userId
  //   );
  //   this.filter = filter;
  // }
}
