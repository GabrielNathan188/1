let carrinho = /*JSON.parse(sessionStorage.getItem("carrinho")) || */[];

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("comprar")) {
        let nome = e.target.getAttribute("data-nome");
        let preco = parseFloat(e.target.getAttribute("data-preco"));

        confirmarCompra(nome, preco);
    }
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
            <strong>${item.nome}</strong><br>
            <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span><br>

            <div class="controle">
                <button onclick="diminuirQuantidade('${item.nome}')">➖</button>
                <span>${item.quantidade}</span>
                <button onclick="aumentarQuantidade('${item.nome}')">➕</button>
            </div>
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

        contador.textContent = `Carrinho (${totalItems})`
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

overlay.addEventListener("click", function(e) {
    e.preventDefault();
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

function criarProduto(nome, preco, imagem) {
    let div = document.createElement("div")
    div.classList.add("produto");

    div.innerHTML = `
    <img src="${imagem}">
    <h3>${nome}</h3>
    <p>R$ ${parseFloat(preco).toFixed(2)}</p>
    <button class="comprar" data-nome="${nome}" data-preco="${preco}">
        Comprar
    </button>
    `;

    listaProdutos.appendChild(div);
    
    //ativar botão novo
    let botao = div.querySelector(".comprar");
    
    botao.addEventListener("click", function() {
        confirmarCompra(nome, preco);
    });
}

function confirmarCompra(nome, preco) {
    let confirmar = confirm(`deseja adicionar "${nome}" ao carrinho?`);
    
    if (confirmar) {
        adicionarCarrinho(nome, parseFloat(preco));

        alert(`${nome} foi adicionado ao carrinho!`);
    }
}

let btnAdicionar =  document.getElementById("btn-adicionar");
let listaProdutos = document.querySelector(".lista-produtos");

btnAdicionar.addEventListener("click", function() {
    let nome = document.getElementById("nome-produto").value;
    let preco = document.getElementById("preco-produto").value;
    let imagem = document.getElementById("imagem-produto").value;

    // validação simples
    if (!nome || !preco || !imagem) {
        alert("Preencha todos os campos!")
        return;
    }
    criarProduto(nome, preco, imagem);

    //limpa campos
    document.getElementById("nome-produto").value = "";
    document.getElementById("preco-produto").value = "";
    document.getElementById("imagem-produto").value = "";

    document.addEventListener("click", function(e) {
        if (!form.contains(e.target) && !btnAbrirForm.contains(e.target)) {
            form.classList.remove("ativo");
        }
    });
})