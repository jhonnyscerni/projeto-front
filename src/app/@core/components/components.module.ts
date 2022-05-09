import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};
import {SidebarComponent} from './sidebar/sidebar.component';
import {NavbarComponent} from './navbar/navbar.component';
import {FooterComponent} from './footer/footer.component';
import {VectorMapComponent1} from './vector-map/vector-map.component';

import {RouterModule} from '@angular/router';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {DxVectorMapModule} from 'devextreme-angular';
import {BsDropdownModule} from 'ngx-bootstrap';

import {AcessoNegadoComponent} from './acesso-negado/acesso-negado.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ComponentDatepickerModule} from './component-datepicker/component-datepicker.module';
import {ComponentDatepickerComponent} from './component-datepicker/component-datepicker/component-datepicker.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CollapseModule.forRoot(),
        DxVectorMapModule,
        PerfectScrollbarModule,
        BsDropdownModule.forRoot(),
        ComponentDatepickerModule
    ],
    declarations: [
        FooterComponent,
        VectorMapComponent1,
        NavbarComponent,
        SidebarComponent,
        NotFoundComponent,
        AcessoNegadoComponent,
    ],
    exports: [
        FooterComponent,
        VectorMapComponent1,
        NavbarComponent,
        SidebarComponent,
        NotFoundComponent,
        AcessoNegadoComponent,
    ],
    providers: [
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }
    ]
})
export class ComponentsModule {
}
