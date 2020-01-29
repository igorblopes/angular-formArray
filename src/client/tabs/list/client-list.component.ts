import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {  Subject } from 'rxjs';
import { ClientService } from '../../client.service';

@Component({
    selector     : 'client-list',
    templateUrl  : './client-list.component.html',
    styleUrls    : ['./client-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientListComponent implements OnInit, OnDestroy
{
    

    userProfile : number = -1;


    rowSelected:any={};

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ClientService} _clientService
     */
    constructor(
        private _clientService: ClientService)
    {

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    onSelectedRow(object:any) : void{
        this.rowSelected=object;
        this._clientService.getClient(object);
    }

    /**
     * On new register
     */
    newRegister():void{
        this._clientService.tabChanged.next('NEW');
    }

 
    /**
     * On init
     */
    ngOnInit(): void
    {
        
       

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}


