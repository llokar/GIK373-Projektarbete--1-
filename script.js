/* 
Lovisa Wikberg h23lovwi
Lovisa Sandell h23losan
Louise Karlsson h23lokar 
*/

/* Eventlyssnare för mer-text-indikator i brödtexter */
document.addEventListener('DOMContentLoaded', function () {
  const textBlocks = document.querySelectorAll('.text-preview');

  textBlocks.forEach((text) => {
    text.addEventListener('click', () => {
      text.classList.toggle('expanded');
      text.classList.toggle('collapsed');
    });
  });
});

/* Graf: Grov kvinnofridskränkning anmälda vs lagförda */
const urlSCBAnmalda = 'https://api.scb.se/OV0104/v1/doris/sv/ssd/START/LE/LE0201/LE0201Våld/Tema613';
const urlSCBLagforda = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/LE/LE0201/LE0201Våld/Tema615";

const querySCBAnmalda = {
  "query": [
    {
      "code": "Tid",
      "selection": {
        "filter": "item",
        "values": [
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
          "2023"
        ]
      }
    }
  ],
  "response": {
    "format": "json"
  }
};

const querySCBLagforda = {
    "query": [
      {
        "code": "Huvudbrott",
        "selection": {
          "filter": "item",
          "values": ["06"]
        }
      },
      {
        "code": "Kon",
        "selection": {
          "filter": "item",
          "values": ["1"]
        }
      },
      {
        "code": "ContentsCode",
        "selection": {
          "filter": "item",
          "values": [
            "0000030T"
          ]
        }
      }
    ],
    "response": {
      "format": "json"
    }
  };

Promise.all([
  fetch(urlSCBAnmalda, {
    method: 'POST',
    body: JSON.stringify(querySCBAnmalda)
  }).then(response => response.json()),

  fetch(urlSCBLagforda, {
    method: 'POST',
    body: JSON.stringify(querySCBLagforda)
  }).then(response => response.json()),
]).then(([dataSCBAnmälda, dataSCBLagforda]) => {

  const labels = dataSCBAnmälda.data.map(year =>year.key[0]);
  const dataAnmalda = dataSCBAnmälda.data.map(year => Number(year.values[0]));
  
  const lagforda = {};
  dataSCBLagforda.data.forEach(year => {
    lagforda[year.key[2]] = Number(year.values[0]);
  });

  /* om värdet är null används 0 */
  const dataLagforda = labels.map(year => lagforda[year] || 0);
  const andelLagforda = dataLagforda.map (
    (Lagforda, i) =>
    Number((Lagforda / dataAnmalda[i]) * 100).toFixed(2)); 

  const datasets = [
    {
      label: '%',
      data: andelLagforda,
      backgroundColor: 'rgb(211, 37, 34)',
      borderColor: 'rgb(180, 36, 55)',
      borderWidth: 1,
      borderRadius: 1
    }
  ];

  let size = 20; 
  if (window.matchMedia("(max-width: 600px)")) {
    size = 15; 
  }

  let delayed;
  
    new Chart(document.getElementById('scbAnmaldaochLagforda'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
          animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },

      scales: {
         y: {
            ticks: {
              color: "#350908" 
            }
          },
          x: {
            title: {
            display: true,
            text: 'Källa: SCB',
            color: "#350908",
            align: 'end',
            padding: {
              top: 18
              }
            },
            ticks: {
              color: "#350908"
            }
          }
        ,
      },
    
       plugins: {    
      legend: {
          display: false,
        },  
        title: {           
            display: true,
            align: 'start',
              text: 'Grov kvinnofridskränkning i Sverige, anmälda brott som blev lagförda (%)',
              color: '#350908',
                padding: 30,
                font: {
                    size: 16,
                    weight: 500 
                }
              }
            }
          }
        }
      
    )});

/* Graf: Anmäld grov kvinnofridskräkning 1998–2023 */
const urlSCBKvinnofrid = 'https://api.scb.se/OV0104/v1/doris/sv/ssd/START/LE/LE0201/LE0201Våld/Tema613' 
const querySCBKvinnofrid = {
    "query": [],
    "response": {
    "format": "json"
    }
  };

const requestKvinnofrid = new Request(urlSCBKvinnofrid, { 
    method: 'POST', 
    body: JSON.stringify(querySCBKvinnofrid) 
  }); 

  fetch(requestKvinnofrid) 
    .then((response) => response.json()) 
    .then(printSCBKvinnofridChart); 

  function printSCBKvinnofridChart(dataSCBKvinnofrid) { 

  const yearsSCBKvinnofrid = dataSCBKvinnofrid.data; 
    console.log(yearsSCBKvinnofrid); 

  const labels = yearsSCBKvinnofrid.map((year) => year.key[0]); 
    console.log(labels); 

  const dataKvinnofrid = yearsSCBKvinnofrid.map((year) => year.values[0]); 
    console.log(dataKvinnofrid); 
 
  const datasetsSCBKvinnofrid = [{ 
    label: 'Kvinnor utsatta av män',
    data: dataKvinnofrid, 
    borderColor: "#DE2F2B", 
    backgroundColor: "#DE2F2B" 
  } 
]; 

  let size = 20;
    if (window.matchMedia("(max-width: 800px)").matches) {
      size = 16; 
  }

  /* Animering av trendlinjen */
  const totalDuration = 1500;
  const delayBetweenPoints = totalDuration / dataKvinnofrid.length;
  const previousY = (ctx) => ctx.index === 0 
    ? ctx.chart.scales.y.getPixelForValue(100) 
    : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
  const animation = {
    x: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: NaN,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    },
    y: {
      type: 'number',
      easing: 'linear',
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== 'data' || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      }
    }
  };

new Chart(document.getElementById('scbAnmaldaKvinnofrid'), { 
type: 'line', 
data: { 
labels: labels, 
datasets: datasetsSCBKvinnofrid 
}, 
    options: {
      responsive: true,
      animation: animation,
    
       scales:{
         y: {
             ticks: {
              color: "#350908"
             }
         },
         x: {
          title: {
            display: true,
            text: 'Källa: SCB',
            color: "#350908",
            align: 'end',
            padding: {
              top: 15
            }
          },
          ticks: {
            color: "#350908",
            callback: function(val, index) {
              return index % 2 === 0 ? this.getLabelForValue(val) : '';
            }
          }
        }
      },
      
      plugins: {    
        legend: {
          display: false,
        },
        title: {           
            display: true,
            align: 'start',
              text: 'Anmälda brott: grov kvinnofridskränkning i Sverige 1998–2023',
              color: '#350908',
                padding: 30,
                font: {
                    size: size,
                    weight: 500
                },
              }
            }
           } 
  });

/* Graf: Anmäld misshandel närstående i parrelation */
const urlSCBmisshandel = 'https://api.scb.se/OV0104/v1/doris/sv/ssd/START/LE/LE0201/LE0201Våld/Tema16b'
const querySCBmisshandel = {
  "query": [
    {
      "code": "RelOff",
      "selection": {
        "filter": "item",
        "values": [
          "30"
        ]
      }
    },
    {
      "code": "ContentsCode",
      "selection": {
        "filter": "item",
        "values": [
          "000004K5"
        ]
      }
    }
  ],
  "response": {
    "format": "json"
  }
};

const request1 = new Request(urlSCBmisshandel, {
  method: "POST",
  body: JSON.stringify(querySCBmisshandel)
});

fetch(request1)
  .then(response => response.json())
  .then(printSCBMisshandel);

  function printSCBMisshandel(dataSCBMisshandel) {
    const years = dataSCBMisshandel.data;
    const amount = dataSCBMisshandel.data;
    console.log(dataSCBMisshandel);

    const valueWomen = dataSCBMisshandel.data.filter(data => data.key[1] == 2).map(data => data.values[0]);
    const valueMen = dataSCBMisshandel.data.filter(data => data.key[1] == 1).map(data => data.values[0]);
    console.log(valueWomen);

    const labels = years.map(years => years.key[2]);
    console.log(labels);

    const keys1 = years.map(years => years.key[2]); 
    const labels2 = [
        ...keys1.slice(0, 1),
        ...keys1.slice(4, 5),
        ...keys1.slice(2, 3)
    ];
    console.log(labels2);

    const data = amount.map(amount => amount.values[0]);
    console.log(data);

    const datasets = [{
      label: "Kvinnor",
      data: valueWomen,
      backgroundColor: 'rgb(211, 37, 34)',
      borderColor: 'rgb(180, 36, 55)',
    },
    {
    label: 'Män',
    data: valueMen,
     backgroundColor: '#350908',
      borderColor: '#350908',
    }
  ];

 let size = 20;
  if (window.matchMedia("(max-width: 800px)").matches) {
    size = 16; 
  }

  let delayedTwo;

  const actions = [{
    name: 'Randomize',
    handler(chart) {
      chart.data.datasets.forEach(dataset => {
        dataset.data = Utils.numbers({count: chart.data.labels.length, min: -100, max: 100});
      });
      chart.update();
    }
  },
];

  new Chart(document.getElementById('scbMisshandel'), {
      type: 'bar',
      data: {labels: labels2, datasets: datasets},
      options: {
        responsive: true,
        animation: {
      onComplete: () => {
        delayedTwo = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayedTwo) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },

        scales: {
          y: {
            ticks: {
              color: "#350908" 
            }
          },
          x: {
            title: {
            display: true,
            text: 'Källa: SCB',
            align: 'end',
            color: "#350908",
            padding: {
              top: 15
              }
            },
            ticks: {
              color: "#350908"
            }
          }
        },
          plugins: {
            legend: {
              position: 'right',
              align: 'center',
              labels: {
                color: "#350908"
              }
            },
            title: {
              display: true,
              align: 'start',
              text: 'Anmäld misshandel i parrelation, Sverige 2020–2022',
              color: '#350908',
              padding: 30,
              font: {
                weight: 500,
                size: size
              }
            }
          }
      }
    });
  
/* Back-to-top-knapp */
const upBtn = document.getElementById("button-up");

window.onscroll = function () {
scrollFunction();
};

function scrollFunction() {
if (
document.body.scrollTop > 20 ||
document.documentElement.scrollTop > 20
) {
upBtn.style.display = "block";
} else {
upBtn.style.display = "none";
}
}
upBtn.addEventListener("click", backToTop);

function backToTop() {
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
}
  }

/* Graf: våldets karta över EU */
const countryCodes = {
  'BE': 'Belgium', 
  'BG': 'Bulgaria', 
  'CZ': 'Czech Republic', 
  'DK': 'Denmark',
  'DE': 'Germany', 
  'EE': 'Estonia', 
  'IE': 'Ireland', 
  'EL': 'Greece',
  'ES': 'Spain', 
  'FR': 'France', 
  'HR': 'Croatia', 
  'IT': 'Italy',
  'CY': 'Cyprus', 
  'LV': 'Latvia', 
  'LT': 'Lithuania', 
  'LU': 'Luxembourg',
  'HU': 'Hungary', 
  'MT': 'Malta', 
  'NL': 'Netherlands', 
  'AT': 'Austria',
  'PL': 'Poland', 
  'PT': 'Portugal', 
  'RO': 'Romania', 
  'SI': 'Slovenia',
  'SK': 'Slovakia', 
  'FI': 'Finland', 
  'SE': 'Sweden', 
  'ME': 'Montenegro',
  'RS': 'Serbia'
};

async function fetchEurostatData() {
  const euStatsUrl = 'https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/gbv_ipv_type$defaultview/?format=JSON&lang=en';
  try {
    const response = await fetch(euStatsUrl);
    if (!response.ok) {
      throw new Error(`Error status: ${response.status}`);
    }

    const data = await response.json();

    const geoIndex = data.dimension?.geo?.category?.index;
    const countries = Object.keys(geoIndex).map(code => countryCodes[code] || code);
    const valuesArray = Object.values(data.value);

    return {
      countries,
      valuesArray
    };
  } catch (error) {
    console.error("Error fetching EuroStat data:", error);
  }
}

async function displayCountryDataOnMap() {
  const mapData = await fetchEurostatData();
  if (!mapData) return;

  const data = [{
    type: "choropleth",
    locations: mapData.countries,
    z: mapData.valuesArray,
    featureidkey: "properties.NAME",
    geojson: "https://raw.githubusercontent.com/leakyMirror/map-of-europe/refs/heads/master/GeoJSON/europe.geojson",
    colorscale: [
      [0,    '#340909'],  
      [0.35, '#7A1515'],
      [0.5,  '#AE1E1E'],
      [0.6,  '#D12323'],
      [0.7,  '#DC2E2E'],
      [1,    '#F0A8A8']   
  ],

    colorbar: {
      title: {text: '%'},
      thickness: 15,
      len: .4,
      lenmode: 'fraction',
      x: 0,
      y: .7,
  },
  zmin: 0,
  zmax: 55,
  reversescale: true,
  marker: {
      line: {
          color: 'white',
          width: 1.5
      }},
  }];

  const layout = {
    geo: {
      scope: 'europe',
      center: { lon: 38, lat: 38 },
      
      fitbounds: false,
      projection: {type: "natural earth",
      scale: .8,
    },
      showland: true,
      landcolor: "#e0e0e0",
      countrycolor: "#ffffff", 
      bgcolor: 'rgba(0,0,0,0)', 
    },
  
    margin: { t: 0, b: 0, l: 0, r:0 },
    width: 1200,
    height: 800,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
  };

  Plotly.newPlot('euStats', data, layout, {scrollZoom: false});
}

displayCountryDataOnMap();

/* Animerat citat */ 
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const visibleLines = entry.target.querySelectorAll('.typing-text');

      visibleLines.forEach((line) => {
        line.classList.remove('typing-start', 'remove-cursor');
        void line.offsetWidth; 

        const delay = parseFloat(line.dataset.delay) || 0;

        setTimeout(() => {
          line.classList.add('typing-start');
        }, delay * 3500);

        const isLast = line.classList.contains('last-line');
        const typingDuration = 3000;
        if (!isLast) {
          setTimeout(() => {
            line.classList.add('remove-cursor');
          }, delay * 3500 + typingDuration);
        }
      });
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.animated-text-block').forEach(block => {
  observer.observe(block);
});
}