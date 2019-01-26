import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from '../app.service';
import { AlphabetService } from '../alphabet.service';
import { WaitingService } from '../waiting.service';

@Component({
  selector: 'app-alphabet-form',
  templateUrl: './alphabet-form.component.html',
  styleUrls: ['./alphabet-form.component.css']
})
export class AlphabetFormComponent implements OnInit {

  alphabetForm = new FormGroup({
    uuid: new FormControl(''),
    name: new FormControl(''),
    alphabet: new FormControl('')
  });

  constructor(
    private app: AppService,
    private alphabets: AlphabetService,
    private waiting: WaitingService,
    private router: Router,
    private route: ActivatedRoute)
  {
    this.waiting.stack.push(
      () => (this.alphabets.loading || this.alphabets.writing)
    );
  }

  ngOnInit() {
    this.app.title = 'Editando um alfaneto';

    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (uuid) {
      this.alphabets.get(uuid)
        .then(data => {
          const values = {};

          ['uuid', 'name', 'alphabet'].forEach(
            attr => {
              values[attr] = data[attr];
            }
          );

          this.alphabetForm.setValue(values);
        })
        .catch(error => console.log(error));
    }
  }

  save() {
    const data = {};

    ['name', 'alphabet'].forEach(
      (attr) => {
        data[attr] = this.alphabetForm.value[attr];
      }
    );

    if(this.alphabetForm.value.uuid === '') {
      this.alphabets.create(data)
        .then(res => {
          this.router.navigate(['alphabet']);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.alphabets.update(this.alphabetForm.value.uuid, data)
        .then(res => {
          this.router.navigate(['alphabet']);
        })
        .catch(error => {
          console.log(error);
        });
    }

    return false;
  }

  destroy(uuid) {
    this.alphabets.destroy(uuid)
      .then(res => {
        this.router.navigate(['alphabet']);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
