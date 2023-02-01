import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.scss'],
})
export class DialogWindowComponent implements OnInit {
  myForm: FormGroup = new FormGroup({
    id: new FormControl(this.data?.id ?? null),
    title: new FormControl(this.data?.title ?? ''),
    price: new FormControl(this.data?.price ?? ''),
    color: new FormControl(this.data?.color ?? ''),
    memory: new FormControl(this.data?.memory ?? ''),
    processor: new FormControl(this.data?.processor ?? ''),
    display: new FormControl(this.data?.display ?? ''),
    camera: new FormControl(this.data?.camera ?? ''),
  });

  constructor(
    public dialogRef: MatDialogRef<DialogWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data) this.isNew = false;
  }

  isNew: boolean = true;

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.data = {
      id: this.myForm.value.id,
      title: this.myForm.value.title,
      price: this.myForm.value.price,
      color: this.myForm.value.color,
      image: 'assets/images/Iphone 14 Pro Max 256.jpeg',
      memory: this.myForm.value.memory,

      configure: {
        processor: this.myForm.value.processor,
        display: this.myForm.value.display,
        camera: this.myForm.value.camera,
      },
    };

    this.dialogRef.close(this.data);
  }

  ngOnInit() {}
}
