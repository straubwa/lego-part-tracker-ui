import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SetListComponent } from './sets/set-list.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    SetListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'sets', component: SetListComponent},
      {path: 'home', component: HomeComponent},
      {path: '', redirectTo:'home', pathMatch: 'full'},
      {path: '**', redirectTo:'home', pathMatch: 'full'}    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
