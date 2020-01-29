import { Component, OnDestroy, OnInit, ViewEncapsulation, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { ClientService } from '../../client.service';

@Component({
  selector: 'client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClientRegisterComponent implements OnInit, OnDestroy {
  
  // Private
  private _unsubscribeAll: Subject<any>;
  private formEntity: FormGroup;


  /**
   * Constructor
   *
   * @param {ClientService} _clientService
   */
  constructor( private _formBuilder: FormBuilder, private _clientService: ClientService,private changeDetectorRef: ChangeDetectorRef
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();

    // Reactive Form
    this.createFormClean();
  }


  /**
   * On init
   */
  ngOnInit(): void {
    this.createFormClean();
    this._clientService.onClientChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        if (data && data.id) {
          this.formEntity = this.loadFormSimple(data);
        }
      });


    this.createFormClean();
    this._clientService.tabChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(result => {
        if (result && result == 'NEW') {
        }
      });

  }

  loadFormSimple(data){
    
    return this._formBuilder.group({
      id: [data.id],
      name: [data.name],
      note: [data.note],
      address: this._formBuilder.array(this.loadFormArrayAddress(data.address))
    });
  }

  loadFormArrayAddress(address:any[]|null):FormGroup[]{
    return address.map(x=> {
      return this._formBuilder.group({
        rua: [x.rua],
        numero: [x.numero],
        bairro: [x.bairro]
      })
    });
  }


  createFormClean(){
    this.formEntity = this._formBuilder.group({
      id: [null],
      name: [''],
      note: [''],
      address: this._formBuilder.array([])
    });
  }


  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}

