import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard-page',
  imports: [],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {
  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.renderLineChart();
    this.renderPieChart();
    this.renderBarChart();
  }

  private renderLineChart(): void {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Total Sales',
            data: [65, 59, 80, 81, 56, 55, 70],
            fill: false,
            borderColor: '#007bff',
            backgroundColor: '#007bff',
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }

  private renderPieChart(): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Coconut Water', 'Copra', 'Vinegar', 'Others'],
        datasets: [
          {
            data: [45, 25, 20, 10],
            backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
            hoverOffset: 20,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
        },
      },
    });
  }

  private renderBarChart(): void {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Sales (in tons)',
            data: [12, 19, 7, 15, 20, 13],
            backgroundColor: '#17a2b8',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }
}
