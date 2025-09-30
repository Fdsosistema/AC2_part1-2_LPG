import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OwnerDetailPage } from './owner-detail.page';

describe('OwnerDetailPage', () => {
  let component: OwnerDetailPage;
  let fixture: ComponentFixture<OwnerDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
