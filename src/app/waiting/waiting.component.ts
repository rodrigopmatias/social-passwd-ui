import { Component, OnInit } from '@angular/core';
import { WaitingService } from '../waiting.service';

@Component({
  selector: 'app-waiting',
  templateUrl: './waiting.component.html',
  styleUrls: ['./waiting.component.css']
})
export class WaitingComponent implements OnInit {

  constructor(public control: WaitingService) { }

  ngOnInit() {
  }

}
