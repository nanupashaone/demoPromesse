const listeContact = [];



function contactAjout () {
const nom = document.getElementById("nom").value;
const prenom = document.getElementById("prenom").value;
const dateNaissance = document.getElementById("dateNaissance").value;
const telephone = document.getElementById("telephone").value;


    const contactPromise = new Promise((resolve, reject) => {
        if (!nom || !prenom || !dateNaissance || !telephone) {
            reject("Veuillez remplir tous les champs.");
        } else if (estMajeur(dateNaissance) < 18) {
            reject("La personne doit être majeure.");
        } else {
            const listeContacts = document.getElementById('listeContacts');
            if (listeContacts.children.length >= 10) {
                reject("La liste de contacts est pleine (limite : 10).");
            } else {
                resolve({
                    nom: nom,
                    prenom: prenom,
                    dateNaissance: dateNaissance,
                    telephone: telephone
                });
            }
        }
    });

    contactPromise.then((contact) => {
        
        listeContact.push(contact);
        console.log("Contact ajouté avec succès :", contact);
    }).catch((erreurMessage) => {      
        console.error("Erreur lors de l'ajout du contact :", erreurMessage);
    });
}

function estMajeur(dateNaissance) {
    const today = new Date();
    const birthDate = new Date(dateNaissance);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    return (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) ? age - 1 : age;
}

function listeContactMax () {
    if (listeContact.length >= 10){
        alert("La liste de contacts est pleine (limite : 10)");
    }
}

