import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Article} from '../../../../model/article';
import {Observable} from 'rxjs';

export interface NewsSearchResponse {
  hits: Article[],
  page: number,
  nbPages: number,
  hitsPerPage: number
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  /**
   * Api endpoint of hacker news
   */
  private readonly HACKER_NEWS_API: string = 'http://hn.algolia.com/api/v1';
  private readonly SEARCH_ENDPOINT: string = 'search';

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  searchStory(keyword: string, pageNum: number = 0): Observable<NewsSearchResponse> {
    return this.httpClient.get<NewsSearchResponse>(`${this.HACKER_NEWS_API}/${this.SEARCH_ENDPOINT}`, {
      params: {
        query: keyword,
        tags: 'story',
        page: pageNum.toString()
      }
    });
  }
}
