import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { authGuard } from '../../core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashboardPageComponent
      },
      { path: 'agent', loadChildren: () => import('../../features/agent/agent.module').then(m => m.AgentModule) },
      { path: 'beverage-ingredients', loadChildren: () => import('../../features/beverage-ingredients/beverage-ingredients.module').then(m => m.BeverageIngredientsModule) },
      { path: 'beverage-prod-order', loadChildren: () => import('../../features/beverage-prod-order/beverage-prod-order.module').then(m => m.BeverageProdOrderModule) },
      { path: 'beverage-type', loadChildren: () => import('../../features/beverage-type/beverage-type.module').then(m => m.BeverageTypeModule) },
      { path: 'coconut-purchase', loadChildren: () => import('../../features/coconut-purchase/coconut-purchase.module').then(m => m.CoconutPurchaseModule) },
      { path: 'coconutwater-prod-order', loadChildren: () => import('../../features/coconutwater-prod-order/coconutwater-prod-order.module').then(m => m.CoconutwaterProdOrderModule) },
      { path: 'copra-sale', loadChildren: () => import('../../features/copra-sale/copra-sale.module').then(m => m.CopraSaleModule) },
      { path: 'customer', loadChildren: () => import('../../features/customer/customer.module').then(m => m.CustomerModule) },
      { path: 'delivery-vehicle', loadChildren: () => import('../../features/delivery-vehicle/delivery-vehicle.module').then(m => m.DeliveryVehicleModule) },
      { path: 'inventory', loadChildren: () => import('../../features/inventory/inventory.module').then(m => m.InventoryModule) },
      { path: 'order', loadChildren: () => import('../../features/order/order.module').then(m => m.OrderModule) },
      { path: 'payment-details', loadChildren: () => import('../../features/payment-details/payment-details.module').then(m => m.PaymentDetailsModule) },
      { path: 'prod-order-details', loadChildren: () => import('../../features/prod-order-details/prod-order-details.module').then(m => m.ProdOrderDetailsModule) },
      { path: 'shipping-plan', loadChildren: () => import('../../features/shipping-plan/shipping-plan.module').then(m => m.ShippingPlanModule) },
      { path: 'supplier-payment-details', loadChildren: () => import('../../features/supplier-payment-details/supplier-payment-details.module').then(m => m.SupplierPaymentDetailsModule) },
      { path: 'supplier', loadChildren: () => import('../../features/supplier/supplier.module').then(m => m.SupplierModule) },
      { path: 'vinegar-prod-order', loadChildren: () => import('../../features/vinegar-prod-order/vinegar-prod-order.module').then(m => m.VinegarProdOrderModule) },
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
