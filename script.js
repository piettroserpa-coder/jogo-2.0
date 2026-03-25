const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

canvas.width = 800;
canvas.height = 400;

// Configurações do Jogo
let score = 0;
let gameActive = true;
let gravity = 0.8;

// Protagonista: Luffy
const luffy = {
    x: 50,
    y: 300,
    w: 50,
    h: 60,
    color: '#ff0000', // Vermelho do colete
    dy: 0,
    jumpForce: -15,
    grounded: false,
    draw() {
        // Corpo/Chapéu de Palha simplificado
        ctx.fillStyle = "#f2d06b"; // Chapéu
        ctx.fillRect(this.x, this.y - 10, this.w, 10);
        ctx.fillStyle = this.color; // Colete
        ctx.fillRect(this.x, this.y, this.w, this.h);
        // Braço esticado (Gomu Gomu no...)
        ctx.fillStyle = "#ffe0bd";
        ctx.fillRect(this.x + this.w, this.y + 20, 10, 5);
    },
    jump() {
        if (this.grounded) {
            this.dy = this.jumpForce;
            this.grounded = false;
        }
    },
    update() {
        if (this.y + this.h < canvas.height) {
            this.dy += gravity;
            this.grounded = false;
        } else {
            this.dy = 0;
            this.grounded = true;
            this.y = canvas.height - this.h;
        }
        this.y += this.dy;
        this.draw();
    }
};

// Obstáculos: Marinha / Caixotes
const obstacles = [];
function spawnObstacle() {
    if (!gameActive) return;
    const height = 40 + Math.random() * 40;
    obstacles.push({
        x: canvas.width,
        y: canvas.height - height,
        w: 30,
        h: height,
        color: '#ffffff', // Branco da Marinha
        speed: 5 + (score / 1000) // Aumenta velocidade com o tempo
    });
    setTimeout(spawnObstacle, 1500 + Math.random() * 1000);
}

function handleObstacles() {
    for (let i =
