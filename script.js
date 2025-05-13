const labels = [
    'Avesta',
  'Borlänge',
  'Falun',
  'Hedemora',
  'Ludvika',
  'Säter',
  'Mora',
  'Älvdalen',
  
];

const datasets = [
    { 
        label: 'Befolkning 2024', 
        data: [22932, 52178, 59818, 15443, 26353, 11271, 20679, 10345],
        backgroundColor: "rgba(145, 35, 223, 0.4)",
        borderColor: "rgb(235, 103, 213)",
        borderWidth: 2,
        hoverBackgroundColor: "rgba(92, 56, 221, 0.4)",
    },
    { 
        label: 'Befolkning 2024', 
        data: [22932, 52178, 59818, 15443, 26353, 11271, 20679, 10345],
    }
];

const config = {
    type: 'bar',
    data: { labels: labels, datasets: datasets},
    options: {}
};

const canvas = document.getElementById('myChart');
const myChart = new Chart(canvas, config);

const config2 = {
    type: 'line',
    data: {
        labels: [2022, 2023],
        datasets: [
            {
            label: "Borlänge", 
            data: [52178, 51735]
        },
        {
            label: 'Falun',
            data: [59818, 59986]
            }
        ]
    }
}
const overYear = new Chart(document.getElementById("overYear"), config2);