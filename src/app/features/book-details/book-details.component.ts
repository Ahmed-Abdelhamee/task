import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BooksService } from '../../core/services/books.service';
import { getSpecificUrl } from '../../shared/Models/cover-url';
import { SafeUrlPipe } from '../../shared/pipes/safe-url.pipe';
import { CommonModule } from '@angular/common';
import { bookDetails } from '../../core/interfaces/book-details.interface';
import { ApiLinksService } from '../../shared/services/api-links.service';
import { AuthorService } from '../../core/services/author.service';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [SafeUrlPipe, CommonModule, RouterModule, LoaderComponent],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss', "../.././shared/styles/general.scss", "../.././shared/styles/item-details.scss"]
})
export class BookDetailsComponent implements OnInit, AfterContentInit, OnDestroy {

  coverUrl: string = "";
  id: string = "";
  authors: any[] = []
  bookDetails: bookDetails = {} as bookDetails;
  loaderView: boolean = true
  subscriptions:Subscription[]=[]

  constructor(private activatedRoute: ActivatedRoute, private booksServ: BooksService,
    private apiLinksServ: ApiLinksService, private authorServ: AuthorService) {
    this.id = activatedRoute.snapshot.paramMap.get("id")!
  }

  ngOnInit(): void {
    this.subscriptions.push(this.booksServ.getBookById(this.id).subscribe({
      next: (res) => {
        this.bookDetails = res;
      },
      complete: () => {
        this.Author(this.bookDetails.authors[0].author.key);
      }
    }))
  }
  ngAfterContentInit(): void {
    this.loaderView = false
  }
  BookCoverUrl(value: number) {
    return getSpecificUrl('b/id', value.toString(), 'L');
  }

  Key(value: string) {
    return this.apiLinksServ.getKey(value)
  }

  Author(key: string) {
    this.subscriptions.push(this.authorServ.getAuthor(key).subscribe({
      next: (res: any) => {
        this.authors.push(res.name);
      }, complete: () => {
        this.bookDetails.authors.splice(0, 1)
        if (this.bookDetails.authors) {
          this.Author(this.bookDetails.authors[0].author.key);
        }
      }
    }))
  }

  ngOnDestroy(): void {
    for (const item of this.subscriptions) {
      item.unsubscribe()
    }
  }
}
