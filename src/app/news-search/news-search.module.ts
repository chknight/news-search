import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsSearchRoutingModule } from './news-search-routing.module';
import {NewsSearchComponent} from './news-search.component';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    NewsSearchComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    NewsSearchRoutingModule,
    MatGridListModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
  ]
})
export class NewsSearchModule { }
