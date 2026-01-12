document.addEventListener('DOMContentLoaded', () => {
    console.log("Application Démarrée");

    // Charger les données initiales
    loadCategories();
    loadProducts();
    updateCategorySelects();

    // Charger le dashboard
    updateDashboard();

    // Charger l'API externe
    loadExternalData();
});


// Fonction pour changer de page (SPA)
function showSection(sectionId) {
    // 1. Cacher toutes les sections
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
        sec.classList.remove('active');
    });

    // 2. Afficher la section demandée
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.add('active');
    }

    // 3. Mettre à jour le bouton actif dans le menu
    const buttons = document.querySelectorAll('.menu button');
    buttons.forEach(btn => btn.classList.remove('active'));

    const activeBtn = document.getElementById('btn-' + sectionId);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    // 4. Mettre à jour le titre
    const titles = {
        'dashboard': 'Dashboard',
        'products': 'Gestion des Produits',
        'categories': 'Gestion des Catégories'
    };
    document.getElementById('page-title').innerText = titles[sectionId];
}

// Fonction utilitaire pour fermer les modals
function closeModals() {
    document.getElementById('product-modal').style.display = 'none';
    document.getElementById('category-modal').style.display = 'none';
}
