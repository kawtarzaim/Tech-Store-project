function loadCategories() {
    const categories = Data.getCategories();
    const tbody = document.getElementById('categories-body');
    tbody.innerHTML = '';

    categories.forEach((cat, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${cat.id}</td>
                <td>${cat.name}</td>
                <td>
                    <button class="btn btn-danger" onclick="deleteCategory(${cat.id})">Supprimer</button>
                </td>
            </tr>
        `;
    });
}

function openCategoryModal() {
    document.getElementById('category-modal').style.display = 'flex';
}

function saveCategory(event) {
    event.preventDefault();

    const nameInput = document.getElementById('c-name');
    const name = nameInput.value;

    const categories = Data.getCategories();

   
    const newId = Date.now();

    categories.push({
        id: newId,
        name: name
    });

    Data.saveCategories(categories);

    
    nameInput.value = '';
    closeModals();

    
    loadCategories();

   
    updateCategorySelects();
    updateDashboard(); 
}

function deleteCategory(id) {
    if (confirm("Voulez-vous vraiment supprimer cette catégorie ?")) {
        let categories = Data.getCategories();
        categories = categories.filter(c => c.id !== id);
        Data.saveCategories(categories);
        loadCategories();
        updateCategorySelects();
        updateDashboard();
    }
}
