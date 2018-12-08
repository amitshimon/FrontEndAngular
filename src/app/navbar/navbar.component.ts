import { Component, OnInit, OnDestroy } from '@angular/core';
import { IEntityToDb } from '../Models/entity-interface';
import { EntityService } from '../services/entity-service';
import { Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  sub: Subscription;
  private _whenSearch: boolean = false;
  entitysName: IEntityToDb[];
  filterEntitysName: IEntityToDb[] = [];
  searchWord: string = '';

  constructor(private entityService: EntityService,
    private router: Router) { }

  ngOnInit() {

    this.sub = this.entityService.newEntitySubject$.subscribe(
      (data) => {
        if (data) {
          this.entitysName.push(data);
          this.filterEntitysName.push(data);
        }
      }
    );

    this.sub = this.entityService.getEntity().subscribe((data) => {
      this.entitysName = data
    },
      (error) => {
        console.log(error);
      });
  }

  reset() {
    this.filterEntitysName = [];
    this.whenSearch = false;
  }
  get whenSearch(): boolean {
    return this._whenSearch;
  }
  set whenSearch(theWhenSearch: boolean) {
    this._whenSearch = theWhenSearch;
  }

  search(event): void {
    debugger
    this.filterEntitysName = [];
    this.entitysName.filter(entitName => {
      if (event.target.value != "") {
        if (entitName.name.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1) {
          this.whenSearch = true;
          this.filterEntitysName.push(entitName);
        }
      } else {
        this.whenSearch = false;
        this.filterEntitysName = [];
      }

    });

  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
