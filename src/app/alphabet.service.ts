import { Injectable } from '@angular/core';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class AlphabetService {
  collection = [];
  loading = false;
  writing = false;

  constructor(private app: AppService) { }

  getAll() {
    this.loading = true;

    return fetch(`/api/accounts/${this.app.accountId}/alphabets`)
      .then(res => res.json())
      .then(data => {
        this.collection = data;
        this.loading = false;
        return data;
      })
      .catch(error => {
        this.loading = false;
        return error;
      })
  }

  get(uuid) {
    this.loading = true;
    return fetch(`/api/accounts/${this.app.accountId}/alphabets/${uuid}`)
      .then(res => res.json())
      .then(data => {
        this.loading = false;
        return data;
      })
      .catch(error => {
        this.loading = false;
        return error;
      })
  }

  create(data) {
    this.writing = true;

    return fetch(
      `/api/accounts/${this.app.accountId}/alphabets`,
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
      `/api/accounts/${this.app.accountId}/alphabets/${uuid}`,
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

    return fetch(`/api/accounts/${this.app.accountId}/alphabets/${uuid}`, {method: 'DELETE'})
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
