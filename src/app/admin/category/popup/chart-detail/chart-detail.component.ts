import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../model/category.model';

@Component({
  selector: 'app-chart-detail',
  templateUrl: './chart-detail.component.html',
  styleUrls: ['./chart-detail.component.scss'],
})
export class ChartDetailComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public categories: Category[]) {}

  ngOnInit() {}
}
