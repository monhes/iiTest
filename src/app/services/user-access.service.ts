import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { User } from '../interface/User';
import { Route, Router } from '@angular/router';
import { Userdisplay } from '../interface/Userdisplay';
import { Observable, of } from 'rxjs';
import { AppComponent } from '../app.component';
import { UserLoginComponent } from '../login/user-login/user-login.component';
import { UserProfileComponent } from '../userProfile/user-profile/user-profile.component';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserAccessService {

  private urlString: string = 'https://localhost:7185/api/User';
  public loggedIn: boolean = false;

  public outUserDisplay?:any

  public displayInfo: Observable<any> | undefined
  uploadedImage:any
  constructor(private http: HttpClient,private route:Router,private xml:XMLHttpRequest) { }

  public checkLogin(){
    if(this.loggedIn == false || localStorage.length == 0)
    {
       
    }  
  }

  public async getUser(){
    const username = localStorage.getItem('iiuser')
    var hold
    if(username != null){
      hold = username.replace(/ /g,'')
    } 
    console.warn(hold,'curr iiuser')
    console.warn(this.urlString + '/' + hold,"URL")
        this.http.get<any>(this.urlString + '/' + hold).pipe().subscribe(res => {
          console.log(res.responseType,"res type")
          console.log(res[0].firstName,res[0].lastName,"new arr name qry")
          console.log(res.firstName,res.lastName,"new name qry")
          console.log(res[0].FirstName,res[0].LastName,"Bnew arr name qry")
          console.log(res.FirstName,res.LastName,"Bnew name qry")
        localStorage.setItem('iifirstName', res[0].firstName);
        localStorage.setItem('iilastName', res[0].lastName);
        localStorage.setItem('iiimage', res[0].image);
      })
     
  }
   
  public userLogin(userstruct:User[]):any{
    this.http.post(this.urlString + '/ValidLogin', userstruct).pipe().subscribe(response => {
      if(response){  
        console.warn("loggin","obs")
        this.displayInfo = of(response)
        this.outUserDisplay = response
        this.displayInfo.subscribe(res=>{localStorage.setItem('iiuser',res[0].userName)
        localStorage.setItem('iifirstName',res[0].firstName)
        localStorage.setItem('iilastName',res[0].lastName)
        localStorage.setItem('iiimage',res[0].image) 
        
      })
      this.loggedIn = true
      return response
        //localStorage.setItem('iiuser',JSON.stringify(response)) 
        //this.route.navigate(['/userprofile']); //return to profile page
      }else if(response == null){
        confirm("user not found or password doesnt match");
      }
      return null;
    }) 
  }//end method

  public userLogout(){
    this.loggedIn = false;
    localStorage.clear();
    //this.route.navigate(['/login']);
  }

  public userRegist(userstruct:User[]){
    this.http.post(this.urlString + '/RegistUser', userstruct).pipe().subscribe(response => {
      console.log('post regist', response)})//end post subscribe
  }
  
  public userRegistImage(image: HTMLInputElement,userstruct:User[]){
    const imageFormData = new FormData();
    this.uploadedImage = image.files?.item(0)  

    if(userstruct[0].UserName != undefined && userstruct[0].Password != undefined && userstruct[0].FirstName != undefined){
    imageFormData.append('userName', userstruct[0].UserName);
    imageFormData.append('password', userstruct[0].Password);
    imageFormData.append('FirstName', userstruct[0].FirstName);
    if(userstruct[0].LastName == undefined){
      imageFormData.append('LastName', '');
    }else {imageFormData.append('LastName', userstruct[0].LastName);}
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);  
  }
    console.warn(imageFormData.get('userName'),imageFormData.get('password'),imageFormData.get('firstName'),imageFormData.get('lastName'),imageFormData.get('image'))
    //! dont delete
    this.xml.open("POST",this.urlString+ '/Both')
    this.xml.send(imageFormData)  
    //! dont delete
    // this.http.post(this.urlString+ '/UploadImage',imageFormData).pipe().subscribe(res => {
    //   console.log('post image',res)
    // })
  }

  //todo add editprofile
  public editProfile(image: HTMLInputElement,userstruct:User[]){
    const imageFormData = new FormData();
    this.uploadedImage = image.files?.item(0)   
    if(userstruct[0].UserName != undefined && userstruct[0].Password != undefined && userstruct[0].FirstName != undefined){
    imageFormData.append('userName', userstruct[0].UserName);
    imageFormData.append('password', userstruct[0].Password);
    imageFormData.append('firstName', userstruct[0].FirstName);
    if(userstruct[0].LastName == undefined){
      imageFormData.append('lastName', '');
    }else {imageFormData.append('lastName', userstruct[0].LastName);}
    imageFormData.append('image', this.uploadedImage, this.uploadedImage.name);  
  }
    //console.log("service edit")
    //console.warn(imageFormData.get('userName'),imageFormData.get('password'),imageFormData.get('firstName'),imageFormData.get('lastName'),imageFormData.get('image'))
    this.xml.open("POST",this.urlString+ '/EditUser')
    this.xml.send(imageFormData) 


    var res = this.xml.responseXML
    if(res){
      console.log(res,"res from responseXML")
    }else{
      console.log(res,"res from xml not pass responseXML")
    } 

    var qres = this.xml.responseText
    if(qres){
      console.log(qres,"res from xml")
    }else{
      console.log(qres,"res from xml not pass")
    }  
    qres = this.xml.responseType
    if(qres){
      console.log(qres,"res from xmlType")
    }else{
      console.log(qres,"res from xml not passType")
    }  
    
    
  } 

  public getUserCurr(){
    return this.outUserDisplay
  }

  public resbod(){
    return this.displayInfo
  }

  public return2():number{
    return 2
  }
  
  public pagenav(pagename:string){
    //login 1
    //regist 2
    //pro 3
    if(pagename == 'login')return 1
    else if(pagename == 'regist')return 2
    return 3
  }

}
