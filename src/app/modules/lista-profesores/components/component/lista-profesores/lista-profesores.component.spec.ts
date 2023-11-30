import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProfesoresComponent } from './lista-profesores.component';

describe('ListaProfesoresComponent', () => {
  let component: ListaProfesoresComponent;
  let fixture: ComponentFixture<ListaProfesoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaProfesoresComponent]
    });
    fixture = TestBed.createComponent(ListaProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
