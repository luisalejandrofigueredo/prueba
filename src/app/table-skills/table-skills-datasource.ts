import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { link } from 'fs';

// TODO: Replace this with your own data model type
export interface TableSkillsItem {
  name: string;
  image: string;
  width: string;
  link: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TableSkillsItem[] = [
  { image: "Angular.svg", width: "200", name: 'Angular', link: "https://angular.io/" },
  { image: "nodejs.svg", width: "200", name: 'Node', link: "https://nodejs.org/en" },
  { image: "docker.png", width: "75", name: "Docker", link: "https://www.docker.com/" },
  { image: "express.png", width: "100", name: "Express", link: "https://expressjs.com/" },
  { image: "typescript-logo-1024x576.png", width: "100", name: 'Typescript', link: "https://www.typescriptlang.org/" },
  { image: "typeorm.png", width: "200", name: 'Typeorm', link: "https://typeorm.io/" },
  { image: "mysql_official_logo_icon.svg", width: "150", name: "Mysql", link: "https://www.mysql.com/" },
  { image: "postgresql_src_logo_icon_170834.svg", width: "100", name: 'Postgress', link: "https://www.postgresql.org/" },
  { image: "github-icon-seeklogo.com.svg", width: "100", name: 'Github', link: "https://github.com/" },
  { image: "handlebars_logo.png", width: "100", name: 'Handlebars', link: "https://handlebarsjs.com/" },

];

/**
 * Data source for the TableSkills view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TableSkillsDataSource extends DataSource<TableSkillsItem> {
  data: TableSkillsItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TableSkillsItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TableSkillsItem[]): TableSkillsItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TableSkillsItem[]): TableSkillsItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'link': return compare(a.link, b.link, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
