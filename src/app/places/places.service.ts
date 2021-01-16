import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { delay, map, take, tap } from "rxjs/operators";

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
      "xyz"
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
    return this.places.pipe(
      delay(1000),
      take(1),
      tap((places) => {
        this._place.next(places.concat(newPlace));
      })
    );
  }

  updatePlace(placeId: string, title: string, description: string) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        const updatedPlaceIndex = places.findIndex((p) => p.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];

        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this._place.next(updatedPlaces);
      })
    );
  }
}
