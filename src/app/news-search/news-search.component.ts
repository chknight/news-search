import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NewsService} from "../shared/services/http/news/news.service";
import {FormControl} from "@angular/forms";
import {Observable, Subject, Subscription} from "rxjs";
import {Article} from "../model/article";
import {catchError, debounceTime, filter, map, tap} from "rxjs/operators";

@Component({
  selector: 'app-news-search',
  templateUrl: './news-search.component.html',
  styleUrls: ['./news-search.component.scss']
})
export class NewsSearchComponent implements OnInit, OnDestroy {

  /**
   * Form control for search box
   */
  searchFormControl: FormControl;

  /**
   * Subject to handle the search
   */
  private searchTextProcessor: Subject<string> = new Subject();
  private searchSubscription: Subscription;

  /**
   * Current page number and total page number
   */
  totalPageNum: number;
  currentPageNum: number;

  /**
   * Fetched article data
   */
  articles$: Observable<Article[]>;

  /**
   * Status when data is loading
   */
  loading: boolean;

  /**
   * The interval time to debounce the search. In milliseconds.
   */
  @Input()
  debounceTime = 800;

  /**
   * Min lenght of text to be searched with
   */
  @Input()
  minLength = 3;

  constructor(
    readonly newsService: NewsService
  ) {
  }

  /**
   * @inheritDoc
   */
  ngOnInit() {
    this.searchFormControl = new FormControl();
    this.totalPageNum = 0;
    this.currentPageNum = 0;
    this.loading = false;

    this.searchSubscription = this.searchTextProcessor.pipe(
      // only do search when the input text is long enough or the text is clear
      filter(text => text.length >= this.minLength),
      debounceTime(this.debounceTime),
      catchError(error => {
        console.error('Error happens when user input in the search box');
        throw error;
      }),
    ).subscribe(
      (text) => {
        // Rest page index when type in
        this.currentPageNum = 0;
        this.fetchSearchResult(text);
      }
    );
  }

  /**
   * @inheritDoc
   */
  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  /**
   * Triggered when next button clicked
   */
  onNextClicked() {
    this.currentPageNum += 1;
    this.fetchSearchResult(this.searchFormControl.value);
  }

  /**
   * triggered when previous button clicked
   */
  onPreviousClicked() {
    this.currentPageNum -= 1;
    this.fetchSearchResult(this.searchFormControl.value);
  }

  /**
   * listen event when user type in for searching
   */
  onSearchInputChange($event) {
    this.searchTextProcessor.next($event.target.value);
  }

  /**
   * Invoke service to fetch with search query
   */
  fetchSearchResult(searchText: string) {
    this.loading = true;
    this.articles$ = this.newsService.searchStory(searchText, this.currentPageNum).pipe(
      tap(result => {
        this.totalPageNum = result.nbPages
      }),
      map(result => {
        return result.hits;
      }),
      tap(() => {
        this.loading = false
      }),
    );
  }
}
