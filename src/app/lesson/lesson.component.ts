import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {

  itemArray: any = [];
  modalWindow: boolean = false;

  constructor() { }

  editForm = new FormGroup({
    topic: new FormControl(''),
    date: new FormControl(''),
    lecturer: new FormControl(''),
  });

  addItem() {
    this.modalWindow = true;
  }

  deleteItem(i) {
    this.itemArray.splice(i, 1);
    localStorage.clear();
    localStorage.setItem("array", JSON.stringify(this.itemArray));
  }

  editItem(i) {
    this.editForm.controls['topic'].patchValue(this.itemArray[i].topic);
    this.editForm.controls['date'].patchValue(this.itemArray[i].date);
    this.editForm.controls['lecturer'].patchValue(this.itemArray[i].lecturer);
    this.itemArray[i].edit = true;
  }

  saveItem(i) {
    this.itemArray[i].date = this.editForm.value.date;
    this.itemArray[i].lecturer = this.editForm.value.lecturer;
    this.itemArray[i].topic = this.editForm.value.topic;
    this.itemArray[i].edit = false;
    localStorage.setItem("array", JSON.stringify(this.itemArray));
  }

  ngOnInit(): void {
    if (localStorage.getItem("array")) {
      this.itemArray = JSON.parse(localStorage.getItem("array"));
    }
  }

}
