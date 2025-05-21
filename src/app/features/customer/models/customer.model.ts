import { CustomerType } from '../../../shared/enums/customer-type';
import { Agent } from '../../agent/models/agent.model';
import { CopraSale } from '../../copra-sale/models/copra-sale.model';
import { Order } from '../../order/models/order.model';

export interface Customer {
  id?: string;
  version?: number;
  createdDate?: string;
  lastModifiedDate?: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  customerType: CustomerType;
  creditLimit: number;
  agent?: Agent;
  order?: Order[];
  copraSale?: CopraSale[];
}
