import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './core/auth/auth.module';
import { PagesModule } from './core/pages/pages.module';
import { NgxSpinnerModule } from 'ngx-spinner';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';

import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    HttpClientModule,

    AuthModule,
    PagesModule,

    SwiperModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
