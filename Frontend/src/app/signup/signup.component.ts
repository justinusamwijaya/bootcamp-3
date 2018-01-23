import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Http,RequestOptions,Headers} from "@angular/Http";

declare var $:any
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

checker = ""
verified =false
checkboxValue:boolean;
  constructor(private ht:Http,private roo:Router) { }

  ngOnInit() {

  }

  checkbox(){

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
  signup(x:NgForm){

    let newObj={
      Name:x.value.name,
      Email:x.value.email,
      Password:x.value.password
    }
    let option = new RequestOptions({headers:new Headers({"Content-Type":"application/json"})})
    let yey = x.value.name.split("@")
    let woo = x.value.email.split("@")
      if (yey.length > 1||woo.length<2||x.value.name==""||x.value.email==""||x.value.email==""){
        this.checker= "ada kesalahan dalam pengisian form, mohon dicek lagi"
      }      
      else if(this.verified==false){
        this.checker="mohon dicentang"
      }
      else{
        this.checker=""
        this.ht.post("http://localhost:3000/user/signup",newObj,option)
        .subscribe(
          result=>{
            console.log(result.json())
            x.reset()
            this.roo.navigate([""])
          },
          error=>{
            console.log(error)
          })
      }

 
  }

}
