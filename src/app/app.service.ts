import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public title = 'Undefined';
  public accountId : string = null;

  constructor() {
    this.title = 'Undefined';

    this.accountId = localStorage.getItem('accountId');
    if(!this.accountId) {
      fetch('/api/accounts', {method: 'POST'})
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('accountId', data.uuid);
          this.accountId = data.uuid;
        })
        .catch(error => console.log(error));
    }
  }
}
