// Business Logic for AddressBook ---------
function AccountBook() {
  this.accounts = [],
  this.currentId = 0
}

AccountBook.prototype.addAccount = function(account) {
  account.id = this.assignId();
  this.accounts.push(account);
}

AccountBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AccountBook.prototype.findAccount = function(id) {
  for (var i=0; i< this.accounts.length; i++) {
    if (this.accounts[i]) {
      if (this.accounts[i].id == id) {
        return this.accounts[i];
      }
    }
  };
  return false;
}

AccountBook.prototype.deleteAccount = function(id) {
  for (var i=0; i< this.accounts.length; i++) {
    if (this.accounts[i]) {
      if (this.accounts[i].id == id) {
        delete this.accounts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function BankAccount(name, initialDeposit) {
  this.name = name,
  this.initialDeposit = initialDeposit,
  this.currentBalance = initialDeposit
}

// function DepositOrWithdraw(depositAmount, withdrawalAmount) {
//   this.depositAmount = depositAmount,
//   this.withdrawalAmount = withdrawalAmount
// }

BankAccount.prototype.deposit = function(deposit) {
  this.currentBalance += deposit;
}
BankAccount.prototype.withdrawal = function(withdrawal) {
  this.currentBalance -= withdrawal;
}

// User Interface Logic ---------
var accountBook = new AccountBook();

function showContact(accountId) {
  var account = accountBook.findAccount(accountId);
  $("#show-balance").show();
  $(".current-balance").html(account.currentBalance);
}



$(document).ready(function() {


  $("form#new-account").submit(function(event) {
    event.preventDefault();
    var inputtedName = $("input#new-name").val();
    var inputtedInitialDeposit = parseInt($("input#new-initial-deposit").val());
    var inputtedDepositAmount = parseInt($("input#new-deposit-amount").val());
    var inputtedWithdrawalAmount = parseInt($("input#new-withdrawal-amount").val());
    var currentBalance = "";
    // $("input#new-name").val("");
    // $("input#new-initial-deposit").val("");
    // $("input#new-deposit-amount").val("");
    // $("input#new-withdrawal-amount").val("");

    var newbankAccount = new BankAccount(inputtedName, inputtedInitialDeposit);
    console.log(newbankAccount);
    // var newdepositOrWithdraw = new DepositOrWithdraw(inputtedDepositAmount, inputtedWithdrawalAmount);
    accountBook.addAccount(newbankAccount);
    $("#show-balance").show();
    $(".current-balance").text(newbankAccount.initialDeposit);
    $(".account-number").text(newbankAccount.id);

  })

  $("form#deposit-withdrawal").submit(function(event) {
    var depositOrWithdraw = $("#depositOrWithdraw").val();
    var inputtedDepositOrWithdrawalAmount = parseInt($("input#depositOrWithdrawalAmount").val());
    var accountId = $("input#account-number-deposit-withdrawal").val();
    event.preventDefault();
    var currentAccount = accountBook.findAccount(accountId);
    console.log(currentAccount);
    if(depositOrWithdraw == "deposit"){
    currentAccount.deposit(inputtedDepositOrWithdrawalAmount);
    $(".current-balance").text(currentAccount.currentBalance);
  }else{
    currentAccount.withdrawal(inputtedDepositOrWithdrawalAmount);
    $(".current-balance").text(currentAccount.currentBalance);
  }

});
})
