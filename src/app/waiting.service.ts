import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WaitingService {
  stack = [];

  constructor() { }

  get isWaiting() {
    return this.stack.some(fn => fn());
  }
}
