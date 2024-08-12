import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { TableSkillsDataSource, TableSkillsItem } from './table-skills-datasource';
import { NgOptimizedImage } from '@angular/common'
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from '@angular/material/tooltip';
@Component({
  selector: 'app-table-skills',
  templateUrl: './table-skills.component.html',
  styleUrl: './table-skills.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule,NgOptimizedImage,MatIconModule,MatTooltipModule]
})
export class TableSkillsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableSkillsItem>;
  dataSource = new TableSkillsDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['image','name','link'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
