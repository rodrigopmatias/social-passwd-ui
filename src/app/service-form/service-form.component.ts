import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from '../app.service';
import { AlphabetService } from '../alphabet.service';
import { ComputedService } from '../computed.service';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})
export class ServiceFormComponent implements OnInit {

  serviceForm = new FormGroup({
    uuid: new FormControl(''),
    name: new FormControl(''),
    size: new FormControl(''),
    alphabetId: new FormControl('')
  });

  constructor(
    private app: AppService,
    private router: Router,
    private route: ActivatedRoute,
    public alphabets: AlphabetService,
    public services: ComputedService) { }

  ngOnInit() {
    const uuid = this.route.snapshot.paramMap.get('uuid');

    this.app.title = 'Editando Serviço';
    this.alphabets.getAll();

    if (uuid) {
      fetch(`/api/accounts/${this.app.accountId}/services/${uuid}`)
        .then(res => res.json())
        .then(data => {
          const values = {};

          ['uuid', 'name', 'alphabetId', 'size'].forEach(
            attr => {
              values[attr] = data[attr];
            }
          );

          this.serviceForm.setValue(values);
        })
        .catch(error => console.log(error));
    }
  }

  destroy(uuid: string) {
    this.services.destroy(uuid)
      .then(res => res.status)
      .then(status => {
        if(status === 204)
          this.router.navigate(['']);
      })
      .catch(error => console.log(error));
  }

  save() {
    const data = {};

    ['name', 'alphabetId', 'size'].forEach(
      (attr) => {
        data[attr] = this.serviceForm.value[attr];
      }
    );

    if(this.serviceForm.value.uuid === '') {
      this.services.create(data)
        .then(res => {
          this.router.navigate(['']);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.services.update(this.serviceForm.value.uuid, data)
        .then(res => {
          this.router.navigate(['']);
        })
        .catch(error => {
          console.log(error);
        });
    }

    return false;
  }

}
