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
  @Input() selectedMode: "select" | "random";
  startDate: string;
  endDate: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);
    if (this.selectedMode === "random") {
      this.startDate = new Date(
        Math.floor(
          Math.random() *
            (availableTo.getTime() -
              7 * 24 * 60 * 60 * 1000 -
              availableFrom.getTime())
        ) + availableFrom.getTime()
      ).toISOString();
      this.endDate = new Date(
        Math.floor(
          Math.random() *
            (availableTo.getTime() - new Date(this.startDate).getTime()) +
            new Date(this.startDate).getTime()
        )
      ).toISOString();
      // new Date(
      //   Math.floor(
      //     Math.random() * (availableTo.getTime() - availableFrom.getTime()) +
      //       availableFrom.getTime() +
      //       new Date(this.startDate).getTime()
      //   )
      // ).toISOString();
    }
  }

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
