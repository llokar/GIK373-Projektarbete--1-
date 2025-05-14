/*Anmäld grov kvinnofridskränkning 1998-2023*/

const urlSCBAnmalda = 'https://api.scb.se/OV0104/v1/doris/sv/ssd/START/LE/LE0201/LE0201Våld/Tema613'
const querySCBAnmalda = {
    "query": [],
    "response": {
      "format": "json"
    }
  };
  
  const requestAnmalda = new Request(urlSCBAnmalda, {
    method: 'POST',
    body: JSON.stringify(querySCBAnmalda)
  });

  fetch(requestAnmalda)
    .then((response) => response.json())
    .then(printSCBAnmaldaChart);
   

    function printSCBAnmaldaChart(dataSCBAnmalda) {
        const yearsSCBAnmalda = dataSCBAnmalda.data;
       console.log(yearsSCBAnmalda);

       const labelsSCBAnmalda = yearsSCBAnmalda.map((year) => year.key[0]);
       console.log(labelsSCBAnmalda);

       const dataAnmalda = yearsSCBAnmalda.map((year) => year.values[0]);
       console.log(dataAnmalda);

       const datasetsSCBAnmalda = [{
        label: 'Anmäld grov kvinnofridskränkning',
        data: dataAnmalda,
        borderColor: "rgb(229, 75, 96)",
        backgroundColor: "rgba(145, 35, 223, 0.4)"
       }
    ];
    new Chart(document.getElementById('scbAnmalda'), {
       type: 'line',
       data: {
            labels: labelsSCBAnmalda,
            datasets: datasetsSCBAnmalda
       } 
    });

    }

/* Lagförda, antal efter huvudbrott; Grov Kvinnofridskränkning, 2017–2023 */

const urlSCBLagforda = "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/LE/LE0201/LE0201Våld/Tema615";

const querySCBLagforda = {
    "query": [
      {
        "code": "Huvudbrott",
        "selection": {
          "filter": "item",
          "values": [
            "06"
          ]
        }
      },
      {
        "code": "Kon",
        "selection": {
          "filter": "item",
          "values": [
            "1"
          ]
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


  const reqeustLagforda = new Request(urlSCBLagforda, {
    method: 'POST',
    body: JSON.stringify(querySCBLagforda)
  });

  fetch(reqeustLagforda)
    .then((response) => response.json())
    .then(printSCBLagfordaChart);


function printSCBLagfordaChart(dataSCBLagforda) {
    console.log(dataSCBLagforda);
    const yearsSCBLagforda = dataSCBLagforda.data;
    console.log(yearsSCBLagforda);

    const labels = yearsSCBLagforda.map((year) => year.key[2]);
    console.log(labels);

    const data = yearsSCBLagforda.map((year) => year.values[0]);
    console.log(data);

    const datasets = [
        {
            label: "Lagförda; Grov Kvinnofridskränkning 2017–2023",
            data: data,
        }
    ];

    const chartLagforda = new Chart(
        document.getElementById("scbLagforda"),
        {
            type: 'bar',
            data: { labels: labels, datasets: datasets},
            options: {
            scales: {
                y: {
                suggestedMin: 10,
                suggestedMax: 2000
                }
            }
            }}
    );

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
    const relation = dataSCButsatta.data;
    console.log(relation);
    const gender = dataSCButsatta.data;
    console.log(gender);
    const amount = dataSCButsatta.data;
    console.log(amount);
    
    const labels = relation.map(relation => relation.key[0]);
    console.log(labels);
    const labels1 = gender.map(gender => gender.key[1]);
    console.log(labels1);

    const data = amount.map(
        (amount) => amount.values[0]
    );
    console.log(data);

    const datasets = [{
        label: "Utsatta för misshandel, efter relation till förövare 2015-2016",
        data: data
    }];

    const myChart = new Chart(
        document.getElementById("scbUtsatta"),
    {
        type: "bar",
        data: {labels: labels, datasets: datasets}
    }
    );
}
 
