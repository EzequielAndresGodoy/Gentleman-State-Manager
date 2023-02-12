import { Component, OnInit, ViewChild } from '@angular/core';
import { People } from 'src/app/data';
import { Person } from 'src/app/models/people.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { GentlemanStateManager } from 'src/app/app.module';
import { SourceOfTruthKeys, UserStateProperties } from 'src/app/state-management/store';

@Component({
  selector: 'app-people-table',
  standalone: true,
  imports: [MatPaginatorModule, MatFormFieldModule, MatTableModule, MatInputModule, MatSortModule],
  templateUrl: './people-table.component.html',
  styleUrls: ['./people-table.component.scss']
})
export class PeopleTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'category', 'company', "levelOfHappiness"];
  dataSource: MatTableDataSource<Person>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }

  constructor() {
    GentlemanStateManager.getEntity(SourceOfTruthKeys.USER)
    .setObservableValue(20, UserStateProperties.AGE)
    
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(People);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

