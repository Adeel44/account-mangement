import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLedgerComponent } from './add-ledger.component';

describe('AddLedgerComponent', () => {
  let component: AddLedgerComponent;
  let fixture: ComponentFixture<AddLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLedgerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
