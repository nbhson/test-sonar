import { Component, Input, OnInit } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { Category } from 'src/app/admin/category/model/category.model';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input() title: string;
  @Input() width: number;
  @Input() height: number;
  @Input() categorys: Category[];
  data: any[] = [];

  type = ChartType.PieChart;
  options = {
    chartArea: { width: '100%', height: '90%' },
    legend: 'none',
  };

  constructor() {}

  ngOnChanges(): void {
    this.categorys.forEach((category) => {
      this.data.push([category.name, category.couterProduct]);
    });
  }

  ngOnInit(): void {}
}
