import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {
    MatButtonModule, MatChipsModule,MatDatepickerModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginatorModule, MatRippleModule, MatSelectModule, MatSnackBarModule,
    MatSortModule,MatSlideToggleModule, MatTableModule, MatTabsModule, MatStep, MatStepperModule, MatTooltip, MatTooltipModule, MatTabGroup,
} from '@angular/material';

import { ClientService } from './client.service';
import { ClientComponent } from './client.component';
import { ClientRegisterComponent } from './tabs/register/client-register.component';
import { ClientListComponent } from './tabs/list/client-list.component';
import { DatePipe } from '@angular/common';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
    {
        path     : 'client',
        component: ClientComponent,
        resolve  : {
            data: ClientService
        }
    }
];
@NgModule({
    declarations: [
        ClientComponent,
        ClientRegisterComponent,
        ClientListComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatSlideToggleModule,
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatSnackBarModule,
        MatTableModule,
        MatTabsModule,
        MatDatepickerModule,
        MatStepperModule,
        MatTooltipModule,
        HttpClientModule

    ],
    providers   : [
        ClientService,
        HttpClient,
        DatePipe
    ]
})
export class ClientModule
{
}
