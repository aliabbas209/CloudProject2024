import { Component, ViewChild } from '@angular/core';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartData,
  ChartOptions,
  ChartType,
} from 'chart.js';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [NgChartsModule],
})
export class HomeComponent {
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        data: [1000, 500, 80, 1500, 56, 55, 40],
        label: 'Sale',
        fill: true,
        tension: 0.5,
        borderColor: 'blue',
        backgroundColor: 'rgba(255,255,0,0.3)',
      },
      {
        data: [400, 300, 600, 200, 56, 55, 40],
        label: 'Sale',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend = true;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // bar chart configurations
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Users',
      },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Sale' },
    ],
  };

  chartClick(event: any) {
    console.log(event);
  }

  dynamicChange(event: any) {
    // console.log('change click');
    // this.lineChartData.labels?.push('Aug');
    // this.lineChartData.datasets.push({
    //   data: [1100, 500, 1200, 1500, 56, 55, 40, 1800],
    //   label: 'Sale',
    //   fill: true,
    //   tension: 0.5,
    //   borderColor: 'blue',
    //   backgroundColor: 'rgba(2,255,150,0.8)',
    // });
    // this.chart?.update();
  }
}
