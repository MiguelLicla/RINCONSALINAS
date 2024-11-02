import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaMantenimientoComponent } from './mesa-mantenimiento.component';

describe('MesaMantenimientoComponent', () => {
  let component: MesaMantenimientoComponent;
  let fixture: ComponentFixture<MesaMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesaMantenimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesaMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
