class BankAccount {
	constructor(inBalance) {
		this.AccBalance = inBalance;
		this.AccName = "";
		this.AccNumber = 0;
		this.AccTransactions = new Array();
	}
	
	deposit(inAmount) {
		this.AccBalance += inAmount;
	}
	
	withdraw(inAmount) {
		this.AccBalance -= inAmount;
	}
	
	balance() {return this.AccBalance;}
	
	accountInfo() {
		return [this.AccName, this.AccNumber, this.AccBalance];
	}
	
	transactionAdd(type, amount, date) {
		this.AccTransactions.push({
			type: type,
			amount: amount,
			date: date
		});
	}
	
	get accBalance() {return this.AccBalance;}
	set accBalance(accBalance) {this.AccBalance = accBalance;}
	
	get accName() {return this.AccName;}
	set accName(accName) {this.AccName = accName;}
	
	get accNumber() {return this.AccNumber;}
	set accNumber(accNumber) {this.AccNumber = accNumber;}
	
	get accTransactions() {return this.AccTransactions;}
	set accTransactions(accTransactions) {this.AccTransactions = accTransactions;}
}