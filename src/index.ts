import {Chart} from 'chart.js';

window.onload = () => {
  let chartCtx = document.getElementById('chart');
  let fileInput = document.getElementById('file-input');

  fileInput.onchange = processFile;
  
  let chart = new Chart(chartCtx, {
    type: 'bar',
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
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
    
  });
};

function processFile(evt) {
  let file = evt.target.files[0];
  if (!file) {
    return;
  }

  let fileReader = new FileReader();
  fileReader.onload = (evt) => {
    let data = JSON.parse(evt.target.result); 
    console.log(data);
  };
  fileReader.readAsText(evt.target.files[0]);
}
