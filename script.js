// Banco de Dados de Personagens (Substitua as URLs pelas fotos que desejar)
const database = [
    { name: "Luffy", rarity: "SSR", pwr: 1200, img: "https://i.pinimg.com/originals/8a/04/00/8a0400b8e90604e38e6be5927514be0c.jpg" },
    { name: "Zoro", rarity: "SSR", pwr: 1100, img: "https://i.pinimg.com/736x/8d/f3/0d/8df30d12643717208d1f2b694b806d28.jpg" },
    { name: "Sanji", rarity: "SR", pwr: 800, img: "https://i.pinimg.com/736x/8e/3c/6e/8e3c6e4e137f8f7498305c6d3714b9c1.jpg" },
    { name: "Nami", rarity: "SR", pwr: 600, img: "https://i.pinimg.com/originals/71/34/45/7134458f3f870956b986e6658071e6be.jpg" },
    { name: "Chopper", rarity: "R", pwr: 400, img: "https://i.pinimg.com/originals/94/a4/0f/94a40f0f49692440f43b67716f9a0c1a.jpg" }
];

let gameState = {
    money: 1000,
    level: 1,
    power: 0,
    crew: []
};

function pullCharacter() {
    if (gameState.money < 500) {
        addLog("Você não tem Berries suficientes!");
        return;
    }

    gameState.money -= 500;
    const char = database[Math.floor(Math.random() * database.length)];
    
    // Atualiza Visual do Poster
    document.getElementById('char-img').src = char.img;
    document.getElementById('char-name').innerText = char.name;
    document.getElementById('char-rarity').innerText = char.rarity;
    
    // Adiciona à tripulação
    gameState.crew.push(char);
    updateStats();
    renderCrew();
    addLog(`Recrutado: ${char.name} (${char.rarity})`);
}

function navigate(difficulty) {
    if (gameState.crew.length === 0) {
        addLog("Você precisa de uma tripulação para navegar!");
        return;
    }

    let enemyPower = difficulty === 'low' ? Math.random() * 1500 : Math.random() * 5000;
    addLog(`⚓ Navegando... Inimigo com ${Math.floor(enemyPower)} de poder encontrado!`);

    setTimeout(() => {
        if (gameState.power >= enemyPower) {
            let reward = Math.floor(enemyPower * 0.5);
            gameState.money += reward;
            gameState.level++;
            addLog(`✅ VITÓRIA! Ganhou ${reward} Berries e subiu de nível.`);
        } else {
            gameState.money = Math.max(0, gameState.money - 300);
            addLog(`❌ DERROTA! Você fugiu e perdeu 300 Berries.`);
        }
        updateStats();
    }, 500);
}

function updateStats() {
    gameState.power = gameState.crew.reduce((acc, curr) => acc + curr.pwr, 0);
    document.getElementById('money').innerText = gameState.money;
    document.getElementById('player-lvl').innerText = gameState.level;
    document.getElementById('total-power').innerText = gameState.power;
}

function renderCrew() {
    const grid = document.getElementById('crew-grid');
    grid.innerHTML = gameState.crew.map(c => `
        <div class="crew-card">
            <img src="${c.img}" onerror="this.src='https://via.placeholder.com/80'">
            <p>${c.name}</p>
        </div>
    `).join('');
}

function addLog(msg) {
    const box = document.getElementById('log-box');
    box.innerHTML += `<p>> ${msg}</p>`;
    box.scrollTop = box.scrollHeight;
}
