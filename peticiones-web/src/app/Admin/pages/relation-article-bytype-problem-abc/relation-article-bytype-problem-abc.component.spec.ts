import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationArticleBytypeProblemAbcComponent } from './relation-article-bytype-problem-abc.component';

describe('RelationArticleBytypeProblemAbcComponent', () => {
  let component: RelationArticleBytypeProblemAbcComponent;
  let fixture: ComponentFixture<RelationArticleBytypeProblemAbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelationArticleBytypeProblemAbcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationArticleBytypeProblemAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
