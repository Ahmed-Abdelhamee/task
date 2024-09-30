import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from '../../core/services/author.service';
import { getSpecificUrl } from '../../shared/Models/cover-url';
import { ApiLinksService } from '../../shared/services/api-links.service';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from "../../shared/pipes/safe-url.pipe";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [LoaderComponent, CommonModule, SafeUrlPipe],
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss', "../.././shared/styles/general.scss", "../.././shared/styles/item-details.scss"]
})
export class AuthorDetailsComponent  implements OnInit, AfterContentInit, OnDestroy {

  coverUrl: string = "";
  id: string = "";
  author: any = {}
  worksNums: number = 0;
  works: any[] = []
  loaderView: boolean = true;
  subscriptions:Subscription[]=[]

  constructor(private activatedRoute: ActivatedRoute, private apiLinksServ: ApiLinksService, private authorServ: AuthorService) {
    this.id = activatedRoute.snapshot.paramMap.get("id")!
  }
  
  ngOnInit(): void {
    this.subscriptions.push(
      this.authorServ.getAuthorProfile(this.id).subscribe({
        next: (res) => {
          this.author = res;
        }
      })
    )
    this.subscriptions.push(
      this.authorServ.getAuthorWorks(this.id).subscribe({
        next: (res) => {
          this.worksNums=res.size
        }
      })
    )
    this.subscriptions.push(
      this.authorServ.getAuthorWorks(this.id,"?limit=5").subscribe({
        next: (res) => {
          this.works=res.entries
          console.log(res);
          
        }
      })
    )
  }
  ngAfterContentInit(): void {
    this.loaderView = false
  }

  imageUrl(value: string) {
    return getSpecificUrl('a/olid', value.toString(), 'S');
  }

  Key(value: string) {
    return this.apiLinksServ.getKey(value)
  }

  ngOnDestroy(): void {
    for (const item of this.subscriptions) {
      item.unsubscribe()
    }
  }

}
