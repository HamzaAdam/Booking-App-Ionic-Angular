import { Component, OnInit } from "@angular/core";
import { IonItemSliding } from "@ionic/angular";
import { Booking } from "./booking.model";
import { BookingService } from "./booking.service";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.page.html",
  styleUrls: ["./bookings.page.scss"],
})
export class BookingsPage implements OnInit {
  loadedBookings: Booking[];

  constructor(private BookingService: BookingService) {}

  ngOnInit() {
    this.loadedBookings = this.BookingService.bookings;
  }

  onCancelBooking(bookingId: string, itemSliding: IonItemSliding) {
    itemSliding.close();
    console.log(bookingId);
  }
}
