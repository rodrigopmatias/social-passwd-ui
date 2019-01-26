import { Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class ComputedService {
  public collection = [];
  public loading = false;
  public writing = false;

  constructor(private app: AppService) { }

  getAll() {
    fetch(`/api/accounts/${this.app.accountId}/services`)
      .then(res => res.json())
      .then(data => {
        this.collection = data;
        return data;
      })
  }

  create(data) {
    this.writing = true;

    return fetch(
      `/api/accounts/${this.app.accountId}/services`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(res => {
        this.writing = false;
        return res;
      })
      .catch(res => {
        this.writing = false;
        return res;
      });
  }

  update(uuid, data) {
    this.writing = true;

    return fetch(
      `/api/accounts/${this.app.accountId}/services/${uuid}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(res => {
        this.writing = false;
        return res;
      })
      .catch(res => {
        this.writing = false;
        return res;
      });
  }

  destroy(uuid) {
    this.writing = true;

    return fetch(`/api/accounts/${this.app.accountId}/services/${uuid}`, {method: 'DELETE'})
      .then((res) => {
        this.writing = false;
        return res;
      })
      .catch(error => {
        this.writing = false;
        return error;
      });
  }
}
