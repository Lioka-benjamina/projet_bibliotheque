interface Register {
    nom : string
    prenom : string
    email : string
    role : string
    password : string
    passwordConfirm : string
}

interface Membre {
    id : number
    nom : string
    prenom : string
    numero_mobile : number
    email : string
    genre : string
    image : string
    date_adhesion : Date
}

interface Livre {
    titre : string
    auteur : string
    categorie : string
    editeur : string
}