import { Injectable } from "@angular/core";
import { Place } from "./place.model";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  private _place: Place[] = [
    new Place(
      "p1",
      "Karachi Mega City",
      "The city of lights",
      "assets/images/karachi.jpg",
      7000
    ),
    new Place(
      "p2",
      "Lahore Old City",
      "An ancient city of kings",
      "assets/images/lahore.jpg",
      5000
    ),
    new Place(
      "p3",
      "Islamabad Modern City",
      "The capital of Pakistan",
      "assets/images/islamabad.jpg",
      6000
    ),
  ];

  get places() {
    return [...this._place];
  }

  getplace(id: string) {
    return { ...this._place.find((p) => p.id === id) };
  }

  constructor() {}
}
