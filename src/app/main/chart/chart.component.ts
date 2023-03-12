import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-main-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class MainChartComponent implements OnInit, OnChanges {
  @Input() model: any;

  public chart: any;

  private isOkToDraw = false;

  private handledModel = [];

  constructor() {
    // not to do
  }

  private drawChart() {
    const { chart, handledModel } = this;
    if (!chart || !handledModel) return;

    try {
      const labelsHandle: string[] = [];
      const colorsHandle: string[] = [];
      const volumeHandle: number[] = [];
      const closeHandle: number[] = [];
      handledModel.map(({ label, color, volume, close }) => {
        labelsHandle.push(label || '');
        colorsHandle.push(color || '');
        volumeHandle.push(volume || 0);
        closeHandle.push(close || 0);
        return null;
      });

      const barDataSet = {
        label: 'Sales',
        data: volumeHandle,
        backgroundColor: colorsHandle,
        order: 1
      };
      chart.data.labels = labelsHandle;
      chart.data.datasets.push(barDataSet);

      const lineDataset = {
        label: 'Teste',
        data: closeHandle,
        backgroundColor: 'blue',
        order: 0,
        type: 'line',
        yAxisID: 'yAxis'
      };
      chart.data.datasets.push(lineDataset);

      chart.update();
    } catch (e) {
      console.log(e);
    }
  }

  private createChart() {
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });

    /* this.chart = new Chart('MyChart', {
      type: 'bar', // this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: [
          '2022-05-10',
          '2022-05-11',
          '2022-05-12',
          '2022-05-13',
          '2022-05-14',
          '2022-05-15',
          '2022-05-16',
          '2022-05-17'
        ],
        datasets: [
          {
            label: 'Sales',
            data: [
              36726900, 35839000, 72554100, 44115700, 61085700, 38608500, 73913400, 64409100,
              76250600, 130248100, 109257700, 124516200, 87591800, 50227400, 59052500, 66220400,
              68042300, 38557700
            ],
            backgroundColor: ['blue', 'red', 'yellow']
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    }); */
  }

  /* private drawChart() {
    const { isOkToDraw, data } = this;
    if (!isOkToDraw) return;
    console.log('data');
    console.log(data);

    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'date');
    dataTable.addColumn('number', 'open');
    dataTable.addColumn('number', 'close');
    dataTable.addColumn('number', 'volume');
    dataTable.addColumn('number', 'day');
    dataTable.addColumn({ type: 'string', role: 'style' });
    // dataTable.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
    dataTable.addRows(data);

    //const cData = google.visualization.arrayToDataTable([
    //  [
    //    'date',
    //    'open',
    //    'close',
    //    'volume',
    //    'day',
    //    { role: 'style' },
    //    { role: 'tooltip', p: { html: true } }
    //  ],
    //  ...data
    //]);

    google.visualization.events.addListener(dataTable, 'click', () => {
      console.log('oi');
    });

    const view = new google.visualization.DataView(dataTable);
    view.setColumns([
      {
        type: 'string',
        calc(dataTable: any, rowNr: any) {
          const value = dataTable.getValue(rowNr, 4);
          return `${value}`;
        }
      },
      3,
      5,
      2
    ]);

    const chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    chart.draw(view, {
      title: 'xx',
      vAxis: { format: 'short' },
      legend: 'none',
      orientation: 'horizontal',
      seriesType: 'bars',
      width: `100%`,
      series: {
        1: {
          pointSize: 8,
          type: 'line',
          color: '#1286E0',
          targetAxisIndex: 2
        }
      },
      animation: {
        duration: 1000,
        easing: 'in'
      },
      dataOpacity: 0.3,
      focusTarget: 'category',
      tooltip: { isHtml: true }
    });
  } */

  ngOnInit() {
    // google.charts.load('current', { packages: ['corechart'], language: 'pt' });
    // google.charts.setOnLoadCallback(() => {
    //  this.isOkToDraw = true;
    //  this.drawChart();
    // });
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { handledModel } = this;
    // eslint-disable-next-line dot-notation
    const model = changes?.['model'] as any;
    if (model) {
      const { currentValue } = model;
      if (currentValue && handledModel !== currentValue) {
        this.handledModel = currentValue;
        this.drawChart();
      }
    }
  }
}
