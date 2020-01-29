import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class ClientService implements Resolve<any>
{
    onClientChanged: BehaviorSubject<any>;
    onClientsChanged: BehaviorSubject<any>;
    
    tabChanged: BehaviorSubject<any>;
    
    routeParams: any;
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onClientChanged = new BehaviorSubject({});
        this.onClientsChanged = new BehaviorSubject({});
        this.tabChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;
        
        return new Promise((resolve, reject) => {

            Promise.all([
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }


    

    /**
     * Get client
     *
     * @returns {Promise<any>}
     */
    getClient(id:number): Promise<any>
    {
        //
        return new Promise((resolve, reject) => {
            this._httpClient.get('./assets/registros_1.json')
                .subscribe((response: any) => {
                    //this.client = response;
                    this.onClientChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }


}
