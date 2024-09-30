import { book } from './../../core/interfaces/book.interface';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '../../core/services/books.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { getSpecificUrl } from '../../shared/Models/cover-url';
import { ApiLinksService } from '../../shared/services/api-links.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SafeUrlPipe } from "../../shared/pipes/safe-url.pipe";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, SafeUrlPipe, LoaderComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', "../.././shared/styles/general.scss"]
})
export class HomeComponent implements OnInit  , AfterViewInit, OnDestroy{

  books: book[] = []
  paginationSize: number = 9;
  paginationCurrentPage: number = 1;
  coverUrl: string = "";
  loaderView:boolean=true;
  subscriptions:Subscription[]=[]

  
  constructor(private booksServ: BooksService, private apiLinksServ: ApiLinksService, private sanitizer: DomSanitizer) {
    this.coverUrl = this.apiLinksServ.API.domain;
  }

  ngOnInit(): void {
    this.subscriptions.push(this.booksServ.getBooks().subscribe((res: any) => {
      this.books = res.reading_log_entries;
    }))
  }

  ngAfterViewInit(): void {
      this.loaderView = false;
  }

  BookCoverUrl(value: number) {
    return getSpecificUrl('b/id', value.toString(), 'L');
  }

  Key(value:string){
    return this.apiLinksServ.getKey(value)
  }

  ngOnDestroy(): void {
    for (const item of this.subscriptions) {
      item.unsubscribe()
    }
  }
}
