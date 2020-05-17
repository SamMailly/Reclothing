import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomemessagePage } from './homemessage.page';

describe('HomemessagePage', () => {
  let component: HomemessagePage;
  let fixture: ComponentFixture<HomemessagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomemessagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomemessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
