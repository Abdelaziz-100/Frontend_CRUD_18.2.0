import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [MatDialogModule, MatDialogTitle, MatDialogContent,
    MatDialogActions, MatButtonModule, MatIconModule,
    MatFormField, CommonModule, FormsModule, MatIconModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.css'
})
export class CustomerFormComponent {

  readonly DialogRef = inject(MatDialogRef<CustomerFormComponent>);

  data = inject<Customer>(MAT_DIALOG_DATA);
  constructor(private customerService: CustomerService) { }
  addOrEditCustomers(customer: Customer) {
    if (customer.id !== 0) {
      this.customerService.updateCustomers(customer).subscribe({
        next: (data) => {
          console.log("Customer Updated Successfully !");
          window.location.reload();
        },
        error: (err => {
          console.log(err);
        })
      })
    } else {
      this.customerService.createCustomers(customer).subscribe({
        next: (data) => {
          console.log("Customer Created Successfully !");
          window.location.reload();
        },
        error: (err => {
          console.log(err);
        })
      })
    }
  }
}

