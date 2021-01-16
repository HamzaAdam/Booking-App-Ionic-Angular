import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingController, NavController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Place } from "../../place.model";
import { PlacesService } from "../../places.service";

@Component({
  selector: "app-edit-offer",
  templateUrl: "./edit-offer.page.html",
  styleUrls: ["./edit-offer.page.scss"],
})
export class EditOfferPage implements OnInit, OnDestroy {
  place: Place;
  form: FormGroup;
  private placesSubscription: Subscription;

  constructor(
    private placeService: PlacesService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      if (!param.has("placeId")) {
        this.navCtrl.navigateBack("/places/tabs/offers");
        return;
      }
      this.placesSubscription = this.placeService
        .getplace(param.get("placeId"))
        .subscribe((place) => {
          this.place = place;
          this.form = new FormGroup({
            // this.place.title is the starting value of the input field
            title: new FormControl(this.place.title, {
              updateOn: "blur",
              validators: [Validators.required],
            }),
            description: new FormControl(this.place.description, {
              validators: [Validators.required, Validators.maxLength(150)],
            }),
          });
        });
    });
  }

  ngOnDestroy() {
    if (this.placesSubscription) {
      this.placesSubscription.unsubscribe();
    }
  }

  onUpdateOffer() {
    if (!this.form.valid) {
      return;
    }

    console.log("edit offer page onUpdateOffer() ", this.form);
    this.loadingCtrl
      .create({
        message: "updating offer...",
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.placeService
          .updatePlace(
            this.place.id,
            this.form.value.title,
            this.form.value.description
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.router.navigate(["/", "places", "tabs", "offers"]);
          });
      });
  }
}
