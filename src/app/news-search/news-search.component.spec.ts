import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSearchComponent } from './news-search.component';
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {NewsSearchRoutingModule} from "./news-search-routing.module";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {BrowserDynamicTestingModule} from "@angular/platform-browser-dynamic/testing";
import {NewsService} from "../shared/services/http/news/news.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('NewsSearchComponent', () => {
  let component: NewsSearchComponent;
  let fixture: ComponentFixture<NewsSearchComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ NewsSearchComponent ],
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
        BrowserDynamicTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should has valid html structure', () => {
    fixture.detectChanges();

    const nextButton: DebugElement = fixture.debugElement.query(By.css('.next-button'));
    const previousButton: DebugElement = fixture.debugElement.query(By.css('.previous-button'));
    expect(nextButton.nativeElement).not.toBeNull();
    expect(previousButton.nativeElement).not.toBeNull();
  });

  it('should disable button when loading data', () => {
    component.currentPageNum = 10;
    component.totalPageNum = 20;
    component.searchFormControl.patchValue('test data');
    component.loading = true;
    fixture.detectChanges();

    const nextButton: DebugElement = fixture.debugElement.query(By.css('.next-button'));
    const previousButton: DebugElement = fixture.debugElement.query(By.css('.previous-button'));
    expect(nextButton.attributes.disabled).toBeTruthy();
    expect(previousButton.attributes.disabled).toBeTruthy();

    component.loading = false;
    fixture.detectChanges();
    expect(nextButton.attributes.disabled).toBeFalsy();
    expect(previousButton.attributes.disabled).toBeFalsy();
  })
});
