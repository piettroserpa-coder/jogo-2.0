const tripulacao = [
    {
        nome: "Monkey D. Luffy",
        funcao: "Capitão",
        desc: "Comeu a Gomu Gomu no Mi. O homem que se tornará o Rei dos Piratas!",
        emoji: "👒"
    },
    {
        nome: "Roronoa Zoro",
        funcao: "Imediato / Espadachim",
        desc: "Mestre do estilo Santoryu. Nunca perde o caminho... mentira, perde sim.",
        emoji: "⚔️"
    },
    {
        nome: "Sanji",
        funcao: "Cozinheiro",
        desc: "Perna Negra. O melhor cozinheiro do South Blue (e gado nas horas vagas).",
        emoji: "🍳"
    },
    {
        nome: "Nami",
        funcao: "Navegadora",
        desc: "A gata ladra. Consegue prever o clima e ama Berries acima de tudo.",
        emoji: "🍊"
    },
    {
        nome: "Tony Tony Chopper",
        funcao: "Médico",
        desc: "Amante de algodão-doce! Uma rena com o poder da Hito Hito no Mi.",
        emoji: "🩺"
    }
];

const btn = document.getElementById('btn-treinar');
const nomeTxt = document.getElementById('atleta-nome');
const imgDiv = document.getElementById('atleta-img');
const descTxt = document.getElementById('atleta-desc');

btn.addEventListener('click', () => {
    // Sorteia um pirata aleatório
    const sorteio = tripulacao[Math.floor(Math.random() * tripulacao.length)];
    
    // Atualiza o DOM
    nomeTxt.innerText = sorteio.nome;
    imgDiv.innerText = sorteio.emoji;
    descTxt.innerText = `${sorteio.funcao}: ${sorteio.desc}`;
    
    // Efeito de animação simples
    imgDiv.style.transform = "scale(1.2)";
    setTimeout(() => imgDiv.style.transform = "scale(1)", 200);
});
