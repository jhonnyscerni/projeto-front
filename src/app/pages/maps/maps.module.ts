import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxVectorMapModule } from 'devextreme-angular';

import { RouterModule } from '@angular/router';
import { MapsRoutes } from './maps.routing';

import { GoogleComponent } from './google/google.component';
import {ComponentsModule} from '../../@core/components/components.module';

@NgModule({
  declarations: [GoogleComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(MapsRoutes),
        ComponentsModule,
        DxVectorMapModule,
    ]
})
export class MapsModule {}
