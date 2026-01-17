let myChart = null;

function updateDashboard() {
    const products = Data.getProducts();
    const categories = Data.getCategories();

    document.getElementById('kpi-count').innerText = products.length;


    let totalValue = 0;
    products.forEach(p => {
        totalValue += p.price * p.rating.count;
    });
    document.getElementById('kpi-value').innerText = totalValue + " MAD";


    updateChart(products, categories);
}

function updateChart(products, categories) {
    const ctx = document.getElementById('myChart');
    if (!ctx) return;

    const stockParCat = {};

    categories.forEach(c => {
        stockParCat[c.name] = 0;
    });

    products.forEach(p => {
        stockParCat[p.category] += p.rating.count;
    });


    const labels = Object.keys(stockParCat);
    const dataValues = Object.values(stockParCat);


    if (myChart) {
        myChart.destroy();
    }


    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock',
                data: dataValues,
                backgroundColor: '#3498db'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
