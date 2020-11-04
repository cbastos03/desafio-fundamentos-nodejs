import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface createTransationDTO{
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(function (acumulador, valorAtual) {
      if (valorAtual.type === "income"){
         acumulador = acumulador + valorAtual.value
      }
      return acumulador;
    }, 0);
    const outcome =  this.transactions.reduce(function (acumulador, valorAtual) {
      if (valorAtual.type === "outcome"){
        acumulador = acumulador + valorAtual.value
      }
      return acumulador;
    }, 0);

    const balance: Balance = {
      income: income,
      outcome: outcome,
      total: income -outcome
    }

    return balance;
    
  }

  public create({ title, value, type }: createTransationDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
