import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { BehaviorSubject, of } from "rxjs";
import { delay, map, switchMap, take, tap } from "rxjs/operators";

import { AuthService } from "../auth/auth.service";
import { Place } from "./place.model";

// [
//   new Place(
//     "p1",
//     "Karachi Mega City",
//     "The city of lights",
//     "assets/images/karachi.jpg",
//     7000,
//     new Date(),
//     new Date("2022-01-01"),
//     "xyz"
//   ),
//   new Place(
//     "p2",
//     "Lahore Old City",
//     "An ancient city of kings",
//     "assets/images/lahore.jpg",
//     5000,
//     new Date(),
//     new Date("2022-01-01"),
//     "abc"
//   ),
//   new Place(
//     "p3",
//     "Islamabad Modern City",
//     "The capital of Pakistan",
//     "assets/images/islamabad.jpg",
//     6000,
//     new Date(),
//     new Date("2022-01-01"),
//     "abc"
//   ),
// ]

interface placeData {
  availableFrom: Date;
  availableTo: Date;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  private _place = new BehaviorSubject<Place[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) {}

  get places() {
    return this._place.asObservable();
  }

  // Before http implementation
  // getplace(id: string) {
  //   return this.places.pipe(
  //     take(1),
  //     map((place) => {
  //       return { ...place.find((p) => p.id === id) };
  //     })
  //   );
  // }

  getplace(id: string) {
    return this.http
      .get<placeData>(
        `https://ionic-angular-booking-app1-default-rtdb.firebaseio.com/offered-places/${id}.json`
      )
      .pipe(
        map((placeData) => {
          return new Place(
            id,
            placeData.title,
            placeData.description,
            placeData.imageUrl,
            placeData.price,
            new Date(placeData.availableFrom),
            new Date(placeData.availableTo),
            placeData.userId
          );
        })
      );
  }

  fetchPlaces() {
    return this.http
      .get<{ [key: string]: placeData }>(
        "https://ionic-angular-booking-app1-default-rtdb.firebaseio.com/offered-places.json"
      )
      .pipe(
        map((resData) => {
          let places = [];
          for (let key in resData) {
            if (resData.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  resData[key].title,
                  resData[key].description,
                  resData[key].imageUrl,
                  resData[key].price,
                  resData[key].availableFrom,
                  resData[key].availableTo,
                  resData[key].userId
                )
              );
            }
          }
          return places;
        }),
        tap((places) => {
          this._place.next(places);
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
    let generatedId;
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
    return this.http
      .post<{ name: string }>(
        "https://ionic-angular-booking-app1-default-rtdb.firebaseio.com/offered-places.json",
        { ...newPlace, id: null }
      )
      .pipe(
        switchMap((resData) => {
          console.log(resData);
          generatedId = resData.name;
          return this.places;
        }),
        take(1),
        tap((places) => {
          newPlace.id = generatedId;
          this._place.next(places.concat(newPlace));
        })
      );

    //before Implementation of http we are returning this
    // return this.places.pipe(
    //   delay(1000),
    //   take(1),
    //   tap((places) => {
    //     this._place.next(places.concat(newPlace));
    //   })
    // );
  }

  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap((places) => {
        if (!places || places.length <= 0) {
          return this.fetchPlaces();
        }
        // of is an RXJS operator it takes any value return us an observable of that value
        else {
          return of(places);
        }
      }),
      switchMap((places) => {
        const updatedPlaceIndex = places.findIndex((p) => p.id === placeId);
        updatedPlaces = [...places];
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
        return this.http.put(
          `https://ionic-angular-booking-app1-default-rtdb.firebaseio.com/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this._place.next(updatedPlaces);
      })
    );
  }

  //before http function look like this
  // updatePlace(placeId: string, title: string, description: string) {
  // return this.places.pipe(
  //   take(1),
  //   delay(1000),
  //   tap((places) => {
  //     const updatedPlaceIndex = places.findIndex((p) => p.id === placeId);
  //     const updatedPlaces = [...places];
  //     const oldPlace = updatedPlaces[updatedPlaceIndex];

  //     updatedPlaces[updatedPlaceIndex] = new Place(
  //       oldPlace.id,
  //       title,
  //       description,
  //       oldPlace.imageUrl,
  //       oldPlace.price,
  //       oldPlace.availableFrom,
  //       oldPlace.availableTo,
  //       oldPlace.userId
  //     );
  //     this._place.next(updatedPlaces);
  //   })
  // );
  //}
}
