import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSubgroupMapperComponent } from './group-subgroup-mapper.component';

describe('GroupSubgroupMapperComponent', () => {
  let component: GroupSubgroupMapperComponent;
  let fixture: ComponentFixture<GroupSubgroupMapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSubgroupMapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSubgroupMapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
