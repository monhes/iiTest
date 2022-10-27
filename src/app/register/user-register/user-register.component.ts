import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators, Form } from '@angular/forms'; 
import { User } from 'src/app/interface/User';
import { UserAccessService } from 'src/app/services/user-access.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  @Output() childnum:EventEmitter<any> = new EventEmitter()
  userForm:User[] = []

  PWnotpass:boolean = false
 
  userImage: any;
  userRegistInfo: FormGroup = this.fb.group({})
  srcResult: any;
  acceptImage:boolean = false;

  constructor(private fb:FormBuilder,
              private userService: UserAccessService,
              private fc:FormControl) { }

  ngOnInit(): void {
    this.userRegistInfo = this.fb.group({
      userName:['',[Validators.required, Validators.pattern('^[a-zA-Z0-9_]*$'), Validators.maxLength(12), Validators.minLength(4)]],
      password:['',[Validators.required, Validators.minLength(6)]],
      firstName:['',[Validators.required, Validators.maxLength(60)]],
      lastName:['',[Validators.maxLength(60)]],
      image:[''],
      //todo require image
    })
  }
  get userName(){
    return this.userRegistInfo.get('userName');
  }
  get password(){
    return this.userRegistInfo.get('password');
  }
  get firstName(){
    return this.userRegistInfo.get('firstName');
  }
  get lastName(){
    return this.userRegistInfo.get('lastName');
  }
  get image(){
    return this.userRegistInfo.get('image');
  }

  onFileSelected(event: Event) {
    const inputNode: any = document.querySelector('#file'); 
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
         
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
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
  
  registUser(){
    this.userForm = []
    const tmpImage = this.userImage.files?.item(0)
    this.userForm.push({Id:undefined,
      UserName: this.userRegistInfo.value.userName, 
      Password: this.userRegistInfo.value.password, 
      FirstName:this.userRegistInfo.value.firstName, 
      LastName:this.userRegistInfo.value.lastName, 
      Image:tmpImage})// end push  
      
    this.userService.userRegistImage(this.userImage,this.userForm)
    this.childnum.emit(1) 
    this.userRegistInfo.reset()
  }
  backToLogin(){
    this.childnum.emit(1)
  }
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
