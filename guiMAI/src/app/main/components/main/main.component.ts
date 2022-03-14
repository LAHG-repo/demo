import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {

  actualizarPassword = false;
  constructor(
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.actualizarPassword = this.route.snapshot.data['esPasswordRecuperacion'];;
  }


}

