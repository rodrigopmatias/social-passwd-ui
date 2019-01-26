import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { AlphabetService } from '../alphabet.service';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.css']
})
export class AlphabetComponent implements OnInit {

  constructor(private app: AppService, public alphabets: AlphabetService) { }

  ngOnInit() {
    this.app.title = 'Alfabeto para Chave';
    this.alphabets.getAll();
  }

  destroy(uuid: string) {
    fetch(`/api/accounts/${this.app.accountId}/alphabets/${uuid}`, {method: 'DELETE'})
      .then(res => res.status)
      .then(status => {
        if(status === 204)
          return this.alphabets.getAll()
      })
      .catch(error => console.log(error));
  }

}
