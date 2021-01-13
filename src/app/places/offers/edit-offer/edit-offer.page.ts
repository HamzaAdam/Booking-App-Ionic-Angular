import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Place } from "../../place.model";
import { PlacesService } from "../../places.service";

@Component({
  selector: "app-edit-offer",
  templateUrl: "./edit-offer.page.html",
  styleUrls: ["./edit-offer.page.scss"],
})
export class EditOfferPage implements OnInit {
  place: Place;
  form: FormGroup;

  constructor(
    private placeService: PlacesService,
    private route: ActivatedRoute,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      if (!param.has("placeId")) {
        this.navCtrl.navigateBack("/places/tabs/offers");
        return;
      }
      this.place = this.placeService.getplace(param.get("placeId"));
      this.form = new FormGroup({
        title: new FormControl(this.place.title, {
          updateOn: "blur",
          validators: [Validators.required],
        }),
        description: new FormControl(this.place.description, {
          validators: [Validators.required, Validators.maxLength(150)],
        }),
      });
    });
  }

  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form);
  }
}
