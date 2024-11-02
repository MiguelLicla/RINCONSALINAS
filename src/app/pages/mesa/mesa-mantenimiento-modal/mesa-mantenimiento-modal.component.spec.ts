import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaMantenimientoModalComponent } from './mesa-mantenimiento-modal.component';

describe('MesaMantenimientoModalComponent', () => {
  let component: MesaMantenimientoModalComponent;
  let fixture: ComponentFixture<MesaMantenimientoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesaMantenimientoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesaMantenimientoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
