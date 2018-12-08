import { IEntityToDb } from './../Models/entity-interface';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { EntityService } from '../services/entity-service';
import { LoggicService } from '../services/loggic-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html',
  styleUrls: ['./create-entity.component.scss'],
  providers: [LoggicService]
})
export class CreateEntityComponent implements OnDestroy {
  sub: Subscription;
  newEntity: IEntityToDb = {
    id: null,
    description: null,
    amount: null,
    date: null,
    isPrivate: null,
    name: null
  };

  constructor(private router: Router,
    private entityService: EntityService,
    private loggic: LoggicService) {

  }
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
  numberFieldLength(value): void {
    if (value.length > 6) {
      this.newEntity.amount = value.slice(0, 6);
      this.IsLengthBig = false;
    }
  }
  validate(event, newEntityForm): void {

    if (event.target.value.length > 6) {
      newEntityForm.form.controls['amount'].setErrors({ 'incorrect': true });
      debugger
      this.numberFieldLength(event.target.value);
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
  cancel(): void {
    this.router.navigate(['/entityList']);
  }

  saveEntity(formValues): void {
    this.convertToEntity(formValues);
    this.sub = this.entityService.CreateEntity(this.newEntity).subscribe(
      (data) => {
        this.router.navigate(['/entityList']);
      },
      (err: any) => console.log(JSON.stringify(err))
    );
  }
  convertToEntity(formValues): void {

    this.newEntity = {
      id: undefined,
      name: formValues.name,
      amount: formValues.amount,
      description: formValues.description,
      isPrivate: formValues.isPrivate,
      date: ((new Date(formValues.date).getTime() * 10000) + 621355968000000000)
    }
  }
  ngOnDestroy(): void {
    if (this.sub) { this.sub.unsubscribe(); }
  }
}
