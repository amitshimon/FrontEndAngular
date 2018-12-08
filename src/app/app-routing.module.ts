import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectListComponent } from './project-list/project-list.component';
import { CreateEntityComponent } from './create-entity/create-entity.component';
import { EditEntityComponent } from './edit-entity/edit-entity.component';
import { EntityDetailsComponent } from './entity-details/entity-details.component';

const routes: Routes = [
  { path: 'entity/new', component: CreateEntityComponent },
  { path: 'entityList', component: ProjectListComponent },
  { path: 'details/:id', component: EntityDetailsComponent },
  { path: 'edit/:id', component: EditEntityComponent },
  { path: '', redirectTo: '/entityList', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
