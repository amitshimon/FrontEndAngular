import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { IEntityToDb } from '../Models/entity-interface';
import { EntityService } from '../services/entity-service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { LoggicService } from '../services/loggic-service';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy {

  sub: Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pagesNumber: number[] = [5, 10, 15];
  filterpagesNumber: number[] = [];
  sorted = null;
  errorMessage: string;
  displayedColumns: string[] = ['id', 'name', 'amount', 'description', 'isPrivate', 'date'];
  dataSource: IEntityToDb[];
  date: Date = new Date();

  constructor(private entityService: EntityService,
    private loggic: LoggicService) { }

  onPaginateChange(event) {
    this.loggic.pageDisplay = event.pageSize;
  }

  ngOnInit() {
    this.SavePaginatorIndex();
    this.PopulateTable();
  }

  private SavePaginatorIndex() {
    if (this.loggic.pageDisplay) {
      this.filterpagesNumber = this.filterpagesNumber.concat(this.pagesNumber);
      this.filterpagesNumber.splice(this.filterpagesNumber.findIndex(element => element === this.loggic.pageDisplay), 1);
      this.filterpagesNumber.unshift(this.loggic.pageDisplay);
    }
    else {
      this.filterpagesNumber = this.pagesNumber;
    }
  }
  
  private PopulateTable(): void {
    this.sub = this.entityService.getEntity().subscribe(
      (data) => {
        this.sorted = new MatTableDataSource<IEntityToDb>(data);
        this.sorted.paginator = this.paginator;
        this.sorted.sort = this.sort;
        this.dataSource = data;
      },
      (error) => {
        this.errorMessage = <any>error;
        console.log(this.errorMessage);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
