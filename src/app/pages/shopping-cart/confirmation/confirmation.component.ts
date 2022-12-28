import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  myDate = new Date();
  entrega = new Date().getUTCDate() + 2;
  pedido = Math.floor(Math.random() * (999999 - 100000)) + 100000;

  constructor() { }

  clearCart(){

  }

  ngOnInit(): void {
  }

}
