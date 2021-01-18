import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { IonItemSliding } from "@ionic/angular";

import { PlacesService } from "../places.service";
import { Place } from "../place.model";
// import { BookingService } from "src/app/bookings/booking.service";
// import { CreateBookingComponent } from "src/app/bookings/create-booking/create-booking.component";

@Component({
  selector: "app-offers",
  templateUrl: "./offers.page.html",
  styleUrls: ["./offers.page.scss"],
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];
  placeId: string;
  //place: Place;
  loadingSpinner = false;
  private placesSubcription: Subscription;

  constructor(
    private placesService: PlacesService,
    private router: Router // private actionSheetCtrl: ActionSheetController,
  ) // private bookingService: BookingService,
  // private modalCtrl: ModalController,
  // private loadingCtrl: LoadingController,
  // private route: ActivatedRoute
  {}

  ngOnInit() {
    this.placesSubcription = this.placesService.places.subscribe((places) => {
      this.offers = places;
    });
    console.log(this.offers);
  }

  ionViewWillEnter() {
    this.loadingSpinner = true;
    this.placesService.fetchPlaces().subscribe(() => {
      this.loadingSpinner = false;
      console.log(this.offers);
    });
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

//this function is total working but there is a tiny issue in the declaration
//we have to declare the create booking component in the module file but after
//there is an error that this component is child of two components.

// onPlaceBook(offerId: string, slidingItem: IonItemSliding) {
//   this.placesService.getplace(offerId).subscribe((place) => {
//     this.place = place;
//   });
//   this.actionSheetCtrl
//     .create({
//       header: "Choose an action",
//       buttons: [
//         {
//           text: "select",
//           handler: () => {
//             this.onBookingModal("select", offerId);
//             slidingItem.close();
//           },
//         },
//         {
//           text: "random",
//           handler: () => {
//             this.onBookingModal("random", offerId);
//             slidingItem.close();
//           },
//         },
//         {
//           text: "Cancel",
//           role: "destructive",
//         },
//       ],
//     })
//     .then((actionEl) => {
//       actionEl.present();
//     });
// }

// onBookingModal(mode: "select" | "random", offerId: string) {
//   console.log(mode);
//   console.log(this.place);
//   this.modalCtrl
//     .create({
//       component: CreateBookingComponent,
//       componentProps: { selectedPlace: this.place, selectedMode: mode },
//       id: "bookingForm",
//     })
//     .then((modalEl) => {
//       modalEl.present();
//       return modalEl.onDidDismiss();
//     })
//     .then((resultData) => {
//       console.log(resultData.data, resultData.role);
//       if (resultData.role === "confirm") {
//         this.loadingCtrl
//           .create({
//             message: "Adding booking....",
//           })
//           .then((loadingEl) => {
//             loadingEl.present();
//             const data = resultData.data.bookingData;
//             this.bookingService
//               .addBooking(
//                 this.place.id,
//                 this.place.title,
//                 this.place.imageUrl,
//                 data.firstName,
//                 data.lastName,
//                 data.guestNumber,
//                 data.startDate,
//                 data.endDate
//               )
//               .subscribe(() => {
//                 loadingEl.dismiss();
//               });
//           });
//       }
//     });
// }
