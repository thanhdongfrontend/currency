const arrBase = document.getElementById('arrowBase')
const baseList = document.getElementById('base-list')
const targetList = document.getElementById('target-list')
const baseOption = document.getElementsByClassName('base-currency-items')
const targetOption = document.getElementsByClassName('target-currency-items')
const selectedBaseCurr = document.getElementById('selected-base')
const selectedTargetCurr = document.getElementById('selected-target')
const arrTarget = document.getElementById('arrowTarget')
const resultValue = document.getElementById('result')

var duration = 365;
var baseCurrencyChart = 'USD';
var targetCurrencyChart = 'VND';
var today = new Date()
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 

if(mm<10) 
{
    mm='0'+mm;
}
var priorDate = new Date(new Date().setDate(today.getDate() - duration));
var dd1 = priorDate.getDate();
var mm1 = priorDate.getMonth()+1; 
var yyyy1 = priorDate.getFullYear();
if(dd1<10) 
{
    dd1='0'+dd1;
} 

if(mm1<10) 
{
    mm1='0'+mm1;
}
var start_date = yyyy1+'-'+mm1+'-'+dd1
var end_date = yyyy+'-'+mm+'-'+dd
const timeOut = setTimeout(function(){
    show_chart();
},1)

arrBase.addEventListener('click',function(){
    baseList.classList.toggle('active')
    arrBase.classList.toggle('down')
    arrBase.classList.toggle('fa-xmark')
    arrBase.classList.toggle('fa-angle-right')
})

for (opt of baseOption) {
    $(opt).click(function(){
    selectedBaseCurr.textContent = this.textContent
    baseCurrencyChart = this.textContent.trim()
    show_chart()
    baseList.classList.toggle('active')
    arrBase.classList.toggle('down')
    arrBase.classList.toggle('fa-xmark')
    arrBase.classList.toggle('fa-angle-right')
    })
}

arrTarget.addEventListener('click',function(){
    targetList.classList.toggle('active')
    arrTarget.classList.toggle('down')
    arrTarget.classList.toggle('fa-xmark')
    arrTarget.classList.toggle('fa-angle-right')
})

for (opt of targetOption) {
    $(opt).click(function(){
        selectedTargetCurr.textContent = this.textContent
        targetCurrencyChart = this.textContent.trim()
        show_chart()
        targetList.classList.toggle('active')
        arrTarget.classList.toggle('down')
        arrTarget.classList.toggle('fa-xmark')
        arrTarget.classList.toggle('fa-angle-right')
    })
}

const interval = setInterval(function(){
  show_chart();
},60000)


function show_chart() {
    var requestURL = 'https://api.exchangerate.host/timeseries?start_date='+start_date+'&end_date='+end_date+'&base='+baseCurrencyChart+'&symbols='+targetCurrencyChart;
    
    fetch(requestURL)
.then((response) => response.json())
.then((data) => {
  let result = renderRate(data.rates)
  const {daysList,ratesList} = result;
  show({daysList,ratesList})
})
.catch((error) => {
  console.error("Error:", error);
});

const renderRate = (list) => {
  let daysList = Object.keys(list)
  daysList.forEach(function(element,index){
    daysList[index]= daysList[index].split("-").reverse().join("/");
  })
  let ratesList = Object.values(list).map((item) => Object.values(item)[0])
  return {
    daysList,
    ratesList
  }
}

const chart = ({ daysList: daysList, ratesList: ratesList }) => {
    
};
const show = ({ daysList: daysList, ratesList: ratesList }) => {
  const labels = daysList;

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Timeframe of exchange rate of '+baseCurrencyChart+ ' to '+targetCurrencyChart,
        backgroundColor: "transparent",
        borderColor: "#EFFF00 ",
        data: ratesList,
        pointRadius: 0,
        borderWidth: 3,
        pointBorderColor: '#EFFF00',
        pointBackgroundColor: '#EFFF00',
        pointHoverBackgroundColor: '#EFFF00',
        pointHoverBorderColor: '#EFFF00',
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      hover: {
          intersect: false,
      }
    },
  };

  document.getElementById("viewChart").innerHTML =
    '<canvas id="myChart"></canvas>';

  const myChart = new Chart(document.getElementById("myChart"), config);
};
}

$('.btn').on('click', function() {
    $('.btn').removeClass('clicked');
    $(this).addClass('clicked');
 });

var month = document.getElementById('30days');
var three_months = document.getElementById('90days');
var six_months = document.getElementById('180days');
var year = document.getElementById('366days');
 
month.addEventListener('click', function(){  
    duration = 30;
    priorDate = new Date(new Date().setDate(today.getDate() - duration));
    dd1 = priorDate.getDate();
    mm1 = priorDate.getMonth()+1; 
    yyyy1 = priorDate.getFullYear();
    if(dd1<10) 
    {
        dd1='0'+dd1;
    } 

    if(mm1<10) 
    {
        mm1='0'+mm1;
    }
    start_date = yyyy1+'-'+mm1+'-'+dd1
    end_date = yyyy+'-'+mm+'-'+dd
    // $("canvas#myChart").remove();
    show_chart()
 })
 

three_months.addEventListener('click',function(){
  duration = 90;
  priorDate = new Date(new Date().setDate(today.getDate() - duration));
  dd1 = priorDate.getDate();
  mm1 = priorDate.getMonth()+1; 
  yyyy1 = priorDate.getFullYear();
  if(dd1<10) 
  {
      dd1='0'+dd1;
  } 

  if(mm1<10) 
  {
      mm1='0'+mm1;
  }
  start_date = yyyy1+'-'+mm1+'-'+dd1
  end_date = yyyy+'-'+mm+'-'+dd
  // $("canvas#myChart").remove();
  show_chart()
})

 six_months.addEventListener('click',function(){
  duration = 180;
    priorDate = new Date(new Date().setDate(today.getDate() - duration));
    dd1 = priorDate.getDate();
    mm1 = priorDate.getMonth()+1; 
    yyyy1 = priorDate.getFullYear();
    if(dd1<10) 
    {
        dd1='0'+dd1;
    } 

    if(mm1<10) 
    {
        mm1='0'+mm1;
    }
    start_date = yyyy1+'-'+mm1+'-'+dd1
    end_date = yyyy+'-'+mm+'-'+dd
    // $("canvas#myChart").remove();
    show_chart()
})

year.addEventListener('click',function(){
  duration = 366;
  priorDate = new Date(new Date().setDate(today.getDate() - duration));
  dd1 = priorDate.getDate();
  mm1 = priorDate.getMonth()+1; 
  yyyy1 = priorDate.getFullYear();
  if(dd1<10) 
  {
      dd1='0'+dd1;
  } 

  if(mm1<10) 
  {
      mm1='0'+mm1;
  }
  start_date = yyyy1+'-'+mm1+'-'+dd1
  end_date = yyyy+'-'+mm+'-'+dd
  // $("canvas#myChart").remove();
  show_chart()
})

function converter() {
  let fromCurrency = document.getElementById('from').value;
  let toCurrency = document.getElementById('to').value;
  let dateConvert = document.getElementById('date').value;
  let amountConvert = document.getElementById('amount').value;
  console.log(resultValue);
  let api = 'https://api.exchangerate.host/convert?from='+fromCurrency+'&to='+toCurrency+'&date='+dateConvert+'&amount='+amountConvert;
  fetch (api)
    .then((response) => response.json())
    .then((data)=>{
      let result = new Intl.NumberFormat('en-US').format(data.result)
      resultValue.innerHTML = result
    })
}

const btnSubmit = document.getElementById('submit-btn')
btnSubmit.addEventListener('click',function(){
  converter()
})

