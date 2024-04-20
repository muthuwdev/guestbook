import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmPasswordValidator } from '../../validators/confirm-password';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export default class ResetComponent implements OnInit{

  fb =inject(FormBuilder);
  authService=inject(AuthService);
  activatedRoute =inject(ActivatedRoute);
  router=inject(Router);
  resetForm!: FormGroup;
  token!:string;

  ngOnInit(): void {
    this.resetForm = this.fb.group({
      password:['',Validators.required],
      confirmPassword:['',Validators.required],
    },    {
      validator: confirmPasswordValidator('password', 'confirmPassword')
    });
    this.activatedRoute.params.subscribe(val=>{
      this.token = val['token'];
      console.log(this.token);
    });
  }
  reset(){
    // console.log(this.resetForm.value);
    // console.log(this.resetForm.value);
    let resetObj = {
      token:this.token,
      password:this.resetForm.value.password
    }
    console.log('rrrrrrrrrrrrrrrrrrr'+JSON.stringify(resetObj));
    this.authService.resetPasswordService(resetObj)
    .subscribe({
      next:(res)=>{
        alert(res.message);
        this.resetForm.reset();
        this.router.navigate(['login']);
      },error:(err)=>{
        console.log(err.error);
      }
    });
  }
}
