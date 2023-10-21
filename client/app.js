import { createChart } from '../client/node_modules/lightweight-charts/dist/lightweight-charts.standalone.production.mjs';

const searchForm = document.getElementById("search-form");
const inputSearch = document.getElementById("input-search");

const functionState = "TIME_SERIES_DAILY";
const apiKey = "GT8A8UTQ3YYZKXW";

//GET USER SEARCH DATA
getSearchValue();
function getSearchValue() {
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let symbolSearch = inputSearch.value;
        const API_CHARTS = `https://www.alphavantage.co/query?function=${functionState}&symbol=${symbolSearch}&apikey=${apiKey}`;
        getDataSeries(API_CHARTS);
    })
}

//GET DATA FROM API
function getValueApi(API_CHARTS, dataCharts, dataChecked) {
    fetch(API_CHARTS).then(Response => {
        Response.json().then(json => {
            let index = 0;
            const data = json["Time Series (Daily)"];
            for (let key in data) {
                dataCharts[index] = {
                    time: key,
                    value: Number(data[key]["1. open"])
                }
                index++;
            }
            dataChecked = dataCharts.toReversed();
            baselineSeries.setData(dataChecked);
            chart.timeScale().fitContent();
        })
    })
}

//CREATING CHART
const chart = createChart(document.getElementById("chart-container"), { width: 400, height: 400 });
const baselineSeries = chart.addAreaSeries();

async function getDataSeries(API_CHARTS) {
    let dataCharts = [];
    let dataChecked = null;
    getValueApi(API_CHARTS, dataCharts, dataChecked);
}
