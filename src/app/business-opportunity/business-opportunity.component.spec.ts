import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOpportunityComponent } from './business-opportunity.component';

describe('BusinessOpportunityComponent', () => {
  let component: BusinessOpportunityComponent;
  let fixture: ComponentFixture<BusinessOpportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessOpportunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
