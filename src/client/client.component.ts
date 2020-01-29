import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ClientService } from './client.service';

@Component({
    selector   : 'client',
    templateUrl: './client.component.html',
    styleUrls  : ['./client.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ClientComponent implements OnInit, OnDestroy
{
    selectedTab:number=0;
    labelTab="";

    client:any = {};

    private _unsubscribeAll: Subject<any>;
    /**
     * Constructor
     */
    constructor(private _clientService:ClientService)
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
        
        this.selectedTab=0;
    }

    onTabChange($event){
        this.labelTab = $event.tab.textLabel;
        this.selectedTab = $event.index;
        this._clientService.tabChanged.next($event.index);
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this.client = {};
        this.selectedTab = 0;//tab default
        this._clientService.onClientChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {

                this.client = data;
                if (data && data.id) {
                    this.selectedTab = 1;
                }
            });

        //Apenas para direcionar TABS
        this._clientService.tabChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                if (data && data == 'NEW') {
                    this.selectedTab = 1;
                } else if (data && data == 'LIST') {
                    this.selectedTab = 0;
                }
            });

    }

     /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
        this.client = {};
    }
}
