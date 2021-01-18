import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, NavController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Place } from "../../place.model";
import { PlacesService } from "../../places.service";

@Component({
  selector: "app-offer-bookings",
  templateUrl: "./offer-bookings.page.html",
  styleUrls: ["./offer-bookings.page.scss"],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  place: Place;
  placeId: string;
  private placesSubcription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      if (!param.has("placeId")) {
        this.navCtrl.navigateBack(["/", "places", "tabs", "offers"]);
        return;
      }
      this.placeId = param.get("placeId");
      this.placesSubcription = this.placesService
        .getplace(param.get("placeId"))
        .subscribe(
          (place) => {
            this.place = place;
          },
          (error) => {
            this.alertCtrl
              .create({
                header: "An error occurred",
                message: "please come back later",
                buttons: [
                  {
                    text: "okay",
                    handler: () => {
                      this.router.navigate(["/places/tabs/offers"]);
                    },
                  },
                ],
              })
              .then((alertEl) => {
                alertEl.present();
              });
          }
        );
    });
  }

  ngOnDestroy() {
    if (this.placesSubcription) {
      this.placesSubcription.unsubscribe();
    }
  }
}
