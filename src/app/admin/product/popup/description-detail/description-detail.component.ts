import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-description-detail',
  templateUrl: './description-detail.component.html',
  styleUrls: ['./description-detail.component.scss'],
})
export class DescriptionDetailComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DescriptionDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,
  ) {}

  ngOnInit() {}
}
