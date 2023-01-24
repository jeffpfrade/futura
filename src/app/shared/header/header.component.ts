import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userLogged = this.authService.getUserLogged();
  isLogged = this.authService.isLogged();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

}
