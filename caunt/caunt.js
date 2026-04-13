const fs = require("fs");
const texto = fs.readFileSync("caunt/texto.txt", "utf-8");

const caracteres = texto.length;

const palavras = texto.split(/\s+/);
const totalPalavras = palavras.length;

const contagem = {};
const ignorar = ["de", "a", "o", "e", "do", "da"];

for (let palavra of palavras) {
    palavra = palavra.toLowerCase().replace(/[.,!?]/g, "");

    if (palavra === "" || ignorar.includes(palavra)) continue;

    contagem[palavra] = (contagem[palavra] || 0) + 1;
}

const ordenado = Object.entries(contagem)
    .sort((a, b) => b[1] - a[1]);

    console.log(`Caracteres: ${caracteres}`);
    console.log("Palavras", totalPalavras);

    console.log("\nRanking de palavras:");
    for (let [palavra, quantidade] of ordenado) {
        console.log(`${palavra}: ${quantidade}`);
    }

const top5 = ordenado.slice(0, 5);

console.log("\nTop 5 palavras:");
for (let [palavra, quantidade] of top5) {
    console.log(`${palavra}: ${quantidade}`)
}
