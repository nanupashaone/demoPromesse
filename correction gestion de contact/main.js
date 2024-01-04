// Récupération des élem HTML
const inputFirstname = document.getElementById('firstname');
const inputLastname = document.getElementById('lastname');
const inputBirthdate = document.getElementById('birthdate');
const inputTel = document.getElementById('tel');

const btnAdd = document.getElementById('add-btn');
const btnDelete = document.getElementById('del-btn');

const errorMsg = document.getElementById('error-msg');

const showContacts = document.getElementById('contacts');

// Setup utils var
let contacts = [];

// Setup du bouton add
btnAdd.addEventListener('click', async () => {
    resetError();

    //#region avec then...catch
    // noEmptyInput()
    //     .then(() => {
    //         isAdult()
    //             .then(() => {
    //                 noFullContacts()
    //                     .then(() => {

    //                     })
    //                     .catch(() => {})
    //             })
    //             .catch(() => {})
    //     })
    //     .catch(() => {})
    //#endregion
    try {
        await noEmptyInput();
        await isAdult();
        await noFullContacts();
        let contactToAdd = {
            lastname: inputLastname.value.trim(),
            firstname: inputFirstname.value.trim(),
            birthdate: new Date(inputBirthdate.value).toLocaleDateString('fr-BE', { day: "2-digit", month: "long", year: "numeric" }),
            tel: inputTel.value.trim()
        }
        contacts.push(contactToAdd);
        resetForm();
        displayContacts();

    }
    catch (err) {
        displayError(err);
    }
})

btnDelete.addEventListener('click', async () => {
    resetError();
    try {
        await noEmptyLastFirstName();
        await isInList();
        // La méthode filter renvoie le tableau sur lequel elle est utilisée qui ne contient que les éléments qui correspondent au prédicat (condition) renseigné
        // Je dois filter pour ne récupérer les personnes qui n'ont pas le même prénom et pas le même nom 
        contacts = contacts.filter(contact => !(contact.lastname == inputLastname.value && contact.firstname == inputFirstname.value));

        // Attention ici, on filtre chacun des contacts pour ne garder que ce qui n'ont ni un nom semblable à ce qui est tapé, ni un prénom semblable à ce qui est tapé mais individuellement. Si deux personnes ont le même prénom ou le même nom, elles seront toutes les deux sup
        // contacts = contacts.filter(contact => contact.lastname != inputLastname.value && contact.firstname != inputFirstname.value);
        displayContacts();
    }
    catch (err) {
        displayError(err);
    }
})


// À l'aide de promesses :
// Ajouter dans la liste de contacts si tous les champs sont justes
const noEmptyInput = () => {
    return new Promise((resolve, reject) => {
        if (inputLastname.value.trim() != '' && inputFirstname.value.trim() != '' && inputBirthdate.value != '' && inputTel.value.trim() != '') {
            // resolve('formulaire bien rempli');
            // resolve() ne renvoie pas forcément de données, on peut juste le déclencher pour prévenir que la promesse est tenue, ça nous permet d'utiliser le .then (ou de passer à la suite du traitement avec await) sans avoir de résultat à traiter
            resolve();
        }
        else {
            reject('Veuillez remplir tous les champs du formulaire !')
        }
    })
}

// Ajouter dans la liste de contacts si la personne est majeure
const isAdult = () => {
    return new Promise((resolve, reject) => {
        const todayYear = new Date().getFullYear();
        // attention inputBirthdate.value est une chaine de caractère, on doit d'abord en faire une date pour utiliser la méthode getFullYear
        const birthdateYear = new Date(inputBirthdate.value).getFullYear();
        if (todayYear - birthdateYear >= 18) {
            resolve();
        } else {
            reject('Vous ne pouvez encoder que des contacts majeurs !');
        }
    })
}

// Ajouter dans la liste de contacts si celle ci n'est pas pleine (nous avons le droit à 10 contacts max (oui c'est peu))
const noFullContacts = () => {
    return new Promise((resolve, reject) => {
        if (contacts.length < 10) {
            resolve();
        }
        else {
            reject('Vous avez déjà encodé 10 contacts, c\'est votre maximum');
        }
    })
}

//---------------- Promesses Sup
const noEmptyLastFirstName = () => {
    return new Promise((resolve, reject) => {
        if (inputLastname.value.trim() != '' && inputFirstname.value.trim() != '') {
            resolve();
        }
        else {
            reject('Pour supprimer, vous devez remplir nom et prénom !')
        }
    })
}

const isInList = () => {
    return new Promise((resolve, reject) => {
        // La méthode find parcours chaque élément du tableau et renvoie le premier élément qui correspont prédicat (à la condition) fournie
        // Si aucun élément n'est trouvé, c'est undefined qui est renvoyé
        let contactSearched = contacts.find((contact) => contact.lastname === inputLastname.value && contact.firstname === inputFirstname.value);

        // Si on a une valeur dans contactSearched
        if (contactSearched) {
            resolve();
        }
        else {
            reject('Le contact n\'est pas dans la liste');
        }
    })
}


// -> Renvoyer le message d'erreur adéquat et l'afficher
const displayError = (err) => {
    errorMsg.innerText = err;
    errorMsg.classList.remove('error-hide');
}
const resetError = () => {
    errorMsg.innerText = '';
    errorMsg.classList.add('error-hide');
}

// Si l'ajout a réussi, mettre à jour l'affichage des contacts
const displayContacts = () => {
    if (contacts.length == 0) {
        showContacts.innerHTML = '<tr><td colspan="4">Vous n\'avez pas encore de contacts</td></tr>';
    }
    else {
        showContacts.innerHTML = '';
        for (const contact of contacts) {
            //Pour chaque contact on fait une nouvelle ligne dans le tab
            const newLine = document.createElement('tr');

            // + 4 cellules remplies avec les valeurs du contact
            const lastnamecell = document.createElement('td');
            lastnamecell.textContent = contact.lastname;
            const firstnamecell = document.createElement('td');
            firstnamecell.textContent = contact.firstname;
            const bdcell = document.createElement('td');
            bdcell.textContent = contact.birthdate;
            const telcell = document.createElement('td');
            telcell.textContent = contact.tel;

            // On ajoute les 4 cellules à notre ligne
            newLine.append(lastnamecell, firstnamecell, bdcell, telcell);
            // On ajoute la ligne dans le tbody
            showContacts.append(newLine);
        }
    }
}

const resetForm = () => {
    inputLastname.value = '';
    inputFirstname.value = '';
    inputBirthdate.value = '',
        inputTel.value = '';
}