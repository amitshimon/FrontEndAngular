import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { CreateEntityComponent } from './create-entity/create-entity.component';
import { EditEntityComponent } from './edit-entity/edit-entity.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import{FormsModule, ReactiveFormsModule}from '@angular/forms';
import { EntityDetailsComponent } from './entity-details/entity-details.component'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    CreateEntityComponent,
    EditEntityComponent,
    NavbarComponent,
    EntityDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
