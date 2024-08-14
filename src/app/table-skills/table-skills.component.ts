import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator ,MatPaginatorIntl} from '@angular/material/paginator';
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
  providers:[MatPaginatorIntl],
  imports: [MatTableModule, MatPaginatorModule, MatSortModule,NgOptimizedImage,MatIconModule,MatTooltipModule]
})
export class TableSkillsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableSkillsItem>;
  dataSource = new TableSkillsDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['image','name','link'];
  constructor(private pag: MatPaginatorIntl){
    pag.itemsPerPageLabel = $localize `Items per page`;
    pag.firstPageLabel = $localize `First page`;
    pag.nextPageLabel = $localize `Next page`;
    pag.previousPageLabel = $localize `Previous page`;
    pag.getRangeLabel = (page: number, pageSize: number, length: number) => {
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return `${startIndex + 1}`+ $localize `of`+ `${endIndex} / ${length}`;
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
