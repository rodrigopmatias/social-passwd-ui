import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ComputedService } from '../computed.service';
import { WaitingService } from '../waiting.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private app: AppService,
    private waiting: WaitingService,
    public computedService: ComputedService)
  {
    this.waiting.stack.push(
      () => this.computedService.writing || this.computedService.loading
    )
  }

  ngOnInit() {
    this.app.title = 'Carteira de Serviços';
    this.computedService.getAll();
  }

}
