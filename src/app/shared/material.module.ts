import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDividerModule} from "@angular/material/divider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatTabsModule} from "@angular/material/tabs";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatRadioModule} from "@angular/material/radio";
import {MatTooltipModule} from "@angular/material/tooltip";
import { MatFormFieldModule } from '@angular/material/form-field';


const MaterialComponents = [
  MatSlideToggleModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatCardModule,
  LayoutModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatDialogModule,
  MatDividerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatTabsModule,
  MatInputModule,
  MatExpansionModule,
  MatRadioModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatToolbarModule,
  MatSidenavModule
]

@NgModule({
  imports: [ MaterialComponents ],
  exports:[ MaterialComponents ]
})
export class MaterialModule { }
