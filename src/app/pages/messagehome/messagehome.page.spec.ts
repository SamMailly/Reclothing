import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MessagehomePage } from './messagehome.page';

describe('MessagehomePage', () => {
  let component: MessagehomePage;
  let fixture: ComponentFixture<MessagehomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagehomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MessagehomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
