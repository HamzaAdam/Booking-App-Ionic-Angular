import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from "@ionic/angular";

import { Subscription } from "rxjs";

import { AuthService } from "src/app/auth/auth.service";
import { BookingService } from "src/app/bookings/booking.service";
import { CreateBookingComponent } from "src/app/bookings/create-booking/create-booking.component";
import { Place } from "../../place.model";
import { PlacesService } from "../../places.service";

@Component({
  selector: "app-place-detail",
  templateUrl: "./place-detail.page.html",
  styleUrls: ["./place-detail.page.scss"],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  loadingSpinner = true;
  isBookable = false;
  private placesSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placeService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadingSpinner = true;
    console.log("place detail page");
    this.route.paramMap.subscribe((param) => {
      if (!param.has("placeId")) {
        this.navCtrl.navigateBack("/places/tabs/discover");
        return;
      }
      this.placesSubscription = this.placeService
        .getplace(param.get("placeId"))
        .subscribe(
          (place) => {
            this.place = place;
            this.isBookable = place.userId === this.authService.userId;
            this.loadingSpinner = false;
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
                      this.router.navigate(["/places/tabs/discover"]);
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
    if (this.placesSubscription) {
      this.placesSubscription.unsubscribe();
    }
  }

  // this.router.navigate(["places", "tabs", "discover"]);
  //this.navCtrl.navigateBack(["places", "tabs", "discover"]);
  // this.navCtrl.pop();
  onPlaceBook() {
    this.actionSheetCtrl
      .create({
        header: "Choose an action",
        buttons: [
          {
            text: "select",
            handler: () => {
              this.onBookingModal("select");
            },
          },
          {
            text: "random",
            handler: () => {
              this.onBookingModal("random");
            },
          },
          {
            text: "Cancel",
            role: "destructive",
          },
        ],
      })
      .then((actionEl) => {
        actionEl.present();
      });
  }

  onBookingModal(mode: "select" | "random") {
    console.log(mode);
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.place, selectedMode: mode },
        id: "bookingForm",
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData) => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === "confirm") {
          this.loadingCtrl
            .create({
              message: "Adding booking....",
            })
            .then((loadingEl) => {
              loadingEl.present();
              const data = resultData.data.bookingData;
              this.bookingService
                .addBooking(
                  this.place.id,
                  this.place.title,
                  this.place.imageUrl,
                  data.firstName,
                  data.lastName,
                  data.guestNumber,
                  data.startDate,
                  data.endDate
                )
                .subscribe(() => {
                  loadingEl.dismiss();
                });
            });
        }
      });
  }
}
