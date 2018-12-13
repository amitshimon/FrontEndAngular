import { IEntityToDb } from './../Models/entity-interface';
import { LoggicService } from './../services/loggic-service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EntityService } from '../services/entity-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-entity',
  templateUrl: './edit-entity.component.html',
  styleUrls: ['./edit-entity.component.scss'],
  providers: [LoggicService]
})
export class EditEntityComponent implements OnInit, OnDestroy {
  sub: Subscription;
  webEntity: IEntityToDb = {
    id: null,
    description: null,
    amount: null,
    date: null,
    isPrivate: null,
    name: null,
    image: null
  };

  constructor(private route: ActivatedRoute,
    private entityService: EntityService,
    private loggic: LoggicService,
    private router: Router) { }

  get CleanDescription(): boolean {
    return this.loggic.cleanDescription;
  }
  set CleanDescription(value: boolean) {
    this.loggic.cleanDescription = value;
  }
  set CleanName(value: boolean) {
    this.loggic.cleanName = value;
  }
  set IsLengthBig(value: boolean) {
    this.loggic.isLengthBig = value;
  }
  get IsLengthBig(): boolean {
    return this.loggic.isLengthBig;
  }
  get CleanName(): boolean {
    return this.loggic.cleanName;
  }

  set CleanAmount(value: boolean) {
    this.loggic.cleanAmount = value;
  }
  get CleanAmount(): boolean {
    return this.loggic.cleanAmount;
  }

  cleanLabel(event): void {

    if (event && event === 1) {
      this.CleanName = true;
    }
    if (event && event === 2) {
      this.CleanDescription = true;
    }
    if (event && event === 3) {
      this.CleanAmount = true;
    }
  }
  resetAmo(event): void {

    if (event && event.target.value === '') {
      this.CleanAmount = false;
    }
  }

  validate(event, newEntityForm): void {

    if (event.target.value.length > 5) {
      newEntityForm.form.controls['amount'].setErrors({ 'incorrect': true });
      this.IsLengthBig = true;
    } else {
      this.IsLengthBig = false;
    }
  }
  resetName(event): void {
    if (event && event.target.value === '') {
      this.CleanName = false;
    }
  }
  resetDesc(event): void {
    if (event && event.target.value === '') {
      this.CleanDescription = false;
    }
  }
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.entityService.getEntityById(params['id']).subscribe((data) => {
        this.webEntity = data,
          (error) => console.log(error)
      });

    });
  }
  saveEntity(formValues): void {
    this.webEntity.date = this.loggic.convaertDateToTicks(formValues);
    this.sub = this.entityService.updateEntity(this.webEntity).subscribe(
      (data) => {
        this.webEntity = data;
        this.router.navigate(['/details/' + this.webEntity.id]);
      },
      (err: any) => console.log(JSON.stringify(err))
    );

  }
  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
