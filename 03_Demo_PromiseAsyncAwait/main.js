//#region promise division
const division = (nombre1, nombre2) => {
    return new Promise((resolve, reject) => {
        if(nombre2 != 0){
            resolve(nombre1/nombre2);
        }
        else {
            reject('Division par 0 impossible !')
        }
    })
}
//#endregion promise division

//#region exécution division
division(15,0)
    .then((res) => {
        // Traitement à effectuer si la promesse est tenue 
        console.log(`Le résultat de la division est ${res}`);
    })
    .catch((err) => {
        // Traitement à effectuer si la promesse n'est pas tenue
        console.log(err);
    })
    .finally(() => {
        // Traitement à effectuer à la fin, que la promesse soit tenue ou non
        console.log('Fin de la tentative de division');
    });
//#endregion

const genererNombre = () => {
    return Math.floor(Math.random() * 3 + 1);
}

const preparer = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const chance = genererNombre();
            if(chance == 2) {
                reject('Oh non, les oeufs étaient pourris 😢');
            } else {
                resolve('Les oeufs sont battus 🥚');
            }
        }, 3000)
    })
}

const cuire = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const chance = genererNombre();
            if(chance == 2) {
                reject('L\'omelette est crâmée 🔥');
            } else {
                resolve('L\'omelette est prête ! 🍳');
            }
        }, 2000)
    })
}

const servir = () => {
    return new Promise( (resolve, reject) => { 
        setTimeout(() => {
            const chance = genererNombre();
            if(chance == 2) {
                reject('Le serveur est tombé !');
            } else {
                resolve('Voici votre omelette, bon appétit !');
            }
        }, 1000)
    })
}

const cuisiner = async() => {
    // "Attends que la préparation soit finie et stock le résultat dans la variable prep"
    try {
        const prep = await preparer();
        console.log(prep);
        const cui = await cuire();
        console.log(cui);
        const serv = await servir();
        console.log(serv);

    }
    catch(err) {
        console.log(err);
    }
    console.log('Au revoir');

}

cuisiner();