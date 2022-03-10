import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'span-error',
  templateUrl: './span-error.component.html',
  styleUrls: ['./span-error.component.css']
})
export class SpanErrorComponent implements OnInit {
  @Input() msgError: string;
  constructor() {
    this.msgError = 'Error'
  }

  ngOnInit(): void {
  }

}
