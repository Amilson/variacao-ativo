import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-variation-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class VariationChartComponent implements OnInit, OnChanges {
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

    chart.data.labels = [];
    chart.data.datasets = [];
    chart.update();

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
      data: volumeHandle,
      backgroundColor: colorsHandle,
      order: 1,
      fill: false
    };
    chart.data.labels = labelsHandle;
    chart.data.datasets.push(barDataSet);

    const lineDataset = {
      data: closeHandle,
      borderColor: 'blue',
      backgroundColor: 'blue',
      order: 0,
      type: 'line',
      yAxisID: 'yAxis',
      pointRadius: 0,
      pointHoverRadius: 10
    };
    chart.data.datasets.push(lineDataset);
    chart.update();
  }

  private createChart() {
    const customScale = {
      id: 'customScale',
      beforeDraw(chart: any, args: any, pluginOptions: any) {
        const {
          ctx,
          chartArea: { top },
          scales: { x }
        } = chart;

        ctx.save();
        x.ticks.forEach((tick: any, index: number) => {
          ctx.fillStyle = '#666';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const handled = `${tick.label}`.substring(0, 2);
          ctx.fillText(handled, x.getPixelForValue(tick.value), top + 10);
        });
      }
    };

    const getOrCreateTooltip = (chart: any) => {
      let tLegend = chart.canvas.parentNode.querySelector('#chart-legend');

      if (!tLegend) {
        tLegend = document.createElement('div');
        tLegend.id = 'chart-legend';
        tLegend.style.background = 'rgba(0, 0, 0, 0.7)';
        tLegend.style.borderRadius = '3px';
        tLegend.style.color = 'white';
        tLegend.style.opacity = 1;
        tLegend.style.pointerEvents = 'none';
        tLegend.style.position = 'absolute';
        tLegend.style.transform = 'translate(-50%, 0)';
        tLegend.style.transition = 'all .1s ease';
        chart.canvas.parentNode.appendChild(tLegend);
      }

      let tData = chart.canvas.parentNode.querySelector('#chart-data');

      if (!tData) {
        tData = document.createElement('div');
        tData.id = 'chart-data';
        tData.style.background = 'rgba(0, 0, 0, 0.7)';
        tData.style.borderRadius = '3px';
        tData.style.color = 'white';
        tData.style.opacity = 1;
        tData.style.pointerEvents = 'none';
        tData.style.position = 'absolute';
        tData.style.transform = 'translate(-50%, 0)';
        tData.style.transition = 'all .1s ease';
        chart.canvas.parentNode.appendChild(tData);
      }

      return [tLegend, tData];
    };

    const externalTooltipHandler = (context: any) => {
      try {
        const { chart, tooltip } = context;
        const dataSetIndex = tooltip.dataPoints[0].dataIndex;
        const { label, identifier, open, close, volume, variation, color } =
          this.handledModel[dataSetIndex];

        const [tooltipElLegend, tooltipElData] = getOrCreateTooltip(chart);

        if (tooltip.opacity === 0) {
          tooltipElLegend.style.opacity = 0;
          tooltipElData.style.opacity = 0;
          return;
        }

        const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
        tooltipElLegend.innerHTML = `
        <span>${identifier} - ${label}</span><br/>
        <span>Abertura: ${Number(open).toFixed(2)}</span><br/>
        <span style="color: #13B8EB">Fechamento: <strong>${Number(close).toFixed(
          2
        )}</strong></span><br/>
        <span>Variação: <span style="color:${color}"><strong>${Number(variation).toFixed(
          2
        )}</strong></span></span><br/>
        <span>Volume: R$ ${Number(volume).toLocaleString('pt-BR')}</span>`;

        tooltipElLegend.style.opacity = 1;
        tooltipElLegend.style['max-width'] = '300px';
        tooltipElLegend.style.left = `${positionX + 120}px`;
        tooltipElLegend.style.top = `${positionY + 10}px`;
        tooltipElLegend.style.font = tooltip.options.bodyFont.string;
        tooltipElLegend.style.padding = `${tooltip.options.padding}px ${tooltip.options.padding}px`;

        let handledX = 0;
        if (dataSetIndex === 0) {
          handledX = 25;
        } else if (dataSetIndex === this.handledModel.length - 1) {
          handledX = -25;
        }

        tooltipElData.innerHTML = `<strong>${label}</strong>`;
        tooltipElData.style.opacity = 1;
        tooltipElData.style.left = `${positionX + tooltip.caretX + handledX}px`;
        tooltipElData.style.top = `${positionY + positionY}px`;
        tooltipElData.style.font = tooltip.options.bodyFont.string;
        tooltipElData.style.padding = `${tooltip.options.padding}px ${tooltip.options.padding}px`;
      } catch (e) {
        // not to do
      }
    };

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
          },
          tooltip: {
            enabled: false,
            position: 'nearest',
            external: externalTooltipHandler
          }
        },
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          }
        }
      },
      plugins: [customScale]
    });
  }

  ngOnInit() {
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
