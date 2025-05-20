import { Customer } from "../../customer/models/customer.model";
import { Supplier } from "../../supplier/models/supplier.model";

export interface Agent {
    id: string;
    version: number;
    createdDate: string;
    lastModifiedDate: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    username: string;
    password: string;
    role: 'ROLE_AGENT' | 'ROLE_ADMIN' | string;
    agentDepartment: 'SALES' | 'SUPPLY' | 'LOGISTICS' | string;
    performanceRate: number;
    apiKey: string;
    customers: Customer[];
    suppliers: Supplier[];
  }