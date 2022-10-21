import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleAbcComponent } from './article-abc.component';

describe('ArticleAbcComponent', () => {
  let component: ArticleAbcComponent;
  let fixture: ComponentFixture<ArticleAbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleAbcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
