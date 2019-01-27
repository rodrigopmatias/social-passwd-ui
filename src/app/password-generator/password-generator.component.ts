import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from '../app.service';
import { ComputedService } from '../computed.service';
import { WaitingService } from '../waiting.service';

@Component({
  selector: 'app-password-generator',
  templateUrl: './password-generator.component.html',
  styleUrls: ['./password-generator.component.css']
})
export class PasswordGeneratorComponent implements OnInit {

  form = new FormGroup({
    masterKey: new FormControl('')
  });

  serviceId = '';
  generatedKey = '';
  service = {};

  constructor(
    private app: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private waiting: WaitingService,
    public services: ComputedService)
  {
    this.waiting.stack.push(
      () => this.services.loading
    );
  }

  ngOnInit() {
    this.app.title = 'Gerador de Chaves';

    this.serviceId = this.route.snapshot.paramMap.get('uuid');
    this.service = {};

    this.services.get(this.serviceId)
      .then(data => {
        this.service = data;
      })
      .catch(error => console.log(error));
  }

  keyGen() {
    fetch(
      `/api/accounts/${this.app.accountId}/services/${this.serviceId}/keygen`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({masterkey: this.form.value.masterKey})
      })
      .then(res => res.json())
      .then(data => {
        this.generatedKey = data.key;
      })
      .catch(error => console.log(error));

    return false;
  }

}
