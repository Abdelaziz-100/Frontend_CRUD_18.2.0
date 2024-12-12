import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CustomerFormComponent } from '../customer-form/customer-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule, MatDialogModule, MatInputModule, MatButtonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'name', 'email', 'address', 'edit', 'delete'];
  customers: Customer[] = [];
  filtercustomers: Customer[] = [];
  dataSource = new MatTableDataSource<Customer>();
  name: String = '';
  email: String = '';
  address: String = '';

  customer: Customer = {
    id: 0,
    name: '',
    email: '',
    address: ''
  }

  readonly dialog = inject(MatDialog);
  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;

  constructor(private customerService: CustomerService) { }
  ngAfterViewInit(): void {
    this.customerService.fetchAllCustomers().subscribe((data) => {
      this.customers = data;
      this.dataSource = new MatTableDataSource<Customer>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  filterCustomers(input: string) {
    this.filtercustomers = this.customers.filter(item => item.name.toLowerCase().includes(input.toLowerCase())
      || item.email.toLowerCase().includes(input.toLowerCase())
      || item.address.toLowerCase().includes(input.toLowerCase()));
    this.dataSource = new MatTableDataSource<Customer>(this.filtercustomers);
  }

  openCustDialog(cust: Customer): void {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      data: cust
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.customer.id = result.id;
        this.customer.name = result.name;
        this.customer.email = result.email;
        this.customer.address = result.address;
      }
    });
  }
  deleteCustomer(id: Number) {
    const isconfirmed = window.confirm("Are you sure you wan't to Delete this !!!!!")
    if (isconfirmed) {
      this.customerService.deleteCustomers(id).subscribe((data => {
        this.customers = this.customers.filter(item => item.id !== id);
      }
      ))
      window.location.reload();
    }

  }
}


