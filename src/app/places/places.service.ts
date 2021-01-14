import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map, take } from "rxjs/operators";

import { AuthService } from "../auth/auth.service";
import { Place } from "./place.model";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  private _place = new BehaviorSubject<Place[]>([
    new Place(
      "p1",
      "Karachi Mega City",
      "The city of lights",
      "assets/images/karachi.jpg",
      7000,
      new Date(),
      new Date("2022-01-01"),
      "abc"
    ),
    new Place(
      "p2",
      "Lahore Old City",
      "An ancient city of kings",
      "assets/images/lahore.jpg",
      5000,
      new Date(),
      new Date("2022-01-01"),
      "abc"
    ),
    new Place(
      "p3",
      "Islamabad Modern City",
      "The capital of Pakistan",
      "assets/images/islamabad.jpg",
      6000,
      new Date(),
      new Date("2022-01-01"),
      "abc"
    ),
  ]);

  constructor(private authService: AuthService) {}

  get places() {
    return this._place.asObservable();
  }

  getplace(id: string) {
    return this.places.pipe(
      take(1),
      map((place) => {
        return { ...place.find((p) => p.id === id) };
      })
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      "assets/images/lahore.jpg",
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    this.places.pipe(take(1)).subscribe((places) => {
      this._place.next(places.concat(newPlace));
    });
  }
}
