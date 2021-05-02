import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackerService } from './tracker.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url1='http://localhost:58702/api/';
  userId1:any

  constructor(private http:HttpClient,private tracker:TrackerService) { 
    this.tracker.dataName.subscribe(name => 
      {
        this.userId1 = name;
      })
  }
  getUser(userID:any){
    return this.http.get(this.url1+'appUser/'+userID)    
  }
  getUsers(){
    return this.http.get(this.url1+'appUser');    
  }

  postUser(user:any){
    return this.http.post(this.url1+'appUser',user);
  }

  getFollower(userID:any){
    return this.http.get(this.url1+'userFollowersCount/'+userID)
  }

  getFollowing(userID:any){
    return this.http.get(this.url1+'userFollowingCount/'+userID)
  }

  getPosts(userId:any){
    return this.http.get(this.url1+'userPostsCount/'+userId)
  }

  addPost(post:any){
    return this.http.post(this.url1+'userPostsPut',post);

  }

  updateUser(user:any){
    return this.http.put(this.url1+'appUser/'+this.userId1,user)
  }

  feedPost(userId:any){
    return this.http.get(this.url1+'feed/'+userId)
  }

  addFollower(user:any){
    return this.http.post(this.url1+'userFollowers',user)
  }

  delFollower(id1:any){
    return this.http.delete(this.url1+'userFollowers/'+id1)
  }

  addPostResponse(obj:any){
    return this.http.post(this.url1+'postResponses',obj)
  }

  getPostResponse(id:any){
    return this.http.get(this.url1+'postResponses/'+id)
  }


    

}
