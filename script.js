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

  const dataLagforda = labels.map(year => lagforda[year] || 0);

  const datasets = [
    {
      label: 'Anmälda',
      data: dataAnmalda,
      backgroundColor: 'rgb(211, 37, 34)',
      borderColor: 'rgb(180, 36, 55)',
      borderWidth: 1,
      borderRadius: 1
    },
    {
      label: 'Lagförda',
      data: dataLagforda,
      backgroundColor: 'rgb(238, 151, 150)',
      borderColor: 'rgb(237, 135, 133)',
      borderWidth: 1
    }
  ];
  let size = 20; 
  //om window.matchMedia > 600px, sätt size till något annat
  if(window.matchMedia("(max-width: 600px)")) {
    size = 15; 
  }
  new Chart(document.getElementById('scbAnmaldaochLagforda'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
       scales:{
         y: {
             title: {
               display: true,
               text: 'Antal',
               padding: 15
              }
             },
  
         },
      
      plugins: {      
        title: {           
            display: true,
              text: ['Kvinnofridskränkning i Sverige' , 'Anmälningar vs Lagförda'],
              color: '#350908',
                padding: 20,
                font: {
                  family: 'montserrat, sans-serif',
                    size: size,
                    weight: 'bold'
                },
              }
            }
           } 
  });

}); /* .catch(err => console.error('Fel vid hämtning av data:', err)); */

/* Anmäld grov kvinnofridskräkning 1998–2023*/

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

label: 'Anmäld grov kvinnofridskränkning', 

data: dataKvinnofrid, 

borderColor: "#DE2F2B", 

backgroundColor: "rgba(145, 35, 223, 0.4)" 

} 

]; 

new Chart(document.getElementById('scbAnmaldaKvinnofrid'), { 

type: 'line', 

data: { 

labels: labels, 

datasets: datasetsSCBKvinnofrid 

}  

}); 

 

} 

 


/* Personer som blir utsatta för misshandel efter relation till förövare 2015-2016 */

const urlSCButsatta =
"https://api.scb.se/OV0104/v1/doris/sv/ssd/START/LE/LE0201/LE0201Våld/Tema66";

const querySCButsatta =
{
    "query": [
      {
        "code": "ContentsCode",
        "selection": {
          "filter": "item",
          "values": [
            "000002WI"
          ]
        }
      }
    ],
    "response": {
      "format": "json"
    }
  };

  const request = new Request(urlSCButsatta, {
    method: "POST",
    body: JSON.stringify(querySCButsatta)
  });

  fetch(request)
  .then(response => response.json())
  .then(printSCButsattaChart);

    function printSCButsattaChart(dataSCButsatta) {
      console.log(dataSCButsatta);
     
      const gender = dataSCButsatta.data;
      const relation = dataSCButsatta.data;
      const amount = dataSCButsatta.data;
   
      const womenValues = dataSCButsatta.data.filter(data => data.key[1] == 1).map(data => data.values[0]); 
    const menValues = dataSCButsatta.data.filter(data => data.key[1] == 2).map(data => data.values[0]); 
    console.log(womenValues)
   
    const labels = gender.map(gender => gender.key[1]);
    console.log(labels);
    
    const keys = relation.map(relation => relation.key[0]);
    const labels1 = [
    ...keys.slice(0, 1),
    ...keys.slice(2, 3),
    ...keys.slice(4, 5)
    ];

    console.log(labels1);
    const data = amount.map(amount => amount.values[0]);
    console.log(data);

    const datasets = [{
      label: "Kvinnor",
      data: womenValues,
      backgroundColor: 'rgb(211, 37, 34)',
      borderColor: 'rgb(180, 36, 55)',
      borderWidth: 1,
      borderRadius: 1
    },
    {
      label: "Män",
      data: menValues,
      backgroundColor: 'rgb(238, 151, 150)',
      borderColor: 'rgb(237, 135, 133)',
      borderWidth: 1,
      borderRadius: 1
    }
  ];

    const myChart = new Chart(document.getElementById("scbUtsatta"),
      {
        type: "bar",
        data: {
          datasets: datasets,
          labels: ['Närstående', 'Bekanta', 'Helt okända'] 
        },
        options: {
       scales:{
         y: {
             title: {
               display: true,
               text: 'Antal',
               color:'#350908',
               padding: 15,
               font:{
                family: 'montserrat, sans-serif',
                weight: 'bold',
                size: 13, 
               }
              }
             },

           x: {
            title: {
              display: true,
             text: 'Typ av relation',
             color: '#350908',
              padding: 15,
              font: {
                family: 'monsterrat, sans-serif',
                weight: 'bold',
                size: 13,
              },
             }
          }  
         },
      
      plugins: {      
        title: {           
            display: true,
              text: ['Personer utsatta för misshandel, efter relation till förövare','Sverige 2015-2016'],
              color: '#350908',
                padding: 20,
                font: {
                  family: 'montserrat, sans-serif',
                    weight: 'bold'
                },
              }
            }
           } 
      }
    );
    }
 
/* Anmäld misshandel närstående genom parrelation */

/* const urlSCBmisshandel =
"https://api.scb.se/OV0104/v1/doris/sv/ssd/START/LE/LE0201/LE0201Våld/Tema16b";
*/

  const labels = [
    "Kvinnor",
    "Män"
  ];

  const datasets = [
    {
      label: 'Anmäld misshandel, kvinnor',
      data: [13616, 13583, 13445],
      backgroundColor: "rgba(244,255,12,0.4)",
      borderColor: "blue",
      borderWidth: 2,
      hoverBorderColor: "red",
     
      
    },    
    {
      label: 'Anmäld misshandel, män',
      data: [3000, 2954, 2912],
      backgroundColor: "rgba(244,255,12)",
      hoverBorderColor: "magenta",

    },
  ];
  
  const config = { 
    type: 'bar',
    data: {labels: labels, datasets: datasets}, 
};

  const canvas = document.getElementById('myChart');
  const myChart = new Chart(canvas, config);

  const config2 = {
    type: "bar",
    data: {
      labels: [2020, 2021, 2022],
      datasets: [{
        label: "Kvinnor", 
        data: [13616, 13583, 13445],
        backgroundColor: 'rgb(211, 37, 34)',
        borderColor: 'rgb(180, 36, 55)',
        borderWidth: 1,
        borderRadius: 1
      },
      {
        label: "Män", 
        data: [3000, 2954, 2912],
        backgroundColor: 'rgb(238, 151, 150)',
        borderColor: 'rgb(237, 135, 133)',
        borderWidth: 1,
        borderRadius: 1
      }
    ]
    
    }
    
  };

const scbMisshandel = new Chart(document.getElementById("scbMisshandel"), config2)

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
