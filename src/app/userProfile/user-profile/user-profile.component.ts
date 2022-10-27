import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/interface/User';
import { Userdisplay } from 'src/app/interface/Userdisplay';
import { UserAccessService } from'src/app/services/user-access.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  @Output() childnum:EventEmitter<any> = new EventEmitter()
  userForm:User[] = []
  formDisplay: Observable<Userdisplay[]> | undefined;
  @Input() count?:number 
  
  private eventsSubscription?: Subscription
  @Input() events: Observable<void> = new Observable<void>();//!!

  editPanel:boolean = true;
  acceptImage:boolean = false;
  userImage: any;
  currUserName: string | undefined

  userEditInfo: FormGroup = this.fb.group({}) 

  constructor(private userService:UserAccessService,
              private fb:FormBuilder,private http:HttpClient) {
    this.formDisplay = userService.displayInfo
   }
   
  ngOnInit(): void { 
    this.userEditInfo = this.fb.group({ 
      password:['',[Validators.required, Validators.minLength(6)]],
      firstName:['',[Validators.required, Validators.maxLength(60)]],
      lastName:['',[Validators.maxLength(60)]],
      image:[''],
      //todo require image
    })
    this.getlocalstore()
    this.formDisplay = this.userService.displayInfo
     
    this.userService.displayInfo?.subscribe(res=>{console.log(res[0].userName)})
    this.eventsSubscription = this.events.subscribe((res) => {this.getlocalstore();console.log(res,"update on login")});//!!
     
  } 
   
  get password(){
    return this.userEditInfo.get('password');
  }
  get firstName(){
    return this.userEditInfo.get('firstName');
  }
  get lastName(){
    return this.userEditInfo.get('lastName');
  }
  get image(){
    return this.userEditInfo.get('image');
  }

  disUsername:string | null | undefined
  disFirstname?:string | null | undefined
  disLastname?:string | null | undefined
  disImage?:string | null | undefined
  public getlocalstore(){
    const uname = localStorage.getItem('')
    this.disUsername = localStorage.getItem('iiuser')
    this.disFirstname = localStorage.getItem('iifirstName')
    this.disLastname = localStorage.getItem('iilastName')
    this.disImage = localStorage.getItem('iiimage')
    console.log("getlocalstore")
  }

  logout(){
    this.childnum.emit(1)
    localStorage.clear()
  }

  openEditPanel(){
    this.editPanel = !(this.editPanel)
  }
 
  typeimage: string[] | undefined
  onImageSelected(event: Event){ 
    const input = document.getElementById('file');
    const newev = event.target as HTMLInputElement
    const imgsize = newev.files?.item(0)?.size 

    const imagename = newev.files?.item(0)?.name 
    this.typeimage = imagename?.split('.')
 
    if(this.typeimage != undefined && imgsize != undefined){//for disable submit button
      this.acceptImage = this.checkTypeImage(this.typeimage[1],imgsize)//match return true
    }else if(this.typeimage == undefined){
      this.acceptImage = false
    } 
    this.userImage = event.target as HTMLInputElement 
    //this.userService.userRegistImage(newev);//use service to insert image
  } 

  checkTypeImage(type:string,size:number) { 
    if(type != undefined){
      if((type == 'png' || type == 'jpeg' || type == 'jpg' || type == 'bmp') && size <= 5242880 ){  
        return true
      } 
    }  
    return false
  } 

  edittUser(){
    this.userForm = []
    this.formDisplay?.subscribe(res =>{this.currUserName = res[0].userName?.replace(/ /g,''); console.log(res[0].userName,"in obs")})
    const tmpImage = this.userImage.files?.item(0)
    const trimlocal = localStorage.getItem('iiuser')
    //const trim = this.currUserName?.replace(/ /g,'')
    var trim
    var hold
    if(trimlocal != null)
    {
       hold = trimlocal
       trim = hold.replace(/ /g,'')
    }
   
    this.userForm.push({Id:undefined,
      UserName: trim, 
      Password: this.userEditInfo.value.password, 
      FirstName:this.userEditInfo.value.firstName, 
      LastName:this.userEditInfo.value.lastName, 
      Image:tmpImage})// end push  
    //console.warn(trim, this.userEditInfo.value.password,this.userEditInfo.value.firstName,this.userEditInfo.value.lastName)
    this.userService.editProfile(this.userImage,this.userForm) 
    setTimeout(()=>{this.userService.getUser()},500)
    setTimeout(()=>{this.getlocalstore();console.log("update localstorage")
    },4000) 
    this.userEditInfo.reset()
  }

  PWnotpass:boolean = false
  tmppass:String = new String
   testnum(event: Event) {
    const newev = event.target as HTMLInputElement
    this.tmppass = newev.value
    var s = this.tmppass
    for(var i in s) {
        if (+s[+i+1] == +s[i]+1 && +s[+i+2] == +s[i]+2) {this.PWnotpass = false;return false}
    }
    var j = 0
    for(var i in s) {
      if (String.fromCharCode(s.charCodeAt(j)+1) == s[+i+1] && 
          String.fromCharCode(s.charCodeAt(j)+2) == s[+i+2]) {this.PWnotpass = false; return false }
    }
    this.PWnotpass = true
    console.log(this.PWnotpass)
    return true;
  }


}
