import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleByBranchAbcComponent } from './article-by-branch-abc.component';

describe('ArticleByBranchAbcComponent', () => {
  let component: ArticleByBranchAbcComponent;
  let fixture: ComponentFixture<ArticleByBranchAbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleByBranchAbcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleByBranchAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
