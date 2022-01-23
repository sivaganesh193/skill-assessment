import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GaugeChartModule } from 'angular-gauge-chart';
import { TabsPageRoutingModule } from './tabs-routing.module';
import {MatInputModule} from '@angular/material/input';

import { TabsPage } from './tabs.page';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    GaugeChartModule,
    NgApexchartsModule,
    MatInputModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
