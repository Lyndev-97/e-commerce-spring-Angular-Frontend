import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoDetail } from './produto-detail';

describe('ProdutoDetail', () => {
  let component: ProdutoDetail;
  let fixture: ComponentFixture<ProdutoDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdutoDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
