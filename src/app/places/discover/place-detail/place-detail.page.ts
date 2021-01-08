import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NavController } from "@ionic/angular";
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
    private placeService: PlacesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      this.place = this.placeService.getplace(param.get("placeId"));
    });
  }

  onPlaceBook() {
    // this.router.navigate(["places", "tabs", "discover"]);
    this.navCtrl.navigateBack(["places", "tabs", "discover"]);
    // this.navCtrl.pop();
  }
}
