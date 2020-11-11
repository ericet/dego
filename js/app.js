function getNftStats(url) {
    return new Promise((resolve, reject) => {
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
                    else if (d.name === 'Vitalik Buterin') {
                        multiplier = 10000;
                        image = "https://dego.finance/upload/small/Vitalik_Buterin.png";

                    } else if (d.name === 'Satoshi Nakamoto') {
                        multiplier = 10000;
                        image = "https://dego.finance/upload/small/Satoshi.png";

                    }
                    totalDegoAmount += Number(d.count) * multiplier;
                    stats.push({ name: d.name, count: d.count, percentage: (d.count / totalNFT * 100).toFixed(2), degoAmount: multiplier, value: totalDegoAmount, image: image })
                }
                resolve(stats);

            }

        });

    });
}

function getKcsNftStats(url) {
    return new Promise((resolve, reject) => {
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
                    let image = "";
                    if (d.name === 'Kucoin V1') {
                        image = "https://dego.finance/upload/small/kucoin_1.png";
                    } else if (d.name === 'Kucoin V2') {
                        image = "https://dego.finance/upload/small/kucoin_2.png";

                    } else if (d.name === 'Kucoin V3') {
                        image = "https://dego.finance/upload/small/kucoin_3.png";

                    } else if (d.name === 'Kucoin V4') {
                        image = "https://dego.finance/upload/small/kucoin_4.png";

                    } else if (d.name === 'Kucoin V5') {
                        image = "https://dego.finance/upload/small/kucoin_5.png";

                    } else if (d.name === 'Kucoin V6') {
                        image = "https://dego.finance/upload/small/kucoin_6.png";

                    }

                    totalDegoAmount += Number(d.count) * 29.4;
                    stats.push({ name: d.name, count: d.count, percentage: (d.count / totalNFT * 100).toFixed(2), degoAmount: 29.4, value: totalDegoAmount, image: image })
                }
                resolve(stats);

            }

        });

    });
}

function getBotNftStats(url) {
    return new Promise((resolve, reject) => {
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
                    let image = "";
                    if (d.grade === 1) {
                        image = "https://dego.finance/upload/small/BOT_1.png";
                    } else if (d.grade === 2) {
                        image = "https://dego.finance/upload/small/BOT_2.png";

                    } else if (d.grade === 3) {
                        image = "https://dego.finance/upload/small/BOT_3.png";

                    } else if (d.grade === 4) {
                        image = "https://dego.finance/upload/small/BOT_4.png";

                    } else if (d.grade === 5) {
                        image = "https://dego.finance/upload/small/BOT_5.png";

                    } else if (d.grade === 6) {
                        image = "https://dego.finance/upload/small/BOT_6.png";

                    }

                    totalDegoAmount += Number(d.count) * 29.4;
                    stats.push({ name: d.name, count: d.count, percentage: (d.count / totalNFT * 100).toFixed(2), value: d.value, power: d.power, image: image })
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
function getBscContractABI(address) {
    return new Promise((resolve, reject) => {
        let url = "https://api.bscscan.com/api?module=contract&action=getabi&address=" + address;
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
                resolve(res * 24 * 60 * 60 / 1000000000000000000);
            } else {
                console.log(err);
            }
        }
        );
    });
}
function getStakeInfo(myContract, gegoId) {
    return new Promise((resolve, reject) => {
        myContract.methods.getStakeInfo(gegoId).call(function (err, res) {
            if (!err) {
                if (Number(res.degoAmount) > 10000000000000000000000) {
                    resolve(null);
                }
                resolve(res)
            } else {
                console.log(err);
            }
        }
        );
    });
}
function getAddressStakeInfo(myContract, address) {
    return new Promise((resolve, reject) => {
        myContract.methods.balanceOf(address).call(function (err, res) {
            if (!err) {
                resolve(res)
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
                resolve(res / 1000000000000000000);
            } else {
                console.log(err);
            }
        }
        );
    });
}
function getRewardPerPower(rewardRate, totalSupply) {
    return (rewardRate) * (1 / (totalSupply));
}


async function bscPage() {
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
    let htmlString = `<div class="table-responsive"><table class="table" id="dvlist" style="width:100%"> <thead class="thead-light">
    <tr>
    <th >Image</th>
      <th >Name</th>
      <th >Count</th>
      <th >Percentage</th>
    </tr></thead><tbody>`;
    let stats = await getNftStats('https://api.blurt.buzz/dego_nft_bsc');
    let labels = [];
    let data = [];
    let totalCount = 0;
    let totalDegoAmount = 0;
    let totalValue = 0;
    for (let d of stats) {

        htmlString += `<td><img src="${d.image}" width="50" height="50"></span></td>`;
        htmlString += `<td><span>${d.name}</span></td>`;
        htmlString += `<td><span>${d.count}</span></td>`;
        htmlString += `<td><span>${d.percentage}%</span></td>`;
        htmlString += '</tr>';
        labels.push(d.name);
        data.push(d.count);
        totalCount += d.count;
        totalValue += d.value;
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

    var nft = document.getElementById("nft-bsc");
    if (nft) {
        new Chart(nft, {
            type: 'pie',
            data: nftData,
            options: nftOptions
        });
    }
    $('div#stats-bsc').html(htmlString);
    let summary = `<section id="our-stats">
  <div class="row text-center">
      <div class="col">
          
              <div class="counter">
              <i class="fas fa-hammer fa-2x"></i>



                  <h2 class="timer count-title count-number" data-to="100" data-speed="1500">${totalCount}/55184</h2>
                  <p class="count-text ">Total Number of NFTs</p>
              </div>
          
      </div>
    
  
  </div>
</section>`;
    $('div#bscSummary').html(summary);
}

async function kucoinPage() {
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
    let htmlString = `<div class="table-responsive"><table class="table" id="dvlist" style="width:100%"> <thead class="thead-light">
    <tr>
    <th >Image</th>
      <th >Name</th>
      <th >Count</th>
      <th >Percentage</th>
      <th >Total DEGO Amount</th>
    </tr></thead><tbody>`;
    let stats = await getKcsNftStats('https://api.blurt.buzz/dego_nft_kcs');
    let labels = [];
    let data = [];
    let totalCount = 0;
    let totalDegoAmount = 0;
    let totalValue = 0;
    for (let d of stats) {

        htmlString += `<td><img src="${d.image}" width="50" height="50"></span></td>`;
        htmlString += `<td><span>${d.name}</span></td>`;
        htmlString += `<td><span>${d.count}</span></td>`;
        htmlString += `<td><span>${d.percentage}%</span></td>`;
        htmlString += `<td><span>${d.value.toFixed(2)}</span></td>`;
        htmlString += '</tr>';
        labels.push(d.name);
        data.push(d.count);
        totalCount += d.count;
        totalDegoAmount += d.degoAmount;
        totalValue += d.value;
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

    var nft = document.getElementById("kcs-nft");
    if (nft) {
        new Chart(nft, {
            type: 'pie',
            data: nftData,
            options: nftOptions
        });
    }
    $('div#kcs-stats').html(htmlString);
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
              <h2 class="timer count-title count-number" data-to="1700" data-speed="1500">${totalValue.toFixed(2)}</h2>
                  <p class="count-text">Total Airdrop NFTs DEGO Par Value</p>
              </div>
          
      </div>
    
  
  </div>
</section>`;
    $('div#kcs-summary').html(summary);
}

async function botPage() {
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
    let htmlString = `<div class="table-responsive"><table class="table" id="dvlist" style="width:100%"> <thead class="thead-light">
    <tr>
    <th >Image</th>
      <th >Name</th>
      <th >Count</th>
      <th >Percentage</th>
      <th >Total BOT Amount</th>
      <th >Total Power</th>
    </tr></thead><tbody>`;
    let stats = await getBotNftStats('https://api.blurt.buzz/dego_nft_bot');
    let labels = [];
    let data = [];
    let totalCount = 0;
    let totalValue = 0;
    let totalPower = 0;
    for (let d of stats) {
        htmlString += `<td><img src="${d.image}" width="50" height="50"></span></td>`;
        htmlString += `<td><span>${d.name}</span></td>`;
        htmlString += `<td><span>${d.count}</span></td>`;
        htmlString += `<td><span>${d.percentage}%</span></td>`;
        htmlString += `<td><span>${d.value.toFixed(2)}</span></td>`;
        htmlString += `<td><span>${d.power}</span></td>`;
        htmlString += '</tr>';
        labels.push(d.name);
        data.push(d.count);
        totalCount += d.count;
        totalValue += d.value;
        totalPower += d.power;
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

    var nft = document.getElementById("nft-bot");
    if (nft) {
        new Chart(nft, {
            type: 'pie',
            data: nftData,
            options: nftOptions
        });
    }
    $('div#stats-bot').html(htmlString);
    let summary = `<section id="our-stats">
  <div class="row text-center">
      <div class="col">
          
              <div class="counter">
              <i class="fas fa-robot fa-2x"></i>

                  <h2 class="timer count-title count-number" data-to="100" data-speed="1500">${totalCount}</h2>
                  <p class="count-text ">Total Number of NFTs</p>
              </div>
          
      </div>
      <div class="col">
          
              <div class="counter">
              <i class="fa fa-code fa-2x"></i>
              <h2 class="timer count-title count-number" data-to="1700" data-speed="1500">${totalValue.toFixed(2)}</h2>
                  <p class="count-text">Total NFTs BOT Par Value</p>
              </div>
          
      </div>
      <div class="col">
          
      <div class="counter">
      <i class="fab fa-superpowers fa-2x"></i>
      <h2 class="timer count-title count-number" data-to="1700" data-speed="1500">${totalPower.toFixed(3)}</h2>
          <p class="count-text">Total Power</p>
      </div>
  
</div>
    
  
  </div>
</section>`;
    $('div#botSummary').html(summary);
}

async function bscMiningPools() {
    const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org"));
    const pool1 = '0x4cedaeaf3bc1139ad691d519895167cccc6bfc16';
    const pool2 = '0x05b72c835c7619383d370b5e28c3aafb40270ab2';
    const pool3 = '0x8b7dc6e5f3c0a7d8278c4900f548711bde365528';
    let pool1Contract = null, pool2Contract = null, pool3Contract = null;
    let abi = await getBscContractABI(pool1);
    if (abi !== '') {
        pool1Contract = new web3.eth.Contract(abi, pool1);
        pool2Contract = new web3.eth.Contract(abi, pool2);
        pool3Contract = new web3.eth.Contract(abi, pool3);
        let pool1RewardRate = await getRewardRate(pool1Contract);
        let pool2RewardRate = await getRewardRate(pool2Contract);
        let pool3RewardRate = await getRewardRate(pool3Contract);
        let pool1TotalSupply = await getTotalSupply(pool1Contract);
        let pool2TotalSupply = await getTotalSupply(pool2Contract);
        let pool3TotalSupply = await getTotalSupply(pool3Contract);
        let RewardPerPower1 = getRewardPerPower(pool1RewardRate, pool1TotalSupply);
        let RewardPerPower2 = getRewardPerPower(pool2RewardRate, pool2TotalSupply);
        let RewardPerPower3 = getRewardPerPower(pool3RewardRate, pool3TotalSupply);

        let pools = ` <br/><div class="row">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="card mb">
                        <img class="card-img-top" src="./images/pool1.png">
                        <div class="card-body mb">
                            <h5 class="card-title">La Rinconada Pool</h5>
                            <p class="card-text">Total Power: ${(pool1TotalSupply).toFixed(0)}</p>
                            <p class="card-text">Reward Rate(1 Day): ${pool1RewardRate.toFixed(5)} DEGO</p>
                            <p class="card-text">Reward/Power(1 Day): ${RewardPerPower1.toFixed(5)} DEGO</p>
                            <div id="bsc-payout1"></div>

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card mb">
                        <img class="card-img-top" src="./images/pool2.png">
                        <div class="card-body mb">
                            <h5 class="card-title">Dharavi Pool</h5>
                            <p class="card-text">Total Power: ${pool2TotalSupply.toFixed(0)}</p>
                            <p class="card-text">Reward Rate(1 Day): ${pool2RewardRate.toFixed(5)} DEGO</p>
                            <p class="card-text">Reward/Power(1 Day): ${RewardPerPower2.toFixed(5)} DEGO</p>
                            <div id="bsc-payout2"></div>

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card mb">
                        <img class="card-img-top" src="./images/pool3.png">
                        <div class="card-body mb">
                            <h5 class="card-title">Krugersdrop Pool</h5>
                            <p class="card-text">Total Power: ${pool3TotalSupply.toFixed(0)}</p>
                            <p class="card-text">Reward Rate(1 Day): ${pool3RewardRate.toFixed(5)} DEGO</p>
                            <p class="card-text">Reward/Power(1 Day): ${RewardPerPower3.toFixed(5)} DEGO</p>
                            <div id="bsc-payout3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br/>
    <p><small>* Notes: 5% of the mining rewards will go to the team and 10% of mining rewards will go to the reward pool</small></p>
    `
        $('div#bscPoolsDisplay').html(pools);
        $('#bsc-calculate').submit(async function (e) {
            e.preventDefault();
            const input = $('#bscInput').val().trim();
            if(input===''){
                alert("Please enter your GEGO ID or BSC address");
                return;
            }
            let power = 0;
            if (input.startsWith('0x') && input.trim().length === 42) {
                let power1 = await getAddressStakeInfo(pool1Contract, input.trim());
                let power2 = await getAddressStakeInfo(pool2Contract, input.trim());
                let power3 = await getAddressStakeInfo(pool3Contract, input.trim());
                power = ((Number(power1) + Number(power2) + Number(power3)) / 1000000000000000000).toFixed(5);
                if (power == 0) {
                    alert("No staked NFT found in your wallet");
                    return;
                }
            }
            else if (input.startsWith("0x") && input.trim().length !== 42) {
                alert("You entered incorrect BSC address");
            }
            else if (Number.isInteger(+input)) {
                let stakeInfo = await getStakeInfo(pool1Contract, input);
                if (stakeInfo != null) {
                    let stakeRate = Number(stakeInfo.stakeRate) / 100000;
                    let degoAmount = Number(stakeInfo.degoAmount) / 1000000000000000000;
                    power = stakeRate * degoAmount;
                } else {
                    alert('GEGO ID not found')
                }
            }
            else {
                alert('GEGO ID not found')
            }
            if (power > 0) {
                let estimatedPayout1 = (power * RewardPerPower1 * 0.85).toFixed(5);
                let estimatedPayout2 = (power * RewardPerPower2 * 0.85).toFixed(5);
                let estimatedPayout3 = (power * RewardPerPower3 * 0.85).toFixed(5);
                $('div#bsc-payout1').html(`<p style="color:red"> Estimated Mining Payout(1 Day): ${estimatedPayout1} DEGO </p>`);
                $('div#bsc-payout2').html(`<p style="color:red"> Estimated Mining Payout(1 Day): ${estimatedPayout2} DEGO </p>`);
                $('div#bsc-payout3').html(`<p style="color:red"> Estimated Mining Payout(1 Day): ${estimatedPayout3} DEGO </p>`);
            }

        });
    }
}
async function botMiningPools() {
    const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org"));
    const pool1 = '0x9ec557ad4f938f6027260a2c6d7f943ba7a90e76';
    const pool2 = '0xa8fa9c457eda354d14e389148452dba91d6945cc';

    let pool1Contract = null, pool2Contract = null;
    let abi = await getBscContractABI(pool1);
    if (abi !== '') {
        pool1Contract = new web3.eth.Contract(abi, pool1);
        pool2Contract = new web3.eth.Contract(abi, pool2);

        let pool1RewardRate = await getRewardRate(pool1Contract);
        let pool2RewardRate = await getRewardRate(pool2Contract);

        let pool1TotalSupply = await getTotalSupply(pool1Contract);
        let pool2TotalSupply = await getTotalSupply(pool2Contract);

        let RewardPerPower1 = getRewardPerPower(pool1RewardRate, pool1TotalSupply);
        let RewardPerPower2 = getRewardPerPower(pool2RewardRate, pool2TotalSupply);

        let pools = ` <br/>
        <div class="container">
        <div class="row justify-content-center">
        <div class="col-md-4">
            <div class="card mb">
                <img class="card-img-top" src="./images/GigaFactory1.png">
                <div class="card-body mb">
                    <h5 class="card-title">GigaFactory Nevada</h5>
                    <p class="card-text">Total Power: ${(pool1TotalSupply).toFixed(0)}</p>
                    <p class="card-text">Reward Rate(1 Day): ${pool1RewardRate.toFixed(5)} BOT</p>
                    <p class="card-text">Reward/Power(1 Day): ${RewardPerPower1.toFixed(5)} BOT</p>
                    <div id="bot-payout1"></div>

                </div>
            </div>
        </div>
        <div class="col-md-4">
                    <div class="card mb">
                        <img class="card-img-top" src="./images/GigaFactory2.png">
                        <div class="card-body mb">
                            <h5 class="card-title">GigaFactory Shanghai</h5>
                            <p class="card-text">Total Power: ${(pool2TotalSupply).toFixed(0)}</p>
                            <p class="card-text">Reward Rate(1 Day): ${pool2RewardRate.toFixed(5)} BOT</p>
                            <p class="card-text">Reward/Power(1 Day): ${RewardPerPower2.toFixed(5)} BOT</p>
                            <div id="bot-payout2"></div>

                        </div>
                    </div>
                </div>
    </div>
           
        </div>
    <br/>
    <p><small>* Notes: 5% of the mining rewards will go to the team and 10% of mining rewards will go to the reward pool</small></p>
    `
        $('div#botPoolsDisplay').html(pools);
        $('#bot-calculate').submit(async function (e) {
            e.preventDefault();
            const input = $('#botInput').val().trim();
            if(input===''){
                alert("Please enter your GEGO ID or BSC address");
                return;
            }
            let power1 = 0;
            let power2 = 0;
            if (input.startsWith('0x') && input.trim().length === 42) {
                let holdingPower1 = await getAddressStakeInfo(pool1Contract, input.trim());
                let holdingPower2 = await getAddressStakeInfo(pool2Contract, input.trim());
                power1 = ((Number(holdingPower1)) / 1000000000000000000).toFixed(5);
                power2 = ((Number(holdingPower2)) / 1000000000000000000).toFixed(5);
                // if (power == 0) {
                //     alert("No staked NFT found in your wallet");
                //     return;
                // }
            }
            else if (input.startsWith("0x") && input.trim().length !== 42) {
                alert("You entered incorrect BSC address");
            }
            else if (Number.isInteger(+input)) {
                let stakeInfo1 = await getStakeInfo(pool1Contract, input);
                let stakeInfo2 = await getStakeInfo(pool2Contract, input);


                if (stakeInfo1 != null) {
                    let stakeRate = Number(stakeInfo1.stakeRate) / 100000;
                    let degoAmount = Number(stakeInfo1.amount) / 1000000000000000000;
                    if (degoAmount > 1000000) {
                        power1 = 0;
                    } else {
                        power1 = stakeRate * degoAmount;
                    }
                }
                if (stakeInfo2 != null) {
                    let stakeRate = Number(stakeInfo2.stakeRate) / 100000;
                    let degoAmount = Number(stakeInfo2.amount) / 1000000000000000000;
                    if (degoAmount > 1000000) {
                        power2 = 0;
                    } else {
                        power2 = stakeRate * degoAmount;
                    }
                }

            }
            else {
                alert('GEGO ID not found')
            }
            if (power1 > 0) {
                let estimatedPayout1 = (power1 * RewardPerPower1 * 0.85).toFixed(5);

                $('div#bot-payout1').html(`<p style="color:red"> Estimated Mining Payout(1 Day): ${estimatedPayout1} BOT </p>`);

            }
            if (power2 > 0) {
                let estimatedPayout2 = (power2 * RewardPerPower2 * 0.85).toFixed(5);

                $('div#bot-payout2').html(`<p style="color:red"> Estimated Mining Payout(1 Day): ${estimatedPayout2} BOT </p>`);

            }

        });
    }
}
function getLatestBot() {
    return new Promise((resolve, reject) => {
        axios.get('https://api.blurt.buzz/dego_nft_bot_latest').then(function (response) {
            if (response.status == 200) {
                let data = response.data;
                resolve(data);

            }

        });

    });
}
async function latestBotPage() {
    let latestBots = await getLatestBot();
    let carouselItems = "";
    for (let i = 0; i < latestBots.length; i++) {
        let header = '';
        if (i === 0) {
            header = '<div class="carousel-item active">';
        } else {
            header = '<div class="carousel-item">';
        }
        carouselItems += `${header}
        <a href="https://bscscan.com/token/0x36633b70eac3d1c98a20a6ecef6033d1077372f5?a=${latestBots[i].id}">
        <span class="position-relative mx-2 badge badge-primary rounded-0">${latestBots[i].id}</span></a> <a class="text-white" href="https://bscscan.com/token/0x36633b70eac3d1c98a20a6ecef6033d1077372f5?a=${latestBots[i].id}">LV${latestBots[i].grade} | Quality: ${latestBots[i].quality} | Casting Par Value: ${latestBots[i].degoAmount} BOT | Power: ${latestBots[i].power}</a>
    </div>`;

    }
    $('div#latestBot').html(carouselItems);
}

bscPage();
kucoinPage();
botPage();
latestBotPage();
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
    let htmlString = `<div class="table-responsive"><table class="table" id="dvlist" style="width:100%"> <thead class="thead-light">
    <tr>
    <th >Image</th>
      <th >Name</th>
      <th >Count</th>
      <th >Percentage</th>
      <th >Total DEGO Amount</th>
    </tr></thead><tbody>`;
    let stats = await getNftStats('https://api.blurt.buzz/dego_nft');
    let labels = [];
    let data = [];
    let totalCount = 0;
    let totalDegoAmount = 0;
    let totalValue = 0;
    for (let d of stats) {

        htmlString += `<td><img src="${d.image}" width="50" height="50"></span></td>`;
        htmlString += `<td><span>${d.name}</span></td>`;
        htmlString += `<td><span>${d.count}</span></td>`;
        htmlString += `<td><span>${d.percentage}%</span></td>`;
        htmlString += `<td><span>${d.value}</span></td>`;
        htmlString += '</tr>';
        labels.push(d.name);
        data.push(d.count);
        totalCount += d.count;
        totalDegoAmount += d.degoAmount;
        totalValue += d.value;
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
                  <p class="count-text">Total Airdrop NFTs DEGO Par Value</p>
              </div>
          
      </div>
    
  
  </div>
</section>`;
    $('div#summary').html(summary);



    const web3 = new Web3(new Web3.providers.HttpProvider("https://api.infura.io/v1/jsonrpc/mainnet"));
    const pool1 = '0xbd277e47d0ECDd5db6c57Eda717dD8F5a329EDEC';
    const pool2 = '0xa773C5a484789117d51019dB07307DAc326DE87c';
    const pool3 = '0xB86021cbA87337dEa87bc055666146a263c9E0cd';
    let pool1Contract = null, pool2Contract = null, pool3Contract = null;
    let abi = await getContractABI(pool1);
    if (abi !== '') {
        pool1Contract = new web3.eth.Contract(abi, pool1);
        pool2Contract = new web3.eth.Contract(abi, pool2);
        pool3Contract = new web3.eth.Contract(abi, pool3);
        let pool1RewardRate = await getRewardRate(pool1Contract);
        let pool2RewardRate = await getRewardRate(pool2Contract);
        let pool3RewardRate = await getRewardRate(pool3Contract);
        let pool1TotalSupply = await getTotalSupply(pool1Contract);
        let pool2TotalSupply = await getTotalSupply(pool2Contract);
        let pool3TotalSupply = await getTotalSupply(pool3Contract);
        let RewardPerPower1 = getRewardPerPower(pool1RewardRate, pool1TotalSupply);
        let RewardPerPower2 = getRewardPerPower(pool2RewardRate, pool2TotalSupply);
        let RewardPerPower3 = getRewardPerPower(pool3RewardRate, pool3TotalSupply);

        let pools = ` <br/><div class="row">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="card mb">
                        <img class="card-img-top" src="./images/pool1.png">
                        <div class="card-body mb">
                            <h5 class="card-title">La Rinconada Pool</h5>
                            <p class="card-text">Total Power: ${(pool1TotalSupply).toFixed(0)}</p>
                            <p class="card-text">Reward Rate(1 Day): ${pool1RewardRate.toFixed(5)} DEGO</p>
                            <p class="card-text">Reward/Power(1 Day): ${RewardPerPower1.toFixed(5)} DEGO</p>
                            <div id="payout1"></div>

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card mb">
                        <img class="card-img-top" src="./images/pool2.png">
                        <div class="card-body mb">
                            <h5 class="card-title">Dharavi Pool</h5>
                            <p class="card-text">Total Power: ${pool2TotalSupply.toFixed(0)}</p>
                            <p class="card-text">Reward Rate(1 Day): ${pool2RewardRate.toFixed(5)} DEGO</p>
                            <p class="card-text">Reward/Power(1 Day): ${RewardPerPower2.toFixed(5)} DEGO</p>
                            <div id="payout2"></div>

                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card mb">
                        <img class="card-img-top" src="./images/pool3.png">
                        <div class="card-body mb">
                            <h5 class="card-title">Krugersdrop Pool</h5>
                            <p class="card-text">Total Power: ${pool3TotalSupply.toFixed(0)}</p>
                            <p class="card-text">Reward Rate(1 Day): ${pool3RewardRate.toFixed(5)} DEGO</p>
                            <p class="card-text">Reward/Power(1 Day): ${RewardPerPower3.toFixed(5)} DEGO</p>
                            <div id="payout3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br/>
    <p><small>* Notes: 5% of the mining rewards will go to the team and 10% of mining rewards will go to the reward pool</small></p>
    `
        $('div#poolsDisplay').html(pools);
        $('#calculate').submit(async function (e) {
            e.preventDefault();
            const input = $('#gegoid').val().trim();
            if(input===''){
                alert("Please enter your GEGO ID or ETH address");
                return;
            }
            let power = 0;
            if (input.startsWith('0x') && input.trim().length === 42) {
                let power1 = await getAddressStakeInfo(pool1Contract, input.trim());
                let power2 = await getAddressStakeInfo(pool2Contract, input.trim());
                let power3 = await getAddressStakeInfo(pool3Contract, input.trim());
                power = ((Number(power1) + Number(power2) + Number(power3)) / 1000000000000000000).toFixed(5);
                if (power == 0) {
                    alert("No staked NFT found in your wallet");
                    return;
                }
            }
            else if (input.startsWith("0x") && input.trim().length !== 42) {
                alert("You entered incorrect ETH address");
            }
            else if (Number.isInteger(+input)) {
                let stakeInfo = await getStakeInfo(pool1Contract, input);
                if (stakeInfo != null) {
                    let stakeRate = Number(stakeInfo.stakeRate) / 100000;
                    let degoAmount = Number(stakeInfo.degoAmount) / 1000000000000000000;
                    power = stakeRate * degoAmount;
                } else {
                    alert('GEGO ID not found')
                }
            }
            else {
                alert('GEGO ID not found')
            }
            if (power > 0) {
                let estimatedPayout1 = (power * RewardPerPower1 * 0.85).toFixed(2);
                let estimatedPayout2 = (power * RewardPerPower2 * 0.85).toFixed(2);
                let estimatedPayout3 = (power * RewardPerPower3 * 0.85).toFixed(2);
                $('div#payout1').html(`<p style="color:red"> Estimated Mining Payout(1 Day): ${estimatedPayout1} DEGO </p>`);
                $('div#payout2').html(`<p style="color:red"> Estimated Mining Payout(1 Day): ${estimatedPayout2} DEGO </p>`);
                $('div#payout3').html(`<p style="color:red"> Estimated Mining Payout(1 Day): ${estimatedPayout3} DEGO </p>`);
            }

        });
    }

    bscMiningPools()
    botMiningPools()
});
