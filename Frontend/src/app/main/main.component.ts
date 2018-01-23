import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {Http,RequestOptions,Headers} from "@angular/Http";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  makan=true
  constructor(private http:Http,private route:Router) { }

  ngOnInit() {
    const token = localStorage.getItem("token")
    console.log(token)
    if(!token){
      this.route.navigate(["/"])
    }
    else {
      let header =new RequestOptions({headers : new Headers({"Authorization":"Bearer " + token})})
      this.http.post("https://localhost:3000/authenticate",{},header)
      .subscribe(
        result =>{
        },
        error =>{
          localStorage.removeItem("token");
          this.route.navigate(["/"])
      })
    }
  }

}
