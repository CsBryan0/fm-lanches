const lanches = [
  { nome: "Hamburguer", preco: 7.0, descricao: "Pão e bife de hamburguer" },
  {
    nome: "X-burguer",
    preco: 12.0,
    descricao: "Pão, bife de hamburguer, queijo e presunto",
  },
  {
    nome: "X-egg",
    preco: 14.0,
    descricao: "Pão, bife de hamburguer, queijo, presunto e ovo",
  },
  {
    nome: "X-calabresa",
    preco: 14.0,
    descricao: "Pão, bife de hamburguer, queijo, presunto e calabresa defumada",
  },
  {
    nome: "X-calabresa",
    preco: 14.0,
    descricao: "Pão, bife de hamburguer, queijo, presunto e bacon",
  },
  {
    nome: "X-tudo",
    preco: 18.0,
    descricao: "Pão, bife de hamburguer, queijo, presunto, ovo e bacon",
  },
  {
    nome: "X-picanha",
    preco: 19.0,
    descricao:
      "Pão, bife de hamburguer sabor picanha, queijo, presunto, ovo e bacon",
  },
  {
    nome: "X-burgão",
    preco: 16.0,
    descricao: "Pão, bife de 140g, queijo e presunto",
  },
  {
    nome: "Santa Burguer",
    preco: 22.0,
    descricao: "Pão, bife de 140g, queijo, presunto, ovo e bacon",
  },
  {
    nome: "X-tudão",
    preco: 26.0,
    descricao:
      "Pão, 2 bifes de hamburguer, 2 ovos, dobro de queijo e presunto, dobro de calabresa e bacon",
  },
  {
    nome: "Big Trailer",
    preco: 30.0,
    descricao:
      "Pão, 2 bifes de hamburguer sabor picanha, 2 ovos, dobro de queijo e presunto, dobro de calabresa e bacon",
  },
];

const bebidas = [
  { nome: "Coca-cola lata", preco: 5.0, descricao: "Lata de 350ml" },
  { nome: "Guárana lata", preco: 5.0, descricao: "Lata de 350ml" },
  { nome: "Coca-cola 600ml", preco: 8.0, descricao: "Garrafa de 600ml" },
  { nome: "Guárana 600ml", preco: 8.0, descricao: "Garrafa de 600ml" },
  { nome: "Coca-cola 2L", preco: 14.0, descricao: "Garrafa de 2l" },
  { nome: "Guárana 2L", preco: 12.0, descricao: "Garrafa de 2l" },
];

let taxaEntrega = 0.0; // Correção: Inicializado como número
const carrinho = [];
const retiradaRadio = document.getElementById("retirada");
const entregaRadio = document.getElementById("entrega-domicilio");
const enderecoEntregaDiv = document.getElementById("endereco-entrega");
const taxaEntregaElement = document.getElementById("taxa-entrega");
const totalElement = document.getElementById("total");
const formaPagamento = document.getElementById("forma-pagamento");
const trocoDiv = document.getElementById("troco");
const valorPagoElement = document.getElementById("valor-pago");
const valorTrocoElement = document.getElementById("valor-troco");
const confirmarPedidoButton = document.getElementById("confirmar-pedido");
const finalizarPedidoButton = document.getElementById("finalizar-pedido");

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function atualizarCarrinho() {
  const carrinhoLista = document.getElementById("itens-carrinho");
  carrinhoLista.innerHTML = "";

  let total = 0;

  carrinho.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.setAttribute("data-index", index);
    listItem.classList.add("list-group-item"); //adicionado para o bootstrap

    // Botão para remover um item
    const removeIcon = document.createElement("i");
    removeIcon.classList.add(
      "fas",
      "fa-minus-circle",
      "text-danger",
      "ml-2",
      "cursor-pointer"
    );
    removeIcon.addEventListener("click", () => removerDoCarrinho(index));

    // Botão para adicionar um item
    const addIcon = document.createElement("i");
    addIcon.classList.add(
      "fas",
      "fa-plus-circle",
      "text-success",
      "ml-2",
      "cursor-pointer"
    );
    addIcon.addEventListener("click", () => adicionarAoCarrinho(item));

    // Nome e quantidade do item
    const itemName = document.createElement("span");
    itemName.textContent = `${item.nome} x${item.quantidade}`;

    listItem.style.marginBottom = "5px";
    listItem.appendChild(itemName);
    listItem.appendChild(addIcon);
    listItem.appendChild(removeIcon);
    carrinhoLista.appendChild(listItem);

    total += item.quantidade * item.preco;
  });

  if (entregaRadio.checked) {
    total += taxaEntrega;
  }

  totalElement.textContent = formatarMoeda(total);
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function exibirCardapio(categoria, elementos) {
  const lista = document.getElementById(categoria);
  lista.innerHTML = "";

  // Crie uma div com a classe "row" para envolver as colunas
  const row = document.createElement("div");
  row.classList.add("row");

  elementos.forEach((item, index) => {
    // Crie uma div com a classe "col-md-6" para criar duas colunas
    const col = document.createElement("div");
    col.classList.add("col-md-6");

    const addIcon = document.createElement("i");
    addIcon.classList.add(
      "fas",
      "fa-plus-circle",
      "text-success",
      "ml-2",
      "cursor-pointer"
    );

    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div>
        <div class="font-weight-bold">
          <span>${item.nome}</span> - <span>${formatarMoeda(item.preco)} ${
      addIcon.outerHTML
    }</span>
        </div>
        <p class="font-italic">${item.descricao}</p>
      </div>
    `;
    listItem.classList.add("list-group-item"); // Adicionado para o Bootstrap
    listItem.setAttribute("data-index", index);
    listItem.addEventListener("click", () => adicionarAoCarrinho(item));
    col.appendChild(listItem);
    row.appendChild(col);
  });

  lista.appendChild(row);
}

function adicionarAoCarrinho(item) {
  const itemNoCarrinho = carrinho.find(
    (carrinhoItem) => carrinhoItem.nome === item.nome
  );

  if (itemNoCarrinho) {
    itemNoCarrinho.quantidade++;
  } else {
    carrinho.push({ ...item, quantidade: 1 });
  }

  atualizarCarrinho();
}

function atualizarTaxaEntrega() {
  taxaEntregaElement.textContent = formatarMoeda(taxaEntrega);
}

function atualizarValorTroco() {
  const valorPago = parseFloat(valorPagoElement.value);
  const total = parseFloat(
    totalElement.textContent.replace("R$", "").replace(",", ".")
  );

  if (!isNaN(valorPago)) {
    const troco = valorPago - total;
    valorTrocoElement.textContent = formatarMoeda(troco);
  } else {
    valorTrocoElement.textContent = formatarMoeda(0);
  }
}

function gerarMensagemPedido() {
  let mensagem = "Olá, gostaria de fazer o seguinte pedido:\n";

  carrinho.forEach((item) => {
    mensagem += `${item.quantidade} - ${item.nome}\n`;
  });

  if (entregaRadio.checked) {
    const endereco = document.getElementById("endereco-cliente").value;
    mensagem += `Endereço de entrega: ${endereco}\n`;
  }

  const formaPagamentoSelecionada = formaPagamento.value;
  if (formaPagamentoSelecionada === "dinheiro") {
    const valorPago = parseFloat(valorPagoElement.value);
    mensagem += `Forma de pagamento: Dinheiro (Troco para ${formatarMoeda(
      valorPago
    )})\n`;
  } else if (formaPagamentoSelecionada === "pix") {
    const chavePix = "";
    mensagem += `Forma de pagamento: PIX (Chave PIX: ${chavePix})\n`;
  } else {
    mensagem += `Forma de pagamento: Cartão de Crédito/Débito\n`;
  }

  const observacoes = document.getElementById("observacoes").value;
  if (observacoes) {
    mensagem += `Observações: ${observacoes}\n`;
  }

  return encodeURIComponent(mensagem);
}

function finalizarPedido() {
  const mensagemPedido = gerarMensagemPedido();
  const numeroWhatsApp = "";
  const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${mensagemPedido}`;
  window.open(urlWhatsApp);
}

function configurarEventos() {
  entregaRadio.addEventListener("change", () => {
    enderecoEntregaDiv.style.display = entregaRadio.checked ? "block" : "none";
    if (entregaRadio.checked) {
      taxaEntrega = 3.0;
    }
    atualizarTaxaEntrega();
    atualizarCarrinho(); // Certificar-se de atualizar o carrinho quando a taxa é alterada
  });

  retiradaRadio.addEventListener("change", () => {
    {
      enderecoEntregaDiv.style.display = "none";
      if (taxaEntrega === 3.0) {
        taxaEntrega -= 3.0;
      }

      atualizarTaxaEntrega();
      atualizarCarrinho();
    }
  });

  formaPagamento.addEventListener("change", () => {
    trocoDiv.style.display =
      formaPagamento.value === "dinheiro" ? "block" : "none";
    atualizarValorTroco();
  });

  valorPagoElement.addEventListener("input", atualizarValorTroco);

  confirmarPedidoButton.addEventListener("click", () => {
    document.getElementById("entrega").style.display = "block";
    document.getElementById("pagamento").style.display = "block";
  });

  finalizarPedidoButton.addEventListener("click", finalizarPedido);
}

//loading

document
  .querySelector("#forma-pagamento")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });

function iniciar() {
  exibirCardapio("lanches", lanches);
  exibirCardapio("bebidas", bebidas);
  configurarEventos();
  atualizarTaxaEntrega();
  atualizarCarrinho();
}

iniciar();
