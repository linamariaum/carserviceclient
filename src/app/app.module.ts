import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { CarListComponent } from './car-list/car-list.component';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { OwnerEditComponent } from './owner-edit/owner-edit.component';
import { DialogLink } from './dialog-link/dialog-link';

import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarEditComponent } from './car-edit/car-edit.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { CarWithOwnerListComponent } from './car-with-owner-list/car-with-owner-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarEditComponent,
    OwnerListComponent,
    OwnerEditComponent,
    DialogLink,
    CarWithOwnerListComponent
  ],
  entryComponents: [
    DialogLink
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
