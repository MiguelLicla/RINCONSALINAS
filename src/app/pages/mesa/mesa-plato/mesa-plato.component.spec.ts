import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaPlatoComponent } from './mesa-plato.component';

describe('MesaPlatoComponent', () => {
  let component: MesaPlatoComponent;
  let fixture: ComponentFixture<MesaPlatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesaPlatoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesaPlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
