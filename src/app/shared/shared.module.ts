import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MaterialModule } from './material.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthPermissionService } from './guards/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EssentialComponent } from './components/essential-component/essential.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [

    LayoutComponent,
       HeaderComponent,
       FooterComponent,
       LayoutComponent,
       ThemeSwitchComponent,
       EssentialComponent,
       LoadingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgOptimizedImage,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    NgOptimizedImage
  ],
  providers: [
    AuthPermissionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    },
  ]
})
export class SharedModule { }
