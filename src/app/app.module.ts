import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { SetListComponent } from './sets/set-list.component';
import { SetDetailComponent } from './sets/set-detail.component';
import { HomeComponent } from './home/home.component';
import { LightboxComponent } from './shared/lightbox/lightbox.component';
import { ImportComponent } from './rebrickable/import/import.component';
import { PartGroupMapperComponent } from './parts/admin/part-group-mapper.component';
import { GroupSubgroupMapperComponent } from './parts/admin/group-subgroup-mapper.component';
import { SubgroupComponent } from './parts/admin/subgroup.component';


@NgModule({
  declarations: [
    AppComponent,
    SetListComponent,
    SetDetailComponent,
    HomeComponent,
    LightboxComponent,
    ImportComponent,
    PartGroupMapperComponent,
    GroupSubgroupMapperComponent,
    SubgroupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxSpinnerModule,
    RouterModule.forRoot([
      {path: 'admin/partmapper', component: PartGroupMapperComponent},
      {path: 'admin/groupmapper', component: GroupSubgroupMapperComponent},
      {path: 'import', component: ImportComponent},
      {path: 'sets', component: SetListComponent},
      {path: 'sets/:setNumber', component: SetDetailComponent},
      {path: 'home', component: HomeComponent},
      {path: 'subgroup', component: SubgroupComponent},
      {path: '', redirectTo:'home', pathMatch: 'full'},
      {path: '**', redirectTo:'home', pathMatch: 'full'}    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    LightboxComponent
  ]
})
export class AppModule { }
