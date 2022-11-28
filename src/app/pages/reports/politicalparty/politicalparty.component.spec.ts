import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticalpartyComponent } from './politicalparty.component';

describe('PoliticalpartyComponent', () => {
  let component: PoliticalpartyComponent;
  let fixture: ComponentFixture<PoliticalpartyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticalpartyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticalpartyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
