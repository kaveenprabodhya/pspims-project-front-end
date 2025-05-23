import { AgentDepartmentTypeEnum } from '../../../shared/enums/agent-department-type-enum';
import { Role } from '../../../shared/enums/role-enum';
import { Customer } from '../../customer/models/customer.model';
import { Supplier } from '../../supplier/models/supplier.model';

export interface Agent {
  id?: string;
  version?: number;
  createdDate?: string;
  lastModifiedDate?: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  address: string;
  username: string;
  password: string;
  role: Role;
  agentDepartment: AgentDepartmentTypeEnum;
  performanceRate: number;
  apiKey?: string;
  customers?: Customer[];
  suppliers?: Supplier[];
}
