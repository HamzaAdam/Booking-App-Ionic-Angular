import { Injectable } from "@angular/core";
import { Booking } from "./booking.model";

@Injectable({
  providedIn: "root",
})
export class BookingService {
  private _bookings: Booking[] = [
    {
      id: "xyz",
      placeId: "p1",
      userId: "abc",
      placeTitle: "Karachi Mega City",
      guestNumber: 50,
    },
  ];

  constructor() {}

  get bookings() {
    return [...this._bookings];
  }
}
