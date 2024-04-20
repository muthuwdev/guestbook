import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BrowserStorageService } from '../../services/browserstorage.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

authService=inject(AuthService);
browserStorageService=inject(BrowserStorageService);
isLoggedIn : boolean = false;

ngOnInit(): void {
  this.authService.isLoggedIn$.subscribe(res=>{
    this.isLoggedIn = this.authService.isLoggedIn();
  })
}

logout(){
  localStorage.removeItem("user_id");
  this.authService.isLoggedIn$.next(false);
}
}
