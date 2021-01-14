import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { IonItemSliding } from "@ionic/angular";

import { PlacesService } from "../places.service";
import { Place } from "../place.model";

@Component({
  selector: "app-offers",
  templateUrl: "./offers.page.html",
  styleUrls: ["./offers.page.scss"],
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];
  private placesSubcription: Subscription;

  constructor(private placesService: PlacesService, private router: Router) {}

  ngOnInit() {
    this.placesSubcription = this.placesService.places.subscribe((places) => {
      this.offers = places;
    });
    console.log("offer page console", this.offers);
  }

  ngOnDestroy() {
    if (this.placesSubcription) {
      this.placesSubcription.unsubscribe();
    }
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    console.log(offerId);
    slidingItem.close();
    this.router.navigate(["/", "places", "tabs", "offers", "edit", offerId]);
  }
}
