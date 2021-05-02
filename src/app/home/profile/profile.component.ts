import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Service/login.service';
import { TrackerService } from 'src/app/Service/tracker.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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

  constructor(private ser:LoginService,private tracker:TrackerService) { 
   
    this.tracker.dataName.subscribe(e=>{
      this.userId=e;
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


}
