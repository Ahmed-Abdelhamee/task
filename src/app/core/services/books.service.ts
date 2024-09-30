import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { book } from '../interfaces/book.interface';
import { ApiLinksService } from '../../shared/services/api-links.service';
import { bookDetails } from '../interfaces/book-details.interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  env: string = "";

  constructor(private http: HttpClient, private apiLinksServ: ApiLinksService) {
    this.env = apiLinksServ.API.domain;
  }

  getBooks(): Observable<book[]> {
    return this.http.get<book[]>(`${this.env}/people/mekBot/books/want-to-read.json`)
  }

  getBookById(id:string): Observable<bookDetails>{
    return this.http.get<bookDetails>(`${this.env}/works/${id}.json`)
  }
}
