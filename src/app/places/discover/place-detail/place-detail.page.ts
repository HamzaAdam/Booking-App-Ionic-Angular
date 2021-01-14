import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ActionSheetController,
  ModalController,
  NavController,
} from "@ionic/angular";
import { CreateBookingComponent } from "src/app/bookings/create-booking/create-booking.component";
import { Place } from "../../place.model";
import { PlacesService } from "../../places.service";

@Component({
  selector: "app-place-detail",
  templateUrl: "./place-detail.page.html",
  styleUrls: ["./place-detail.page.scss"],
})
export class PlaceDetailPage implements OnInit {
  place: Place;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placeService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      this.place = this.placeService.getplace(param.get("placeId"));
    });
  }

  onPlaceBook() {
    // this.router.navigate(["places", "tabs", "discover"]);
    //this.navCtrl.navigateBack(["places", "tabs", "discover"]);
    // this.navCtrl.pop();
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
        id: "placeBooking",
      })
      .then((modalEl) => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then((resultData) => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === "confirm") {
          console.log("BOOKED");
        }
      });
  }
}
