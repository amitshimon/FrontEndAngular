import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { IEntityToDb } from '../Models/entity-interface';
import { EntityService } from '../services/entity-service';

@Component({
  selector: 'app-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.scss']
})
export class EntityDetailsComponent implements OnInit, OnDestroy {
  sub: Subscription;
  confirmDelete: boolean = false;
  webEntity: IEntityToDb;
  constructor(private activateRouter: ActivatedRoute,
    private entityService: EntityService, private route: Router) { }

  ngOnInit() {
    this.activateRouter.params.forEach((params: Params) => {
      this.sub = this.entityService.getEntityById(params['id']).subscribe((data) => {
        this.webEntity = data,
          (error) => console.log(error)
      });
    });
  }
  deleteEntity(): void {
    debugger
    this.sub = this.entityService.deleteEntity(this.webEntity.id).subscribe(() => {
      this.route.navigate(['/entityList']),
        (error) => console.log(error)
    });
  }
  ngOnDestroy(): void {
    if (this.sub) { this.sub.unsubscribe(); }
  }
}
