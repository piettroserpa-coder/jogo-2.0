const luffy = document.getElementById('luffy');
const enemy = document.getElementById('enemy');
let luffyPos = 50;
let isAttacking = false;

// Sistema de Movimento
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && luffyPos < 700) {
        luffyPos += 15;
        luffy.style.left = luffyPos + 'px';
    }
    if (e.key === 'ArrowLeft' && luffyPos > 0) {
        luffyPos -= 15;
        luffy.style.left = luffyPos + 'px';
    }
    if (e.key === ' ' && !isAttacking) {
        attack();
    }
});

// Lógica de Ataque (Gomu Gomu no...)
function attack() {
    isAttacking = true;
    luffy.classList.add('attack-anim');
    luffy.innerText = "PISTOL!";
    
    // Verificação de Colisão Simples
    const luffyRect = luffy.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    if (luffyRect.right > enemyRect.left) {
        enemy.style.backgroundColor = 'white';
        setTimeout(() => { enemy.style.backgroundColor = '#2c3e50'; }, 100);
        console.log("Dano no inimigo!");
    }

    setTimeout(() => {
        luffy.classList.remove('attack-anim');
        luffy.innerText = "";
        isAttacking = false;
    }, 500);
}
