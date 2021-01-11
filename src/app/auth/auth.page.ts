import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  constructor(private authSer: AuthService, private router: Router) {}

  ngOnInit() {}

  onLogin() {
    this.authSer.login();
    this.router.navigateByUrl("/places/tabs/discover");
    console.log(this.authSer.isUserAuthenticated);
  }
}
