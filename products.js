function loadProducts(productsToList = null) {
   
    if (!productsToList) {
        productsToList = Data.getProducts();
    }

    const categories = Data.getCategories();
    const tbody = document.getElementById('products-body');
    tbody.innerHTML = '';

    productsToList.forEach(prod => {
        
        const cat = categories.find(c => c.id == prod.categoryId);
        const catName = cat ? cat.name : 'Inconnu';

        tbody.innerHTML += `
            <tr>
                <td>${prod.name}</td>
                <td>${prod.price} MAD</td>
                <td>${catName}</td>
                <td>${prod.stock}</td>
                <td>
                    <button class="btn" onclick="editProduct(${prod.id})">Modifier</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${prod.id})">Supprimer</button>
                </td>
            </tr>
        `;
    });
}

function updateCategorySelects() {
   
    const categories = Data.getCategories();

    
    const formSelect = document.getElementById('p-category');
    let options = '<option value="">Choisir...</option>';
    categories.forEach(c => {
        options += `<option value="${c.id}">${c.name}</option>`;
    });
    formSelect.innerHTML = options;

   
    const filterSelect = document.getElementById('filter-select');
    let filterOptions = '<option value="">Toutes les catégories</option>';
    categories.forEach(c => {
        filterOptions += `<option value="${c.id}">${c.name}</option>`;
    });
    filterSelect.innerHTML = filterOptions;
}

function openProductModal() {
   
    document.getElementById('p-id').value = '';
    document.getElementById('p-name').value = '';
    document.getElementById('p-price').value = '';
    document.getElementById('p-stock').value = '';
    document.getElementById('p-category').value = '';

    updateCategorySelects();
    document.getElementById('product-modal').style.display = 'flex';
}

function editProduct(id) {
    const products = Data.getProducts();
    const prod = products.find(p => p.id == id);

    if (prod) {
        updateCategorySelects();
        document.getElementById('p-id').value = prod.id;
        document.getElementById('p-name').value = prod.name;
        document.getElementById('p-price').value = prod.price;
        document.getElementById('p-stock').value = prod.stock;
        document.getElementById('p-category').value = prod.categoryId;

        document.getElementById('product-modal').style.display = 'flex';
    }
}

function saveProduct(event) {
    event.preventDefault();

    const idStr = document.getElementById('p-id').value;
    const name = document.getElementById('p-name').value;
    const price = Number(document.getElementById('p-price').value);
    const stock = Number(document.getElementById('p-stock').value);
    const categoryId = document.getElementById('p-category').value;

    let products = Data.getProducts();

    if (idStr) {
        
        const index = products.findIndex(p => p.id == idStr);
        if (index !== -1) {
            products[index] = { id: Number(idStr), name, price, stock, categoryId: Number(categoryId) };
        }
    } else {
        // AJOUT
        const newProd = {
            id: Date.now(),
            name: name,
            price: price,
            stock: stock,
            categoryId: Number(categoryId)
        };
        products.push(newProd);
    }

    Data.saveProducts(products);
    closeModals();
    loadProducts();
    updateDashboard(); 
}

function deleteProduct(id) {
    if (confirm("Supprimer ce produit ?")) {
        let products = Data.getProducts();
        products = products.filter(p => p.id != id);
        Data.saveProducts(products);
        loadProducts();
        updateDashboard();
    }
}

// Fonction de recherche et filtre
function filterProducts() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const catFilter = document.getElementById('filter-select').value;

    let products = Data.getProducts();

   
    if (search) {
        products = products.filter(p => p.name.toLowerCase().includes(search));
    }

    
    if (catFilter) {
        products = products.filter(p => p.categoryId == catFilter);
    }

    loadProducts(products);
}


function sortProducts(criteria) {
    let products = Data.getProducts();

    products.sort((a, b) => {
        if (criteria === 'price') return a.price - b.price;
        if (criteria === 'name') return a.name.localeCompare(b.name);
    });

    loadProducts(products);
}
