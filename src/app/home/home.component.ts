import { rendererTypeName } from '@angular/compiler';
import { conditionallyCreateMapObjectLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Service/login.service';
import { TrackerService } from '../Service/tracker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: any;
  user: any
  curName:any;
  curId:any;
  follower:any;
  followerCount:any;
  following:any;
  followingCount:any;
  post:any;
  postCount:any;
  photo:any;
  caption:any;  
  userList:any;
  img:any;
 
  
  constructor(private ser: LoginService, private tracker: TrackerService,private router:Router) {
    this.tracker.dataName.subscribe(name => 
      {
        this.userName = name;
        this.ser.getUser(this.userName).subscribe(e =>
          {
            this.user = e;
            this.curName=this.user.name;
            this.curId=this.user.userName;
            this.img=this.user.profilePic;
            this.ser.getFollower(this.userName).subscribe(e =>
              {
                this.follower=e;
                this.followerCount=this.follower.length;                                    
                
              })
            this.ser.getFollowing(this.userName).subscribe(e=>
              {
                this.following=e;
                this.followingCount=this.following.length;      
              }) 
            this.ser.getPosts(this.userName).subscribe(e=>
              {
                this.post=e;
                this.postCount=this.post.length;
              })   
              this.ser.getUsers().subscribe(e=>
                {
                  this.userList=e;     
                          
                  
                })

            
          });
        
      });  
  }

  ngOnInit(): void {
  }
  saveCode(data:any){
    alert("hey")
  }
  
  logOut(){
    this.tracker.dataName.subscribe(e=>{
      this.tracker.dataName.next('');
      this.router.navigate(['/login']);

    })   
  }

  view(){
    this.router.navigate(['/myProfile']);
  }
  edit(){
    this.router.navigate(['/editProfile']);
  }
  addPhoto(){
    this.router.navigate(['/addPic']);
  }
 

  openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "0px";
  }

  closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }


}
