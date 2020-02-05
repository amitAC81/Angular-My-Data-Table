import { Component, OnInit, Input } from '@angular/core';
import { ApiServiceService } from 'src/app/core/services/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'amt-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public searchText: string;
  order: string = 'name';
  reverse: boolean = false;
  pageOfItems: Array<any>;
  items = [];

  /**
   * Come data in table
   */
  @Input() datas: object;

  constructor(
    private api: ApiServiceService,
    private router: Router,
  ) {
  }

  ngOnInit() {
  }

  /**
   * Add employee Data
   */
  addEmp() {
    document.getElementById('popupId').style.display = 'block';
    this.router.navigate(['emp-list/add-emp']);
  }

  /**
   * Edit Employee data
   * @param id Employee data
   */
  edit(id: number) {
    document.getElementById('popupId').style.display = 'block';
    this.router.navigate([`emp-list/edit-emp/${id}`]);
  }

  /**
   * Delete Employee data
   * @param id Employee data
   */
  delete(id: number) {
    if (confirm('Do you want to delete employee?')) {
      this.api.empDelete(id);
    }
  }

  /**
   * set fields name in value 
   * reverse is default false
   * @param value it's field name
   */
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }
}
