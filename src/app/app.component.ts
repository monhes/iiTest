import { Component, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Userdisplay } from './interface/Userdisplay';
import { UserAccessService } from './services/user-access.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iitest';
  
  hidelogin:boolean = false
  hideregist:boolean = true
  hideprofile:boolean = true
  
  
  ngOnInit(): void {
    var i:number = 0
     console.log(i += 1)
     this.ShowLogin
  }
  
  public ShowLogin(){
    const user = localStorage.getItem('iiuser')
    //if(user == null || user == undefined){
      this.hidelogin = false
      this.hideregist = true
      this.hideprofile = true
    //}
  }
  public ShowProfile(){ 
    const user = localStorage.getItem('iiuser')
    this.hidelogin = true
    this.hideregist = true
    this.hideprofile = false
  }
  public ShowRegist(){
    const user = localStorage.getItem('iiuser')
    this.hidelogin = true
    this.hideregist = false
    this.hideprofile = true
  }

  public PageSwitch(pagenum:any){
    console.log(pagenum)
    if(pagenum == 1){this.ShowLogin()}
    else if(pagenum == 2){this.ShowRegist()}
    else if(pagenum == 3){this.ShowProfile()}
  }

  public Logout(){
    localStorage.clear()
  } 
 
 
}
