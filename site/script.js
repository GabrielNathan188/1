let carrinho = /*JSON.parse(sessionStorage.getItem("carrinho")) || */[];

let botoes = document.querySelectorAll(".comprar");

botoes.forEach(function(botao) {
    botao.addEventListener("click", function() {

        let nome = botao.getAttribute("data-nome");
        let preco = parseFloat(botao.getAttribute("data-preco"));

        adicionarCarrinho(nome, preco);
    });
});

function adicionarCarrinho(nome, preco) {

    let produtoExistente = carrinho.find(function(item) {
        return item.nome === nome;
    });

    if (produtoExistente) {
        produtoExistente.quantidade += 1;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    atualizarContador();
    atualizarCarrinho();
}

function atualizarCarrinho() {
    let lista = document.getElementById("lista-carrinho");
    let total = document.getElementById("total");

    lista.innerHTML = "";

    let soma = 0;

    carrinho.forEach(function(item) {

        let li = document.createElement("li");

        li.innerHTML = `
            ${item.nome} 
            <br>
            R$ ${item.preco * item.quantidade}
            <br>

            <button onclick="diminuirQuantidade('${item.nome}')">➖</button>
            ${item.quantidade}
            <button onclick="aumentarQuantidade('${item.nome}')">➕</button>
        `;

        lista.appendChild(li);

        soma += item.preco * item.quantidade;
    });

    total.textContent = "Total: R$ " + soma.toFixed(2);
}

// salva no navegador
function salvarCarrinho() {
    sessionStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// atualiza número da navbar
function atualizarContador() {

    let contador = document.getElementById("btn-carrinho");

    if (contador) {
        let totalItems = 0;

        carrinho.forEach(function(item) {
            totalItems += item.quantidade;
        });

        contador.textContent = `carrinho (${totalItems})`
    }
}

// roda quando abre a página
atualizarContador();
atualizarCarrinho();

let btnCarrinho = document.getElementById("btn-carrinho");
let painel = document.getElementById("painel-carrinho");
let overlay = document.getElementById("overlay");

btnCarrinho.addEventListener("click", function() {
    painel.classList.add("ativo");
    overlay.classList.add("ativo");
});

overlay.addEventListener("click", function() {
    painel.classList.remove("ativo");
    overlay.classList.remove("ativo")
});

let btnAbrirForm = document.getElementById("btn-abrir-form");
let form = document.getElementById("form-produto");

btnAbrirForm.addEventListener("click", function() {
    form.classList.toggle("ativo");
});

function aumentarQuantidade(nome) {
    carrinho.forEach(function(item) {
        if (item.nome === nome) {
            item.quantidade += 1;
        }
    });

    atualizarCarrinho();
    atualizarContador();
}

function diminuirQuantidade(nome) {
    carrinho = carrinho.filter(function(item) {

        if (item.nome === nome) {
            item.quantidade -= 1;

            // se chegar a 0, remove
            return item.quantidade > 0;
        }

        return true;
    });

    atualizarCarrinho();
    atualizarContador();
}