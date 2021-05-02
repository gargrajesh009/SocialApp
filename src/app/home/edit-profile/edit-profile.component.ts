import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../Service/login.service';
import { TrackerService } from '../../Service/tracker.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userName:any;
  user:any;
  sUser:any;
  editProfile: FormGroup;
  name:any;
  img1:any;
  img2:any;
  emailId:any;
  bio1:any;
  bio2:any;
  switcher=true;


  constructor(private ser:LoginService,private router:Router,private tracker:TrackerService) {
    this.tracker.dataName.subscribe(name => 
      {
        this.userName = name;
        this.ser.getUser(this.userName).subscribe(e=>{
          this.user=e;
          this.name=this.user.name;
          this.emailId=this.user.mailID;
          this.bio1=this.user.bio;
          this.bio2="Write something about yourself....";
          this.img1=this.user.profilePic;
          this.img2="Paste the image URL here";
          console.log(this.sUser)
          
        
        })
      })
      
      

   }

  ngOnInit(): void {
    this.editProfile=new FormGroup({
      img:new FormControl(),
      name:new FormControl(),
      emailID:new FormControl(),  
      bio:new FormControl()  
    });
  }

  onSubmit(data:any){
    if(data.img==null)
    data.img=this.img1;
    if(data.name==null)
    data.name=this.user.name;
    if(data.emailID==null)
    data.emailID=this.user.mailID;
    if(data.bio==null)
    data.bio=this.user.bio;
    this.sUser = { name: data.name, userName: this.user.userName, pwd:this.user.pwd, dob:this.user.dob, mailID:data.emailID,profilePic:data.img,bio:data.bio,lastUpdate:this.user.lastUpdate}
    console.log(this.sUser);
    this.ser.updateUser(this.sUser).subscribe(e=>{
      console.log("update started")},
      (error)=>{console.log(error),alert("try again")},
      ()=>{console.log("update successful");alert("Successfully update");this.router.navigate(['/profile']);}      
    )
    
  }

  pic(){
    if(this.switcher)
    {
      document.getElementById("abc1").style.display = "initial";
      document.getElementById("abc2").style.display = "initial";
      document.getElementById("abc3").style.display = "none";
      this.switcher=false;
    }
    else{
      document.getElementById("abc1").style.display = "none";
      document.getElementById("abc2").style.display = "none";
      document.getElementById("abc3").style.display = "initial";
      this.switcher=true;
    }
    

    
  }

}
