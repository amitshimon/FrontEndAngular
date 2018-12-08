import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IEntityToDb } from '../Models/entity-interface';
import { EntityService } from '../services/entity-service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit , OnDestroy{
  
  sub:Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  sorted = null;
  errorMessage: string;
  displayedColumns: string[] = ['id', 'name', 'amount', 'description', 'isPrivate', 'date'];
  dataSource: IEntityToDb[];
  date: Date = new Date();
  constructor(private entityService: EntityService) { }


  ngOnInit() {
    this.sub =this.entityService.getEntity().subscribe(
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
