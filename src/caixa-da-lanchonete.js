class CaixaDaLanchonete {
  static metodosDePagamentoAceitos = ["dinheiro", "debito", "credito"];
  static menu = [
    {
      codigo: "cafe",
      descricao: "Café",
      valor: 3.0,
    },
    {
      codigo: "chantily",
      descricao: "Chantily (extra do Café)",
      valor: 1.5,
    },
    {
      codigo: "suco",
      descricao: "Suco Natural",
      valor: 6.2,
    },
    {
      codigo: "sanduiche",
      descricao: "Sanduíche",
      valor: 6.5,
    },
    {
      codigo: "queijo",
      descricao: "Queijo (extra do Sanduíche) 	",
      valor: 2.0,
    },
    {
      codigo: "salgado",
      descricao: "Salgado",
      valor: 7.25,
    },
    {
      codigo: "combo1",
      descricao: "1 Suco e 1 Sanduíche",
      valor: 9.5,
    },
    {
      codigo: "combo2",
      descricao: "1 Café e 1 Sanduíche",
      valor: 7.25,
    },
  ];

  constructor() {}

  regrasDeCompra(metodoDePagamento, itens) {
    let conjuntoDeCodigos = [];

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }
    if (
      !CaixaDaLanchonete.metodosDePagamentoAceitos.includes(metodoDePagamento)
    ) {
      return "Forma de pagamento inválida!";
    }

    for (const itemInfo of itens) {
      const [codigo, quantidade] = itemInfo.split(",");
      const menuItem = CaixaDaLanchonete.menu.find(
        (item) => item.codigo === codigo
      );
      
      conjuntoDeCodigos.push(codigo);

      if (!menuItem) {
        return "Item inválido!";
      } else if (quantidade <= 0 || !quantidade) {
        return "Quantidade inválida!";
      } else if (
        (conjuntoDeCodigos.includes("chantily") && !conjuntoDeCodigos.includes("cafe")) ||
        (conjuntoDeCodigos.includes("queijo") && !conjuntoDeCodigos.includes("sanduiche"))
      )
        return "Item extra não pode ser pedido sem o principal";
    }
  }

  processarMetodoDePagamento(metodoDePagamento, total) {
    if (metodoDePagamento === "debito") {
      Math.floor(total);
      return total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    } else if (metodoDePagamento === "dinheiro") {
      total -= total * 0.05; //Desconto de 5%
      Math.floor(total);
      return total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    } else if (metodoDePagamento === "credito") {
      total += total * 0.03; // Acrescimo de 3%
      Math.floor(total);
      return total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    let mensagemDeErro = this.regrasDeCompra(metodoDePagamento, itens);
    if (mensagemDeErro != null) return mensagemDeErro;

    let total = 0;

    for (const itemInfo of itens) {
      const [codigo, quantidade] = itemInfo.split(",");
      const menuItem = CaixaDaLanchonete.menu.find(
        (item) => item.codigo === codigo
      );

      if (menuItem) {
        total += menuItem.valor * parseInt(quantidade);
      }
    }

    total = this.processarMetodoDePagamento(metodoDePagamento, total);

    return total;
  }
}

export { CaixaDaLanchonete };
