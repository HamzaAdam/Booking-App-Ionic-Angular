import { Component, OnDestroy, OnInit } from "@angular/core";
import { IonItemSliding, LoadingController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Booking } from "./booking.model";
import { BookingService } from "./booking.service";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.page.html",
  styleUrls: ["./bookings.page.scss"],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedBookings: Booking[];
  private bookingSubscription: Subscription;

  constructor(
    private BookingService: BookingService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.bookingSubscription = this.BookingService.bookings.subscribe(
      (bookings) => {
        this.loadedBookings = bookings;
      }
    );
  }

  onCancelBooking(bookingId: string, itemSliding: IonItemSliding) {
    itemSliding.close();
    this.loadingCtrl
      .create({
        message: "deleting your booking...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.BookingService.cancelBooking(bookingId).subscribe(() => {
          loadingEl.dismiss();
        });
      });
    console.log(bookingId);
  }

  ngOnDestroy() {
    if (this.bookingSubscription) {
      this.bookingSubscription.unsubscribe();
    }
  }
}
