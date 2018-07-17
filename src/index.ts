import {Convo} from './convo';
import {Message} from './message';
import {getMessageCount} from './process';
import * as util from './util';
import {Chart} from 'chart.js';

window.onload = () => {
  let messageCountChartCtx = document.getElementById('message-count-chart');
  let tokenCountChartCtx = document.getElementById('token-count-chart');
  let fileInput = document.getElementById('file-input');

  fileInput.onchange = processFile;
  let messageCountChart = new Chart(messageCountChartCtx, chartInit());
  let tokenCountChart = new Chart(tokenCountChartCtx, chartInit());

  function processFile(evt) {
    let file = evt.target.files[0];
    if (!file) {
      return;
    }

    let fileReader = new FileReader();
    fileReader.onload = (evt) => {
      let data = JSON.parse(evt.target.result); 
      console.log('JSON loaded');
      const convo = new Convo(data);
      console.log('Convo created');
      processConvo(convo);
    };
    fileReader.readAsText(evt.target.files[0]);
  }

  function processConvo(convo) {
    let messageCount = convo.getMessageCount();
    let [senders, messageCounts] = util.dict22arr(messageCount);
    messageCountChart.config.data.labels = senders;
    messageCountChart.data.datasets[0].data = messageCounts;
    messageCountChart.update();

    let tokenCount = convo.getTokenCount();
    let tokenCounts = util.dict22arr(tokenCount)[1];
    tokenCountChart.config.data.labels = senders;
    tokenCountChart.data.datasets[0].data = tokenCounts;
    tokenCountChart.data.datasets[0].label = 'Total words';
    tokenCountChart.update();

  }
};


let chartInit = () => return {
  type: 'bar',
  data: {
    labels: ["Red", "Blue", "Yellow", "Green"],
    datasets: [{
      label: 'Total messages',
      data: [12, 19, 3, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
}
