import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Service/login.service';
import { TrackerService } from 'src/app/Service/tracker.service';

@Component({
  selector: 'app-app-profile',
  templateUrl: './app-profile.component.html',
  styleUrls: ['./app-profile.component.css']
})
export class AppProfileComponent implements OnInit {
  flag=false;
  track:any;
  userId:any;
  feedPost1:any;
  feedPost2:any;
  curName:any;
  curId:any;
  user:any;
  bio:any;
  img:any;
  follower: any;
  followerCount: any;
  following:any;
  followingCount:any;
  post:any;
  postCount:any;
  followStatus=false;
  curUser:any;
  obj1:any;
  constructor(private tracker:TrackerService,private ser:LoginService,private router:Router) {
    this.tracker.dataName.subscribe(e=>{
      this.curUser=e;

  
    
    this.tracker.dataName2.subscribe(e=>{
      this.userId=e;
      if(this.userId=='')
      this.router.navigate(['/profile/feed']);
      this.ser.getPosts(this.userId).subscribe(e=>{
        this.feedPost1=e;      
        this.ser.getUser(this.userId).subscribe(e=>{
          this.user=e;
          this.curName=this.user.name;
          this.curId=this.user.userName;
          this.bio=this.user.bio;
          this.img=this.user.profilePic;
        })
        this.ser.getFollower(this.userId).subscribe(e =>
          {
            this.follower=e;     
            for (let i = 0; i < this.follower.length; i++) {
              let cur=this.follower[i].toLowerCase();
             
              
              if(this.follower[i]==this.curUser)
              this.followStatus=true;

            }                
            this.followerCount=this.follower.length;                                    
            
          })
        this.ser.getFollowing(this.userId).subscribe(e=>
          {
            this.following=e;    
            this.followingCount=this.following.length;      
          }) 
        this.ser.getPosts(this.userId).subscribe(e=>
          {
            this.post=e;
            this.postCount=this.post.length;
            console.log("posts "+this.post)
            if(this.postCount==0)
            this.flag=true;
          })   
      })
      
    })
  })
   }

  ngOnInit(): void {
  }
  fun(image:any){
    var modal = document.getElementById("myModal");
    var img = document.getElementById("myImg");
    var modalImg = document.getElementById("img01");
    modal.style.display = "block";
    (<HTMLImageElement>modalImg).src = image.src;
        
  }

  fun2(){
    var modal = document.getElementById("myModal");
    modal.style.display = "none";

  }

  unFollowMethod(){
      let a:string;
      a=this.userId+";"+this.curUser;
      this.ser.delFollower(a).subscribe(e=>{
        console.log("Follower Deletion Started")},
        (error)=>console.log("failed"),
        ()=> {console.log("Deleted added"),this.followStatus=false;this.followerCount-=1;this.reloadComponent()}
      )

    
  }
  followMethod(){
    this.obj1={ userName: this.userId, followerUN: this.curUser,prox:""}
    this.ser.addFollower(this.obj1).subscribe(e=>{
      console.log("Follower Addition started")} ,
      (error)=> console.log("post failed"),     
      () => {console.log("Successfully added as follower"),this.followStatus=true;this.followerCount+=1;this.reloadComponent()  }
    )
    

  }
  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }
  
  


}
