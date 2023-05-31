import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MaterialModule } from './material.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthPermissionService } from './guards/auth.guard';

@NgModule({
  declarations: [

    LayoutComponent,
       HeaderComponent,
       FooterComponent,
       LayoutComponent,
       ThemeSwitchComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgOptimizedImage,
    HttpClientModule
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    NgOptimizedImage
  ],
  providers: [
    AuthPermissionService,
  ]
})
export class SharedModule { }
