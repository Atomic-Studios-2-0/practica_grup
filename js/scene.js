const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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

function preload () { 
    this.load.image('carretera', '../resources/carretera.png'); // Imagen del fondo de la carretera
    this.load.image('coche', '../resources/coche.png'); // Imagen del coche
    this.load.image('obstacle', '../resources/obstacle.png'); // Imagen del obstáculo
}

function create () {    
    // Crea un fondo de carretera y le añade movimiento
    carreterra = this.add.tileSprite(400, 300, 800, 600, 'carretera'); 

    // Crea el coche con física
    coche = this.physics.add.sprite(400, 500, 'coche');
    coche.setCollideWorldBounds(true); // Limita el movimiento del coche a la pantalla

    // Configura las teclas de control
    cursors = this.input.keyboard.createCursorKeys();
    
    // Crea un grupo de obstáculos con física
    obstacles = this.physics.add.group();

    // Crea un temporizador para generar obstáculos cada 1.5 segundos
    tiempoObstaculo = this.time.addEvent({
        delay: 1500,
        callback: spawnObstacle,
        callbackScope: this,
        loop: true,
    }); 
    // Configura la colisión entre el coche y los obstáculos
    this.physics.add.overlap(coche, obstacles, hitObstacle, null, this);

}

// Función para generar obstáculos
function spawnObstacle() {
    const x = Phaser.Math.Between(100, 700); // Posición horizontal aleatoria
    const obstacle = obstacles.create(x, -50, 'obstacle'); // Crea un obstáculo en una posición aleatoria
    obstacle.setVelocityY(200); // Hace que el obstáculo se mueva hacia abajo
}

// Función para manejar la colisión entre el coche y un obstáculo
function hitObstacle(coche, obstacle) {
    this.physics.pause(); // Detiene la física
    coche.setTint(0xff0000); // Cambia el color del coche a rojo
    coche.anims.stop(); // Detiene las animaciones
    this.gameOver = true; // Establece la bandera de fin de juego
}

// Función para actualizar la escena
function update() {
    if (this.gameOver) {
        tiempoObstaculo.paused = true
        return; // Si el juego terminó, no actualiza más
    }

    // Mueve el fondo de la carretera para crear un efecto de desplazamiento
    carreterra.tilePositionY += 4; // Velocidad del fondo

    // Controla el movimiento del coche
    if (cursors.left.isDown) {
        coche.setVelocityX(-160); // Mueve el coche a la izquierda
    } else if (cursors.right.isDown) {
        coche.setVelocityX(160); // Mueve el coche a la derecha
    } else {
        coche.setVelocityX(0); // Detiene el movimiento horizontal
    }
}