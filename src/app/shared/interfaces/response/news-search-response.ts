import {Article} from '../../../model/article';

export interface NewsSearchResponse {
  hits: Article[];
  page: number;
  nbPages: number;
  hitsPerPage: number;
}
