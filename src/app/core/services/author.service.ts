import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiLinksService } from '../../shared/services/api-links.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  env: string = ""
  constructor(private http: HttpClient, private apiLinksServ: ApiLinksService) {
    this.env = apiLinksServ.API.domain;
  }

  getAuthor(key: string): Observable<any> {
    return this.http.get<any>(this.env + key + '.json')
  }

  getAuthorProfile(key: string): Observable<any> {
    return this.http.get<any>(this.env + '/authors/' + key + '.json')
  }

  getAuthorWorks(key: string, limit: any = null): Observable<any> {
    if (limit)
      return this.http.get<any>(this.env + '/authors/' + key + '/works' + '.json' + limit)
    else
      return this.http.get<any>(this.env + '/authors/' + key + '/works' + '.json')
  }
}
