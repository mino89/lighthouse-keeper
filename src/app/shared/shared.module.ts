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
import { ModalContentComponent } from './services/modal-content/modal-content.component';
import { SubHeaderComponent } from './components/sub-header/sub-header.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonComponent } from './components/skeleton/skeleton.component';
import { LoadingSwitchComponent } from './components/loading-switch/loading-switch.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    ThemeSwitchComponent,
    EssentialComponent,
    LoadingComponent,
    ModalContentComponent,
    SubHeaderComponent,
    SkeletonComponent,
    LoadingSwitchComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgOptimizedImage,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    ModalContentComponent,
    SubHeaderComponent,
    NgOptimizedImage,
    NgxSkeletonLoaderModule,
    SkeletonComponent,
    LoadingSwitchComponent,
  ],
  providers: [
    AuthPermissionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }
  ]
})
export class SharedModule { }
