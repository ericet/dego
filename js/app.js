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
                    else if (d.name === 'Vitalik Buterin') {
                        multiplier = 10000;
                        image="https://dego.finance/upload/small/Vitalik_Buterin.png";

                    } else if (d.name === 'Satoshi Nakamoto') {
                        multiplier = 10000;
                        image="https://dego.finance/upload/small/Satoshi.png";

                    }
                    totalDegoAmount += Number(d.count) * multiplier;
                    stats.push({ name: d.name, count: d.count, percentage: (d.count / totalNFT * 100).toFixed(2), degoAmount:multiplier,value: totalDegoAmount,image:image })
                }
                resolve(stats);

            }

        });

    });
}
function getContractABI(address) {
    return new Promise((resolve, reject) => {
        let url = "https://api.etherscan.io/api?module=contract&action=getabi&address=" + address;
        axios.get(url).then(function (response) {
            if (response.status == 200) {
                resolve(JSON.parse(response.data.result));
            }
        });
    });
}

function getRewardRate(myContract) {
    return new Promise((resolve, reject) => {
        myContract.methods._rewardRate().call(function (err, res) {
            if (!err) {
              resolve(res*24*60*60/1000000000000000000);
            } else {
                console.log(err);
            }
        }
        );
    });
}

function getTotalSupply(myContract) {
    return new Promise((resolve, reject) => {
        myContract.methods.totalSupply().call(function (err, res) {
            if (!err) {
              resolve(res/1000000000000000000);
            } else {
                console.log(err);
            }
        }
        );
    });
}
function getRewardPerPower(rewardRate, totalSupply){
    return (rewardRate)*(1/(totalSupply));
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
    let htmlString =`<div class="table-responsive"><table class="table" id="dvlist" style="width:100%"> <thead class="thead-light">
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
              <h2 class="timer count-title count-number" data-to="1700" data-speed="1500">${totalValue}</h2>
                  <p class="count-text">Total DEGO Amounts</p>
              </div>
          
      </div>
    
  
  </div>
</section>`;
    $('div#summary').html(summary);



    const web3 = new Web3(new Web3.providers.HttpProvider("https://api.infura.io/v1/jsonrpc/mainnet"));
    const pool1 = '0xbd277e47d0ECDd5db6c57Eda717dD8F5a329EDEC';
    const pool2 = '0xa773C5a484789117d51019dB07307DAc326DE87c';
    const pool3 = '0xB86021cbA87337dEa87bc055666146a263c9E0cd';
    let abi = await getContractABI(pool1);
    if (abi !== '') {
        let pool1Contract = new web3.eth.Contract(abi, pool1);
        let pool2Contract = new web3.eth.Contract(abi, pool2);
        let pool3Contract = new web3.eth.Contract(abi, pool3);
        let pool1RewardRate = await getRewardRate(pool1Contract);
        let pool2RewardRate = await getRewardRate(pool2Contract);
        let pool3RewardRate = await getRewardRate(pool3Contract);
        let pool1TotalSupply = await getTotalSupply(pool1Contract);
        let pool2TotalSupply = await getTotalSupply(pool2Contract);
        let pool3TotalSupply = await getTotalSupply(pool3Contract);
        let RewardPerPower1 =  getRewardPerPower(pool1RewardRate,pool1TotalSupply);
        let RewardPerPower2 =  getRewardPerPower(pool2RewardRate,pool2TotalSupply);
        let RewardPerPower3 =  getRewardPerPower(pool3RewardRate,pool3TotalSupply);

        let pools =` <br/><div class="row">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="card mb">
                        <img class="card-img-top" src="./images/pool1.png">
                        <div class="card-body mb">
                            <h5 class="card-title">La Rinconada Pool</h5>
                            <p class="card-text">Total Power: ${(pool1TotalSupply).toFixed(0)}</p>
                            <p class="card-text">Reward Rate(1 Day): ${pool1RewardRate} DEGO</p>
                            <p class="card-text">Reward/Power(1 Day): ${RewardPerPower1.toFixed(2)} DEGO</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card mb">
                        <img class="card-img-top" src="./images/pool2.png">
                        <div class="card-body mb">
                            <h5 class="card-title">Dharavi Pool</h5>
                            <p class="card-text">Total Power: ${pool2TotalSupply.toFixed(0)}</p>
                            <p class="card-text">Reward Rate(1 Day): ${pool2RewardRate} DEGO</p>
                            <p class="card-text">Reward/Power(1 Day): ${RewardPerPower2.toFixed(2)} DEGO</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card mb">
                        <img class="card-img-top" src="./images/pool3.png">
                        <div class="card-body mb">
                            <h5 class="card-title">Krugersdrop Pool</h5>
                            <p class="card-text">Total Power: ${pool3TotalSupply.toFixed(0)}</p>
                            <p class="card-text">Reward Rate(1 Day): ${pool3RewardRate.toFixed(0)} DEGO</p>
                            <p class="card-text">Reward/Power(1 Day): ${RewardPerPower3.toFixed(2)} DEGO</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    $('div#pools').html(pools);
    }

});
