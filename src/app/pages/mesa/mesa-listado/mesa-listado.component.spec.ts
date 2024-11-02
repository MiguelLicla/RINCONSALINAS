import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaListadoComponent } from './mesa-listado.component';

describe('MesaListadoComponent', () => {
  let component: MesaListadoComponent;
  let fixture: ComponentFixture<MesaListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesaListadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesaListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
