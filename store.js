// // Données par défaut si le LocalStorage est vide
// const defaultCategories = [
//     { id: 1, name: 'Ordinateurs' },
//     { id: 2, name: 'Smartphones' },
//     { id: 3, name: 'Accessoires' }
// ];

// const defaultProducts = [
//     { id: 1, name: 'MacBook Pro', price: 15000, categoryId: 1, stock: 10 },
//     { id: 2, name: 'iPhone 17', price: 8000, categoryId: 2, stock: 20 }
// ];

// Gestion des données (Data Layer simple)
const Data = {
    // Récupérer les catégories
    getCategories: function () {
        const cats = localStorage.getItem('categories');
        if (cats) {
            return JSON.parse(cats);
        } else {
            Init();
        }
    },

    // Sauvegarder les catégories
    saveCategories: function (categories) {
        localStorage.setItem('categories', JSON.stringify(categories));
    },

    // Récupérer les produits
    getProducts: function () {
        const prods = localStorage.getItem('products');
        if (prods) {
            return JSON.parse(prods);
        }
    },

    // Sauvegarder les produits
    saveProducts: function (products) {
        localStorage.setItem('products', JSON.stringify(products));
    }
};


function remplir(data) {
    let categories = [];
    let products = [];

    data.forEach((e, i) => {
        if (e.category == "electronics") {
            if (!categories.find(f => f.name == e.category)) {
                categories.push({ "id": i, "name": e.category })
            }
            products.push(e);
        }
    });
    localStorage.setItem("categories", JSON.stringify(categories))
    localStorage.setItem("products", JSON.stringify(products))

}

function Init() {
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            remplir(data)
        }
        )
}
