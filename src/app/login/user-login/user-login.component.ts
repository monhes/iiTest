import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators, Form } from '@angular/forms'; 
import { UserAccessService } from 'src/app/services/user-access.service'
import { User } from 'src/app/interface/User'; 
import { Userdisplay } from 'src/app/interface/Userdisplay';
import { auditTime, BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserProfileComponent } from 'src/app/userProfile/user-profile/user-profile.component';
 

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  // ! done !
  @ViewChild('bobbin',{read:ElementRef}) 
  set proRef(el:ElementRef<UserProfileComponent> | undefined){
    this.proRef$.next(el)
  }
  get proRef(){
    return this.proRef$.value
  }
  proRef$ =  new BehaviorSubject<ElementRef<UserProfileComponent>| undefined>(undefined)
  //!! get child comp

  @ViewChild('bobbin',{read:ElementRef}) childcomp?:ElementRef
  @ViewChild(UserProfileComponent,{static:true}) child?:UserProfileComponent
  @Output() childnum:EventEmitter<any> = new EventEmitter()
  userLoginForm: User[] = []
  userInfo: User | undefined
  currPagenum?: number



  numservive:number = 1;

  userForm_login: Observable<Userdisplay[]> | undefined;

  currUser?:string

  userLoginInfo: FormGroup = this.fb.group({});
  constructor(private fb: FormBuilder,
              private userService: UserAccessService
     ) { }
 
  ngOnInit(): void {
    this.userLoginInfo = this.fb.group({
      userName:['',[Validators.required]],
      password:['',[Validators.required]]
    })
    this.currPagenum = 1
    this.proRef$.subscribe((ref=>{console.log(ref)}))
    console.warn("something init")
  }

  get userName(){
    return this.userLoginInfo.get('userName');
  }
  get password(){
    return this.userLoginInfo.get('password');
  }

  
  async login(){  
    this.userLoginForm = []
    const form = []
    this.userLoginForm.push({Id:undefined,UserName: this.userLoginInfo.value.userName, Password: this.userLoginInfo.value.password, FirstName:undefined, LastName:undefined, Image: undefined})
    
    await this.userService.userLogin(this.userLoginForm) //!!
    this.child?.getlocalstore()
    console.log(this.proRef$.value,"$$$")
    console.log(this.proRef,"proref")
    console.log(this.childcomp,"childcomp")
    setTimeout(()=>{if(this.userService.loggedIn){ 
      this.proRef?.nativeElement.getlocalstore
      this.emitEventToChild()
      this.PageSwitch(3)
    }},3000) 
  }

  regist(){
    this.childnum.emit(2)
    this.PageSwitch(2)
  } 

  testuser(){
    this.userService.getUser()
  }

  //!!
  eventsSubject: Subject<void> = new Subject<void>();

  emitEventToChild() {
  console.log("emit child")
  this.eventsSubject.next();
  }


  public PageSwitch(pagenum:any){
    console.log(pagenum)
    if(pagenum == 1){this.ShowLogin()}
    else if(pagenum == 2){this.ShowRegist()}
    else if(pagenum == 3){this.ShowProfile()}
  }

  hidelogin:boolean = false
  hideregist:boolean = true
  hideprofile:boolean = true

  public ShowLogin(){
    console.log("ShowLogin")
    const user = localStorage.getItem('iiuser')
    //if(user == null || user == undefined){
      this.hidelogin = false
      this.hideregist = true
      this.hideprofile = true
    //}
  }
  public ShowProfile(){ 
    console.log("ShowProfile")
    const user = localStorage.getItem('iiuser')
    this.hidelogin = true
    this.hideregist = true
    this.hideprofile = false
  }
  public ShowRegist(){
    console.log("ShowRegist")
    const user = localStorage.getItem('iiuser')
    this.hidelogin = true
    this.hideregist = false
    this.hideprofile = true
  }
}
