import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-account',
  templateUrl: './access-account.component.html',
  styleUrls: ['./access-account.component.css']
})
export class AccessAccountComponent implements OnInit {

  constructor(
    private router: Router,
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

}
