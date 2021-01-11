import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Place } from "src/app/places/place.model";

@Component({
  selector: "app-create-booking",
  templateUrl: "./create-booking.component.html",
  styleUrls: ["./create-booking.component.scss"],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onPlaceBook() {
    this.modalCtrl.dismiss(
      { message: "The place is booked, A dummy message" },
      "confirm",
      "placeBooking"
    );
  }

  onCancel() {
    this.modalCtrl.dismiss(null, "cancel", "placeBooking");
  }
}
