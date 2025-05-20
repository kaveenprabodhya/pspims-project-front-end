import { Agent } from "../../agent/models/agent.model";
import { CoconutPurchase } from "../../coconut-purchase/models/coconut-purchase.model";
import { SupplierPaymentDetails } from "../../supplier-payment-details/models/supplier-payment-details.model";

export interface Supplier {
    id: string;
    version: number;
    createdDate: string;
    lastModifiedDate: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    supplierStatus: string; // SupplierStatusEnum
    supplierPaymentTerms: string; // SupplierPaymentTermsEnum
    agent: Agent;
    supplierPaymentDetails: SupplierPaymentDetails[];
    coconutPurchase: CoconutPurchase[];
  }