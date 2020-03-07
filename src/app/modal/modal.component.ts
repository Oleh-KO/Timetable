import { Component, OnInit, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LessonComponent } from '../lesson/lesson.component'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @ViewChildren('dateInput') dateInput: HTMLElement;

  addedItems = [];
  error: boolean = false;

  constructor(public LessonComponent: LessonComponent) { }

  patternDate = "(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"

  itemForm = new FormGroup({
    Topic: new FormControl(''),
    Date: new FormControl('', [Validators.required, Validators.pattern(this.patternDate)]),
    Lecturer: new FormControl(''),
  });

  getItems() {
    if (this.itemForm.value.Topic !== "" && this.itemForm.value.Date !== "" && this.itemForm.value.Lecturer !== "" && this.itemForm.valid) {
      this.error = false;
      let itemObj = {
        "topic": this.itemForm.value.Topic,
        "date": this.itemForm.value.Date,
        "lecturer": this.itemForm.value.Lecturer,
        "edit": false
      };

      console.log(itemObj, 'item');
      console.log(this.addedItems, 'array');


      this.addedItems = this.addedItems || [];
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
    this.addedItems = JSON.parse(localStorage.getItem("array"));
  }

}
