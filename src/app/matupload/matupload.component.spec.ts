import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatuploadComponent } from './matupload.component';

describe('MatuploadComponent', () => {
  let component: MatuploadComponent;
  let fixture: ComponentFixture<MatuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
