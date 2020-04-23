import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Upload } from './upload.page';

describe('HomePage', () => {
  let component: Upload;
  let fixture: ComponentFixture<Upload>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Upload ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Upload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});