const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 900,
    parent: "game",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    scene: {
        preload,
        create,
        update,
    },
};

var game = new Phaser.Game(config);

let coche;
let cursors;
let carreterra;
let obstacles;
let tiempoObstaculo;
let posArray = 1;
let score = 0;
let scoreAux = 0;
let stamina = 100;
let staminaAux = 0;
let staminaTime = 0;
let dificultat = 0;
let arrayPosicionesCarreteras = [220,410,585];
let rightDown, leftDown = true;

function preload () { 
    this.load.image('carretera', '../resources/carretera.png'); // Imagen del fondo de la carretera
    this.load.image('coche', '../resources/coche.png'); // Imagen del coche
    this.load.image('obstacle', '../resources/obstacle.png'); // Imagen del obstáculo
    this.load.audio('boom', '../resources/boom.mp3'); // Sonido de la explosión
}

function create () {    
    // Crea un fondo de carretera y le añade movimiento
    carreterra = this.add.tileSprite(400, 450, 0, 0, 'carretera'); 

    this.scoreText = this.add.text(10, 10, 'Puntuación: 0', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });
    this.stamina = this.add.text(10, 50, 'stamina: 100', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });

    // Crea el coche con física
    coche = this.physics.add.sprite(400, 500, 'coche');
    coche.setCollideWorldBounds(true); // Limita el movimiento del coche a la pantalla

    // Configura las teclas de control
    cursors = this.input.keyboard.createCursorKeys();
    
    // Crea un grupo de obstáculos con física
    obstacles = this.physics.add.group();

    // Crea un temporizador para generar obstáculos cada 1.5 segundos
    tiempoObstaculo = this.time.addEvent({
        delay: 3000,
        callback: spawnObstacle,
        callbackScope: this,
        loop: true,
    }); 
    // Configura la colisión entre el coche y los obstáculos
    this.physics.add.overlap(coche, obstacles, hitObstacle, null, this);
    
}

// Función para generar obstáculos
function spawnObstacle() {
    const x = Phaser.Math.Between(0, 2); // Posición horizontal aleatoria
    const obstacle = obstacles.create(arrayPosicionesCarreteras[x], -50, 'obstacle'); // Crea un obstáculo en una posición aleatoria
    obstacle.setVelocityY(Math.min(4*(200+dificultat), 10000)); // Hace que el obstáculo se mueva hacia abajo
}

// Función para manejar la colisión entre el coche y un obstáculo
function hitObstacle(coche, obstacle) {
    if (stamina == 100){
        this.physics.pause(); // Detiene la física
        coche.setTint(0xff0000); // Cambia el color del coche a rojo
        coche.anims.stop(); // Detiene las animaciones
        this.gameOver = true; // Establece la bandera de fin de juego

        this.sound.play('boom'); // Suena el efecto de chocar

        setTimeout(() => {
            localStorage.setItem('PuntFinal', score);
            window.location.assign('fipartida.html');
        }, 2210); 
    }
   
}

// Función para actualizar la escena
function update() {
    if (this.gameOver) {
        tiempoObstaculo.paused = true;
        return; // Si el juego terminó, no actualiza más
    }
    
    tiempoObstaculo.delay = Math.max((3000-dificultat*200), 500);
    //dificultat
    dificultat += 0.005;

    // Puntuacion
    scoreAux += 0.1;
    score = Math.floor(scoreAux);
    this.scoreText.setText('Puntuación: ' + score);

    //stamina
    if (stamina < 100) {
        staminaAux += 0.5;
        stamina = Math.floor(staminaAux);
        this.stamina.setText('stamina: ' + stamina);
    }
    
    // Mueve el fondo de la carretera para crear un efecto de desplazamiento
    carreterra.tilePositionY -= Math.min(dificultat, 18); // Velocidad del fondo
   
    // Controla el movimiento del coche
    if (cursors.left.isDown && leftDown) {
        if (!posArray < 1) {
            posArray -= 1;  
        }
        coche.x = arrayPosicionesCarreteras[posArray];
        leftDown = false;
    } else if (cursors.right.isDown && rightDown) {
        if (posArray < 2) {
            posArray += 1;
        }
        coche.x = arrayPosicionesCarreteras[posArray];
        rightDown = false;
    } 

    if (cursors.left.isUp){
        leftDown = true;
    }
    if (cursors.right.isUp) {
        rightDown = true;
    }

    if (cursors.space.isDown && stamina == 100) {
        staminaAux = 0;
        stamina = 0;
    }
}