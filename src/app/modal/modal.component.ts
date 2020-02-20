import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LessonComponent } from '../lesson/lesson.component'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  addedItems = [];
  error: boolean = false;

  constructor(public LessonComponent: LessonComponent) { }

  itemForm = new FormGroup({
    Topic: new FormControl(''),
    Date: new FormControl(''),
    Lecturer: new FormControl(''),
  });

  getItems() {
    if (this.itemForm.value.Topic !== "" && this.itemForm.value.Date !== "" && this.itemForm.value.Lecturer !== "") {

      this.error = false;
      let itemObj = {
        "topic": this.itemForm.value.Topic,
        "date": this.itemForm.value.Date,
        "lecturer": this.itemForm.value.Lecturer,
        "edit": false
      };

      this.addedItems.push(itemObj);
      localStorage.setItem("array", JSON.stringify(this.addedItems));
      this.itemForm.reset();
      this.LessonComponent.modalWindow = false;
      this.LessonComponent.itemArray = JSON.parse(localStorage.getItem("array"));
    } else {
      this.error = true;
    }
  }

  closeModal() {
    this.LessonComponent.modalWindow = false;
  }

  ngOnInit(): void {
    console.log(this.LessonComponent.modalWindow);
    this.addedItems = JSON.parse(localStorage.getItem("array"));
  }

}
