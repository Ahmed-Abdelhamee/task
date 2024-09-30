import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiLinksService {

  API = {
    domain: "https://openlibrary.org",
    coverUrl: "https://covers.openlibrary.org/b/id/"
  };

  constructor() { }

  getKey(value: string) {
    return value.split("/")[value.split("/").length - 1]
  }
}
