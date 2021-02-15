import { Component, OnInit } from "@angular/core";
import {
  ActionSheetController,
  AlertController,
  ModalController,
} from "@ionic/angular";
import { Plugins, Capacitor } from "@capacitor/core";

import { MapModalComponent } from "../../map-modal/map-modal.component";

@Component({
  selector: "app-location-picker",
  templateUrl: "./location-picker.component.html",
  styleUrls: ["./location-picker.component.scss"],
})
export class LocationPickerComponent implements OnInit {
  constructor(
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  onPickLocation() {
    this.actionSheetCtrl
      .create({
        header: "Please choose",
        buttons: [
          {
            text: "Auto-Locate",
            handler: () => {
              this.locateUser();
            },
          },
          {
            text: "Pick on map",
            handler: () => {
              this.openMap();
            },
          },
          { text: "Cancel", role: "cancel" },
        ],
      })
      .then((actionEl) => {
        actionEl.present();
      });
  }

  private locateUser() {
    if (!Capacitor.isPluginAvailable("Geolocation")) {
      this.showError();
      return;
    }
    Plugins.Geolocation.getCurrentPosition()
      .then((geoPosition) => {
        const coordinates = {
          lat: geoPosition.coords.latitude,
          lng: geoPosition.coords.longitude,
        };
      })
      .catch((error) => {
        this.showError();
      });
  }

  private showError() {
    this.alertCtrl
      .create({
        header: "Something went wrong",
        message: "Please use the map to pick a location",
        buttons: [{ text: "Okay" }],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  private openMap() {
    this.modalCtrl.create({ component: MapModalComponent }).then((modalEl) => {
      modalEl.onDidDismiss().then((modalData) => {
        console.log(modalData);
      });
      modalEl.present();
    });
  }
}
