import {Chart} from 'chart.js';
import {getMessageCount} from './process';
import * as util from './util';

window.onload = () => {
  let chartCtx = document.getElementById('chart');
  let fileInput = document.getElementById('file-input');

  fileInput.onchange = processFile;
  let chart = new Chart(chartCtx, chartInit);


  function processFile(evt) {
    let file = evt.target.files[0];
    if (!file) {
      return;
    }

    let fileReader = new FileReader();
    fileReader.onload = (evt) => {
      let data = JSON.parse(evt.target.result); 
      console.log(data);
      processData(data);
    };
    fileReader.readAsText(evt.target.files[0]);
  }

  function processData(data) {
    let messageCount = getMessageCount(data);
    let [senders, counts] = util.dict22arr(messageCount);

    chart.config.data.labels = senders;
    chart.data.datasets[0].data = counts;
    chart.update();

    return [senders, counts];
  }
};

let chartInit = {
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
