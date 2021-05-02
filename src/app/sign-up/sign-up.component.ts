import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5';
import { LoginService } from '../Service/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
 
  signForm:FormGroup;
  userList:any;
  user:any;
  msg:string="";
  i:any;
  curUser="";
  status1=false;
  status2=false;
  curPass="";
  curConfPass="";
  constructor(private ser:LoginService,private router:Router) {
    
   
  }
  

  ngOnInit(): void {
    this.signForm=new FormGroup({
      name:new FormControl("",Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z ]*$')])),
      userName:new FormControl("",Validators.compose([Validators.required,this.userNameExists])), 
      dob:new FormControl("",Validators.compose([Validators.required,this.ageValidityB,this.ageValidityA])),
      mailID:new FormControl("",[Validators.required,Validators.pattern('[a-zA-Z0-9]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+')]),
      pwd: new FormControl("",Validators.compose([Validators.required,this.pwValidator])),
      pwdrepeat:new FormControl("",Validators.compose([Validators.required,this.confPassValidator1]))
    });
  }

  myFunction(){
    this.status1=false;
    this.ser.getUsers().subscribe(e=>
      {  
        this.userList=e;

        for (let i = 0; i < this.userList.length; i++) {
          if((this.curUser.toLowerCase())==(this.userList[i].userName.toLowerCase()))
              this.status1=true;  
        }
  });

    
  }
  
  
  onSubmit(data: any) {
    if(!this.status1 && !this.status2)
    {   
      
      var today = new Date();
      let passHash = this.hash(data.pwd);
      this.user = { name: data.name, userName: data.userName, pwd:passHash, dob:data.dob, mailID:data.mailID,profilePic:'data:image/png;base64,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',bio:data.bio,lastUpdate:today}
      this.ser.postUser(this.user).subscribe((e: any) => {console.log("Post started");console.log(this.user)}, (e: any) => {console.log(e);alert("Try Again")}, () => {console.log("Post Successful");alert("Sign Up Successful !!... Redirecting to login page");this.router.navigate(['/login']);  })
      
        
    }
    else
    {
      alert("Invalid Input Try Again")
    }

  }

  hash(data: any) {
    const md5 = new Md5();
    let passHash = md5.appendStr(data).end();
    return passHash;
  }

  ageValidityA(c:any){
    if(!c.value){
      return null;
    }
    let pwd=c.value;
    let year=""+pwd[0]+pwd[1]+pwd[2]+pwd[3];
    let curYear=(new Date()).getFullYear();
    if(curYear-parseInt(year)<18)
    return {'statusA':true}    
    return null  
    

  }
  ageValidityB(c:any){
    if(!c.value){
      return null;
    }
    let pwd=c.value;
    let year=""+pwd[0]+pwd[1]+pwd[2]+pwd[3];
    let curYear=(new Date()).getFullYear();
    if(curYear-parseInt(year)>200 || parseInt(year)>curYear)
    return {'statusB':true}
    else
    return null  
  }

   userNameExists(c:any){   
    if(!c.value){
      return null;
    }
    if(status)
    return {'status1':true}

   return null;
  } 

 
  pwValidator(c:any){       
    if(!c.value){
        return null;
    }
    let pwd=c.value;
    if(pwd.length>=8)
    return null
    else
    return {'status':true}
  }
  confPassValidator1(c:any){   
    return null;
} 

  confPassValidator(){
    this.status2=false;
    if(this.curConfPass!=this.curPass)
    this.status2=true;

  }



 
}