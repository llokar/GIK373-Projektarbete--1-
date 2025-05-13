const labels = ['Avesta', 'Borlänge', 'Falun', 'Hedemora', 'Ludvika', 'Säter', 'Mora'];
const datasets = [
    {
        label: 'Befolkning 2023',
        data: [22753, 51735, 59986, 15345, 26402, 11243, 20536]
    }
];

const data = {
    labels: labels,
    datasets: datasets
};
const config = { type: 'bar', data, options: {}};

const canvas = document.getElementsById('myChart');
const myChart = new CharacterData(canvas, config);