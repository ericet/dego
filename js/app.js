function getNftStats() {
    return new Promise((resolve, reject) => {
        const url = `https://api.blurt.buzz/dego_nft`;
        let stats = [];
        axios.get(url).then(function (response) {
            if (response.status == 200) {
                let data = response.data;
                let totalNFT = 0;
                for (let d of data) {
                    totalNFT += Number(d.count);
                }
                for (let d of data) {
                    let totalDegoAmount = 0;
                    let multiplier = 0;
                    let image="";
                    if (d.name === 'BRONZE') {
                        multiplier = 1;
                        image="https://dego.finance/upload/small/1.png";
                    } else if (d.name === 'SILVER') {
                        multiplier = 2;
                        image="https://dego.finance/upload/small/2.png";

                    } else if (d.name === 'GOLD') {
                        multiplier = 3;
                        image="https://dego.finance/upload/small/3.png";

                    } else if (d.name === 'PLATINUM') {
                        multiplier = 4;
                        image="https://dego.finance/upload/small/4.png";

                    } else if (d.name === 'DIAMOND') {
                        multiplier = 5;
                        image="https://dego.finance/upload/small/5.png";

                    } else if (d.name === 'KRYPTONITE') {
                        multiplier = 100;
                        image="https://dego.finance/upload/small/6.png";

                    }
                    totalDegoAmount += Number(d.count) * multiplier;
                    stats.push({ name: d.name, count: d.count, percentage: (d.count / totalNFT * 100).toFixed(2), degoAmount:multiplier,value: totalDegoAmount,image:image })
                }
                resolve(stats);

            }

        });

    });
}

$(document).ready(async function () {
    const colors = ['#007ED6', '#52D726', '#FFEC00', '#FF7300', '#7CDDDD', '#FF0000'];
    const nftOptions = {
        cutoutPercentage: 0,
        legend: { position: 'bottom', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } },
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map(data => {
                        sum += data;
                    });
                    let percentage = (value * 100 / sum).toFixed(2) + "%";
                    return percentage;
                },
                color: '#fff',
            }
        }
    };
    let htmlString =`<table class="table" id="dvlist" style="width:100%"> <thead class="thead-light">
    <tr>
    <th >Image</th>
      <th >Name</th>
      <th >Count</th>
      <th >Percentage</th>
      <th >Total DEGO Amount</th>
    </tr></thead><tbody>`;
    let stats = await getNftStats();
    let labels = [];
    let data = [];
    let totalCount=0;
    let totalDegoAmount=0;
    let totalValue=0;
    for (let d of stats) {
        
        htmlString += `<td><img src="${d.image}" width="50" height="50"></span></td>`;
        htmlString += `<td><span>${d.name}</span></td>`;
        htmlString += `<td><span>${d.count}</span></td>`;
        htmlString += `<td><span>${d.percentage}%</span></td>`;
        htmlString += `<td><span>${d.value}</span></td>`;
        htmlString += '</tr>';
        labels.push(d.name);
        data.push(d.count);
        totalCount +=d.count;
        totalDegoAmount +=d.degoAmount;
        totalValue +=d.value;
    }
    htmlString += '</tr>';
    htmlString += `</tbody></table>`;

    let nftData = {
        labels: labels,
        datasets: [
            {
                backgroundColor: colors.slice(0, 6),
                borderWidth: 0,
                data: data
            }
        ]
    };

    var nft = document.getElementById("nft");
    if (nft) {
        new Chart(nft, {
            type: 'pie',
            data: nftData,
            options: nftOptions
        });
    }
    $('div#stats').html(htmlString);
    let summary = `<section id="our-stats">
  <div class="row text-center">
      <div class="col">
          
              <div class="counter">
              <i class="fab fa-ethereum  fa-2x"></i>

                  <h2 class="timer count-title count-number" data-to="100" data-speed="1500">${totalCount}</h2>
                  <p class="count-text ">Total Number of NFTs</p>
              </div>
          
      </div>
      <div class="col">
          
              <div class="counter">
              <i class="fa fa-code fa-2x"></i>
              <h2 class="timer count-title count-number" data-to="1700" data-speed="1500">${totalValue}/100000</h2>
                  <p class="count-text">Total DEGO Amounts</p>
              </div>
          
      </div>
    
  
  </div>
</section>`;
    $('div#summary').html(summary);
});