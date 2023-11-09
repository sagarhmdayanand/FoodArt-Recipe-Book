import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { dataStorageService } from '../shared/data-storage.service';
import { authenticateService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector:'header-app',
  templateUrl:'./header.component.html',
  styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy{
  // @Output() selectedOption=new EventEmitter<string>();

  // toSelect(val:string){
  //   this.selectedOption.emit(val);
  // }
  constructor(private dataStorageSrv:dataStorageService,private authSrv:authenticateService,
    private route:Router){}
  private authsub!:Subscription;
  isAuthenticated=false;
  
  ngOnInit(){
    this.authsub=this.authSrv.user.subscribe(
      (resData)=>{
         this.isAuthenticated=resData?true:false;
        // this.isAuthenticated=!!resData;
      });
  }

  onSaveData(){
    this.dataStorageSrv.storeRecipe();
  }

  onFetchData(){
    this.dataStorageSrv.fetchData().subscribe(
      (res:any)=>{
        console.log(res,'ss');
      }
    );
  }
   
  onLogout(){
    this.authSrv.logOut();
  }

  ngOnDestroy(){
    this.authsub.unsubscribe();
  }

}