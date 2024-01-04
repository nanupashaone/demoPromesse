const genererNombre = () => {
    return Math.floor(Math.random() * 3 + 1);
}

const preparer = () => {
    setTimeout(() => {
        const chance = genererNombre();
        if(chance == 2) {
            console.log('Oh non, les oeufs étaient pourris 😢');
        } else {
            console.log('Les oeufs sont battus 🥚');
        }
    }, 3000)
}

const cuire = () => {
    setTimeout(() => {
        const chance = genererNombre();
        if(chance == 2) {
            console.log('L\'omelette est crâmée 🔥');
        } else {
            console.log('L\'omelette est prête ! 🍳');
        }
    }, 2000)
}

const servir = () => {
    setTimeout(() => {
        const chance = genererNombre();
        if(chance == 2) {
            console.log('Le serveur est tombé !');
        } else {
            console.log('Voici votre omelette, bon appétit !');
        }
    }, 1000)
}

preparer();
cuire();
servir();