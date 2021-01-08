import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  constructor(private authSer: AuthService) {}

  ngOnInit() {}

  onLogin() {
    this.authSer.login();
    console.log(this.authSer.isUserAuthenticated);
  }
}
