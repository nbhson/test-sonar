import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css'],
})
export class ImageDetailComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ImageDetailComponent>, @Inject(MAT_DIALOG_DATA) public product: Product) {}

  ngOnInit() {}
}
