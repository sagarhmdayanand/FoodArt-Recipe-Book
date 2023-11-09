import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';
/*
cousre project contents
*/
//import {recipesModule } from './recipes/recipes.module';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { authComponent } from './auth/auth.component';
import { sharedModule } from './shared/shared.module';
import { coreModule } from './core.module';
import { authModule } from './auth/auth.module';
import { recipesModule } from './recipes/recipes.module';

/*
cousre project contents
*/


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    sharedModule,
    coreModule,
    recipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }