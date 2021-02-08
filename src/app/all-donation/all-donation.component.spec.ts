import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDonationComponent } from './all-donation.component';

describe('AllDonationComponent', () => {
  let component: AllDonationComponent;
  let fixture: ComponentFixture<AllDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDonationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
