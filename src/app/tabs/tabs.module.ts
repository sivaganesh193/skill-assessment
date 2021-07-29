import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GaugeChartModule } from 'angular-gauge-chart';
import { TabsPageRoutingModule } from './tabs-routing.module';
import { NgApexchartsModule } from "ng-apexcharts";


import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    GaugeChartModule,
    NgApexchartsModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
