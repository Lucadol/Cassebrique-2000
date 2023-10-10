// Configuration initiale du jeu
let config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let balle
let raquette 

// Création de l'instance du jeu Phaser
let game = new Phaser.Game(config);

// Fonction de préchargement des ressources
function preload() {
    // Préchargement du sprite sheet
    this.load.atlasXML('mon_sprite', 'assets/Breakout_Tile_Free.png', 'assets/Breakout_Tile_Free.xml');

    // Préchargement des fichiers audio
    this.load.audio('musique1', 'assets/musiques/BENNY BENASSI - Satisfaction [Original Video].mp3');
    this.load.audio('musique2', 'assets/musiques/Better Off Alone.mp3');
    this.load.audio('musique3', 'assets/musiques/Darude - Sandstorm.mp3');
    this.load.audio('musique4', 'assets/musiques/Eiffel 65 - Blue (Da Ba Dee).mp3');
    this.load.audio('musique5', 'assets/musiques/GALA - Freed from desire [Official Video].mp3');
    this.load.audio('musique6', 'assets/musiques/Haddaway - What Is Love [Official].mp3');
    this.load.audio('musique7', 'assets/musiques/Vengaboys - Boom, Boom, Boom, Boom!!.mp3');
    this.load.audio('musique8', 'assets/musiques/La Bouche - Be My Lover (Official Video).mp3');
    this.load.audio('musique9', 'assets/musiques/Stardust - Music Sounds Better With You (Official Music Video).mp3');
    this.load.audio('musique10', 'assets/musiques/Dragostea din tei.mp3');
    this.load.audio('musique11', 'assets/musiques/Nightcrawlers - Push The Feeling On (Official Video).mp3');

}

// Fonction de création du jeu
function create() {
    this.musique11 = this.sound.add('musique11');
    this.musique11.play();

    // Largeur de l'écran du navigateur
    let largeurEcran = window.innerWidth;

    // Largeur d'une brique (assurez-vous que c'est la largeur d'une brique dans votre sprite sheet)
    let largeurBrique = 384;
    let hauteurBrique = 128;

    // Réduction de la taille des briques (50% de la taille d'origine)
    let echelle = 0.3;

    // Position de départ de la première brique
    let y = 200;
    let y2 = y + hauteurBrique * echelle;
    let y3 = y2 + hauteurBrique * echelle;
    let y4 = y3 + hauteurBrique * echelle;
    let y5 = y4 + hauteurBrique * echelle;

    // Nombre de briques dans la ligne
    let nombreDeBriques = 12;

    // Calcul de la position de départ pour centrer les briques
    let largeurTotaleBriques = nombreDeBriques * largeurBrique * echelle;
    let xStart = (largeurEcran + largeurBrique * echelle - largeurTotaleBriques) / 2;

    for (let i = 0; i < nombreDeBriques; i++) {
        // Créer une brique à la position actuelle
        let brique = this.physics.add.sprite(xStart + i * largeurBrique * echelle, y, 'mon_sprite', '01-Breakout-Tiles.png');

        // Réduire la taille de la brique
        brique.setScale(echelle);
    }

    for (let i = 0; i < nombreDeBriques - 1; i++) {
        // Créer une brique à la position actuelle
        let brique = this.physics.add.sprite(xStart + (largeurBrique * echelle) / 2 + i * largeurBrique * echelle, y2, 'mon_sprite', '01-Breakout-Tiles.png');

        // Réduire la taille de la brique
        brique.setScale(echelle);
    }

    for (let i = 0; i < nombreDeBriques - 2; i++) {
        // Créer une brique à la position actuelle
        let brique = this.physics.add.sprite(xStart + largeurBrique * echelle + i * largeurBrique * echelle, y3, 'mon_sprite', '01-Breakout-Tiles.png');

        // Réduire la taille de la brique
        brique.setScale(echelle);
    }

    for (let i = 0; i < nombreDeBriques - 3; i++) {
        // Créer une brique à la position actuelle
        let brique = this.physics.add.sprite(xStart + (largeurBrique * echelle) * 1.5 + i * largeurBrique * echelle, y4, 'mon_sprite', '01-Breakout-Tiles.png');

        // Réduire la taille de la brique
        brique.setScale(echelle);
    }

    for (let i = 0; i < nombreDeBriques - 4; i++) {
        // Créer une brique à la position actuelle
        let brique = this.physics.add.sprite(xStart + (largeurBrique * echelle) * 2 + i * largeurBrique * echelle, y5, 'mon_sprite', '01-Breakout-Tiles.png');

        // Réduire la taille de la brique
        brique.setScale(echelle);
    }

    balle = this.physics.add.sprite(900, 700, 'mon_sprite', '58-Breakout-Tiles.png');
    balle.setScale(0.4);

    // Propriétés de la balle
    balle.setVelocity(200, -200); // Vitesse initiale (x, y)
    balle.setBounce(1); // Rebondir sur les bords de l'écran
    balle.setCollideWorldBounds(true); // Collisions avec les bords de l'écran

    // Crée la raquette
    raquette = this.physics.add.sprite(900, 800, 'mon_sprite', '56-Breakout-Tiles.png');
    raquette.setScale(0.4);

    // Crée les touches du clavier
    cursors = this.input.keyboard.createCursorKeys()
    
}

// Fonction de mise à jour du jeu (boucle de jeu)
function update() {
    // Logique du jeu, gestion des mouvements, des collisions, etc.
    raquette.setVelocityX(0)

    if(cursors.left.isDown){
        raquette.setVelocityX(-500)
    }

    if(cursors.right.isDown){
        raquette.setVelocityX(500)
    }

    // Bloque le mouvement vertical
    raquette.setVelocityY(0);

     // Gérer les collisions entre la balle et la raquette
     this.physics.add.collider(balle, raquette, (balle, raquette) => {
        // Calcule l'angle de rebond en fonction de la position de la balle par rapport à la raquette
        let relativeX = balle.x - raquette.x;
        let relativeY = balle.y - raquette.y;
    
        // Utilise Math.atan2 pour calculer l'angle de rebond
        let bounceAngle = Math.atan2(relativeY, relativeX);
    
        let nouvelleVitesse = balle.body.speed;
        balle.setVelocityY(-nouvelleVitesse * Math.sin(bounceAngle));
        balle.setVelocityX(nouvelleVitesse * Math.cos(bounceAngle));
    });

}
