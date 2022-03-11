import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionMainComponent } from './notificacion-main.component';

describe('NotificacionMainComponent', () => {
  let component: NotificacionMainComponent;
  let fixture: ComponentFixture<NotificacionMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificacionMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
