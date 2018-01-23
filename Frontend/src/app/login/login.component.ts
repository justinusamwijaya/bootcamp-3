import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Http,RequestOptions,Headers} from "@angular/Http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  verified = false
  checkboxValue:boolean
  constructor(private ht:Http,private roo:Router) { }

  ngOnInit() {
  }
  check(){

    if(!this.checkboxValue)
      {
        this.verified = false;
        console.log(this.verified)

      }
      else if(this.checkboxValue)
      {
        this.verified= true;
        console.log(this.verified)
        //actually this else part shouldn't be needed
      }
  }
  login(x:NgForm){
    let mai = {
      Name:x.value.nameoremail,
      Password:x.value.password,
      howlong:this.verified
    }
    let options = new RequestOptions({headers:new Headers({"Content-Type":"application/json"})})
    if(x.value.nameoremail.split("@").length>1){
      this.ht.post("http://localhost:3000/user/loginemail",mai,options)
      .subscribe(
        result=>{
          console.log(result.json())
          localStorage.setItem("token",result.json().token)
          this.roo.navigate(["main"])
        },
        error=>{
          console.log(error)
        }
      )
    }else{
      this.ht.post("http://localhost:3000/user/login",mai,options)
      .subscribe(
        result=>{
          console.log(result.json())
          localStorage.setItem("token",result.json().token)
          this.roo.navigate(["main"])
        },
        error=>{
          console.log(error)
        })
    }
  }

}
