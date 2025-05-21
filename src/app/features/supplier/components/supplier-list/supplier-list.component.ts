import { Component } from '@angular/core';
import { TableComponent } from "../../../../shared/components/table/table.component";
import { Agent } from '../../../agent/models/agent.model';
import { SupplierPaymentTermsEnum } from '../../../../shared/enums/supplier-payment-terms-enum';
import { SupplierStatusEnum } from '../../../../shared/enums/supplier-status-enum';
import { Supplier } from '../../models/supplier.model';

@Component({
  selector: 'app-supplier-list',
  imports: [TableComponent],
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.css'
})
export class SupplierListComponent {
  suppliers: Supplier[] = [];

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    const rawSuppliers: Supplier[] = [
      {
        id: '1',
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@example.com',
        address: '123 Coconut St',
        supplierStatus: SupplierStatusEnum.ACTIVE,
        supplierPaymentTerms: SupplierPaymentTermsEnum.NET_30,
        agent: {
          id: 'agent1',
          username: 'agent_001',
        } as Agent,
      },
      {
        id: '2',
        firstName: 'Bob',
        lastName: 'Jones',
        email: 'bob@example.com',
        address: '456 Palm Ave',
        supplierStatus: SupplierStatusEnum.INACTIVE,
        supplierPaymentTerms: SupplierPaymentTermsEnum.PREPAID,
        agent: {
          id: 'agent2',
          username: 'agent_002',
        } as Agent,
      },
    ];

    // Append full name
    this.suppliers = rawSuppliers.map(s => ({
      ...s,
      name: `${s.firstName ?? ''} ${s.lastName ?? ''}`.trim()
    }));
  }

  onEdit(supplier: Supplier): void {
    console.log('Edit Supplier:', supplier);
    // Add edit logic
  }

  onDelete(supplier: Supplier): void {
    console.log('Delete Supplier:', supplier);
    // Add delete logic
  }
}
