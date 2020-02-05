import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiServiceService } from 'src/app/core/services/api-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'amt-add-edit-model',
  templateUrl: './add-edit-model.component.html',
  styleUrls: ['./add-edit-model.component.scss']
})
export class AddEditModelComponent implements OnInit {
  public dept: object;
  public empData: any;
  public submitted = false;
  public empId: string;
  constructor(
    private fb: FormBuilder,
    private api: ApiServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    // get Department data using dropdown
    this.api.getDeptData().subscribe((data => {
      this.dept = data;
    }));

    // get emp id from URL
    this.empId = this.route.snapshot.paramMap.get('id');
  }

  // Employee form
  empForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', Validators.required],
    mobile: ['', Validators.required],
    gender: ['', Validators.required],
    address: this.fb.array([
      this.fb.group({
        city: ['', Validators.required],
        zip: ['', Validators.required]
      })
    ]),
    department: ['', Validators.required],
    hiredate: ['', Validators.required],
    permanent: [false]
  });

  ngOnInit() {
    if (this.empId) {
      this.api.getEmp(this.empId).subscribe((data => {
        this.empData = data;
        this.empForm.setValue({
          name: this.empData.name,
          email: this.empData.email,
          mobile: this.empData.mobile,
          gender: this.empData.gender,
          department: this.empData.department,
          hiredate: this.empData.hiredate,
          permanent: this.empData.permanent,
          address: [{
            zip: this.empData.address[0].zip,
            city: this.empData.address[0].city
          }]
        });
      }));
    }
  }

  /**
   * Add multiple address
   */
  addNewAddress() {
    const control = this.empForm.controls.address as FormArray;
    control.push(
      this.fb.group({
        city: [''],
        zip: ['']
      })
    );
  }

  /**
   * delete existing address
   * @param index address index
   */
  deleteAddress(index) {
    const control = this.empForm.controls.address as FormArray;
    control.removeAt(index);
  }

  /**
   * Add Employee data
   * Edit Employee data
   */
  onSubmit() {
    this.submitted = true;
    if (this.empId) {
      this.api.editEmployee(Number(this.empId), this.empForm.value);
    } else {
      this.api.addEmployee(this.empForm.value);
    }
    this.router.navigate(['emp-list']);
  }

  // instance of employee form
  get f() { return this.empForm.controls; }
}
