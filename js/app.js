function getNftStats(timestamp) {
    return new Promise((resolve, reject) => {
        const url = `https://api.blurt.buzz/dego_nft_issued/${timestamp}`;
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
                    let image = "";
                    if (d.name === 'BRONZE') {
                        multiplier = 1;
                        image = "https://dego.finance/upload/small/1.png";
                    } else if (d.name === 'SILVER') {
                        multiplier = 2;
                        image = "https://dego.finance/upload/small/2.png";

                    } else if (d.name === 'GOLD') {
                        multiplier = 3;
                        image = "https://dego.finance/upload/small/3.png";

                    } else if (d.name === 'PLATINUM') {
                        multiplier = 4;
                        image = "https://dego.finance/upload/small/4.png";

                    } else if (d.name === 'DIAMOND') {
                        multiplier = 5;
                        image = "https://dego.finance/upload/small/5.png";

                    } else if (d.name === 'KRYPTONITE') {
                        multiplier = 100;
                        image = "https://dego.finance/upload/small/6.png";

                    }
                    totalDegoAmount += Number(d.count) * multiplier;
                    stats.push({ name: d.name, count: d.count, percentage: (d.count / totalNFT * 100).toFixed(2), degoAmount: multiplier, value: totalDegoAmount, image: image })
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
        legend: { position: 'right', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } },
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
        },
        title: {
            display: true,
            text: 'Total Issued NFTs Distribution'
        }


    };
    const nft2Options = {
        cutoutPercentage: 0,
        legend: { position: 'left', padding: 5, labels: { pointStyle: 'circle', usePointStyle: true } },
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
        },
        title: {
            display: true,
            text: 'Issued NFTs Distribution Since Today'
        }


    };
    let htmlString = ` <div class="table-responsive"><table class="table" id="dvlist" style="width:100%"> <thead class="thead-light">
    <tr>
    <th ></th>
      <th >Name</th>
      <th >Today Count</th>
      <th >Total Count</th>
      <th >Percent</th>
    </tr></thead><tbody>`;
    let start = new Date();
    start.setHours(0, 0, 0, 0);
    let stats = await getNftStats(0);
    let stats2 = await getNftStats(start.getTime() / 1000);
    let labels = [];
    let data = [];
    let labels2 = [];
    let data2 = [];
    let totalCount = 0;
    let totalValue = 0;
    let totalDegoAmount = 0;
    let totalTodayCount =0;
    for (let d of stats) {
        
        htmlString += `<td><img src="${d.image}" width="50" height="50"></span></td>`;
        htmlString += `<td><span>${d.name}</span></td>`;
        for(let s of stats2){
            if(s.name===d.name){
                htmlString += `<td><span>${s.count}</span></td>`;
            }
            if(d.name==='KRYPTONITE'){
                htmlString += `<td><span>0</span></td>`;
            }
        }
        htmlString += `<td><span>${d.count}</span></td>`;
        htmlString += `<td><span>${d.percentage}%</span></td>`;
        htmlString += '</tr>';
        labels.push(d.name);
        data.push(d.count);
        totalCount += d.count;
        totalDegoAmount += d.degoAmount;
        totalValue += d.value;
    }
    for (let d of stats2) {
        labels2.push(d.name);
        data2.push(d.count);
        totalTodayCount +=d.count;
    }
    htmlString += '</tr>';
    htmlString += `</tbody></table></div>`;

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
    let nft2Data = {
        labels: labels2,
        datasets: [
            {
                backgroundColor: colors.slice(0, 6),
                borderWidth: 0,
                data: data2
            }
        ]
    };

    var nft = document.getElementById("total");
    if (nft) {
        new Chart(nft, {
            type: 'pie',
            data: nftData,
            options: nftOptions
        });
    }
    var nft2 = document.getElementById("today");
    if (nft) {
        new Chart(nft2, {
            type: 'pie',
            data: nft2Data,
            options: nft2Options
        });
    }
    $('div#stats').html(htmlString);
    let summary = `<section id="our-stats">
  <div class="row text-center">
          
     <div class="col">
          
              <div class="counter">
              <i class="fab fa-ethereum  fa-2x"></i>

                  <h2 class="timer count-title count-number" data-to="100" data-speed="1500">${totalTodayCount}</h2>
                  <p class="count-text ">Total Number of NFTs Issued TODAY</p>
              </div>
          
      </div>
      <div class="col">
          
              <div class="counter">
              <i class="fab fa-ethereum  fa-2x"></i>

                  <h2 class="timer count-title count-number" data-to="100" data-speed="1500">${totalCount}</h2>
                  <p class="count-text ">Total Number of NFTs Issued</p>
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