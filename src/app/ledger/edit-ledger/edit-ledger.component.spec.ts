import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLedgerComponent } from './edit-ledger.component';

describe('EditLedgerComponent', () => {
  let component: EditLedgerComponent;
  let fixture: ComponentFixture<EditLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLedgerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
