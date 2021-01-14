import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
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
  @ViewChild("f", { static: true }) form: NgForm;

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
    }
  }

  onPlaceBook() {
    this.modalCtrl.dismiss(
      // the form is the type of ngForm so we access the
      // values with the help of name attribute of input
      {
        bookingData: {
          firstName: this.form.value["first-name"],
          LastName: this.form.value["last-name"],
          guestNumber: this.form.value["guestNumber"],
          startDate: this.form.value["dateFrom"],
          endDate: this.form.value["dateTo"],
        },
      },
      "confirm",
      "bookingForm"
    );
    console.log(this.form.valid);
  }

  onCancel() {
    this.modalCtrl.dismiss(null, "cancel", "bookingForm");
  }

  datesValid() {
    const startDate = new Date(this.form.value["dateFrom"]);
    const endDate = new Date(this.form.value["dateTo"]);
    return endDate > startDate;
  }
}
