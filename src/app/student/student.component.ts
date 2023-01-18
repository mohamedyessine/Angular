import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './student.model';


@Component({
  selector: 'app-student', 
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
     
  studentValue!:FormGroup;
  studentObj:StudentModel= new StudentModel;
  studentList:any;
  btnSaveShow:boolean=true;
  btnUpdateShow:boolean=false;

  constructor(private formBuilder: FormBuilder, private api: ApiService ) { }

  ngOnInit(): void{
       this.studentValue = this.formBuilder.group({
        name:[''],
        class:[''],
        email:[''],
        mobile:['']
       })
       this.AllStudent();
  }
  AddStudent(){
      this.studentObj.name = this.studentValue.value.name;
      this.studentObj.class = this.studentValue.value.class;
      this.studentObj.mobile = this.studentValue.value.mobile;
      this.studentObj.email = this.studentValue.value.email;

      this.api.postStudent(this.studentObj).subscribe({
        next: (v) => {
        console.log(v)
      },
      error: (e) =>{
        alert("Error")
        console.log(e)       
      },
      complete: () => {
        console.log("Student record added!")
        alert("Student record added!")
        this.AllStudent();
        //this.studentValue.reset();
      }
    })
  }
    AllStudent(){
         this.api.getStudent().subscribe(res => {
          this.studentList = res;
         })
    }
  deleteStudent(data:any){
    this.api.deleteStudent(data.id).subscribe(
      
      {next: (v) => {
      console.log(v)
    },
    error: (e) =>{
      alert("Error")
      console.log(e)       
    },
    complete: () => {
      console.log("Student record deleted!")
      alert("Student record deleted!")
      this.AllStudent();
    }
    })
  }
  editStudent(data:any){
    this.studentValue.controls["name"].setValue(data.name);
    this.studentValue.controls["class"].setValue(data.class);
    this.studentValue.controls["email"].setValue(data.email);
    this.studentValue.controls["mobile"].setValue(data.mobile);
    this.studentObj.id = data.id;
    this.showUpdate();
  }

  UpdateStudent(){
    this.studentObj.name = this.studentValue.value.name;
    this.studentObj.class = this.studentValue.value.class;
    this.studentObj.mobile = this.studentValue.value.mobile;
    this.studentObj.email = this.studentValue.value.email;

    this.api.putStudent(this.studentObj, this.studentObj.id).subscribe({
      next: (v) => {
      console.log(v)
    },
    error: (e) =>{
      alert("Error")
      console.log(e)       
    },
    complete: () => {
      console.log("Student record apdated!")
      alert("Student record apdated!")
      this.AllStudent();
      this.studentValue.reset();
      this.showSave();
      this.studentObj.id = 0;

    }
  })
}
showSave(){
  this.btnSaveShow=true;
  this.btnUpdateShow=false;
}
showUpdate(){
  this.btnSaveShow=false;
  this.btnUpdateShow=true;
}
}
