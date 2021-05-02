import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TrackerService } from '../Service/tracker.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user:any;
  constructor(private router:Router,private tracker:TrackerService)
  {

  }
  canActivate(){
    this.tracker.dataName.subscribe(e=> this.user=e)
    if(this.user=='')
    {
      alert('Access Denied.. Redirecting to Login Page...')
      this.router.navigate(['/login']);
      return false;
    }

    return true;
    
  }
  
}
