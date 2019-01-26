import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ComputedService } from '../computed.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private app: AppService, public computedService: ComputedService) { }

  ngOnInit() {
    this.app.title = 'Carteira de Serviços';
    this.computedService.getAll();
  }

}
