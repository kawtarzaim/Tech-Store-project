let myChart = null; 

function updateDashboard() {
    const products = Data.getProducts();
    const categories = Data.getCategories();

    document.getElementById('kpi-count').innerText = products.length;


    let totalValue = 0;
    products.forEach(p => {
        totalValue += p.price * p.stock;
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
        
        const cat = categories.find(c => c.id == p.categoryId);
        if (cat) {
            stockParCat[cat.name] += p.stock;
        }
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


function loadExternalData() {
    const list = document.getElementById('api-users-list');

   
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json()) N
        .then(data => {
            
            list.innerHTML = ''; 

            
            const users = data.slice(0, 3);

            users.forEach(user => {
                list.innerHTML += `<li><strong>${user.name}</strong> - ${user.email}</li>`;
            });
        })
        .catch(error => {
            console.error("Erreur API:", error);
            list.innerHTML = `<li style="color:red">Erreur de chargement</li>`;
        });
}
