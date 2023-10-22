import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-link',
  templateUrl: './auth-link.component.html',
  styleUrls: ['./auth-link.component.scss'],
})
export class AuthLinkComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit() {}

  navigation(link: string) {
    this._router.navigate([link]);
  }
}
