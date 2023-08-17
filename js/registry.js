/* Por motivos de práctica del lenguaje, el texto y
 * variables se expresan en inglés.*/

/* This program receives the account and personal data from
 * one or more people. Once the data es filled, it is displayed
 * for each account on the screen pushing the 'Print Accounts'
 * button. */

/* -------------------- */
/* GETTING DOM ELEMENTS */
/* -------------------- */

let accountNumber = document.getElementById('account-number');
let agencyNumber = document.getElementById('agency');
let firstDeposit = document.getElementById('first-deposit');
let firstName = document.getElementById('first-name');
let lastName = document.getElementById('last-name');
let id = document.getElementById('id');
let age = document.getElementById('age');
let sex = document.getElementsByName('sex');
let submitBtn = document.getElementById('submitBtn');
let displayAccounts = document.getElementById('display-accounts');
accountNumber.focus();

/* ------------------ */
/* ARRAY DECLARATIONS */
/* ------------------ */

let arrayAccounts = [];
let accountKeys = ['Account Number', 'Agency Number', 'First Deposit'];
let clientKeys = ['First Name', 'Last Name', 'ID', 'Age', 'Sex'];

/* ------- */
/* CLASSES */
/* ------- */

class Client {
  constructor(firstName, lastName, id, age, sex) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
    this.age = age;
    this.sex = sex;
  }
}

class Account {
  /* This variable belongs to the class itself and not
   * to one of its instances.
   * The variable tells how many accounts have been
   * submitted.*/
  static totalAccounts = 0;

  constructor(
    accountNumber,
    agencyNumber,
    firstDeposit,
    firstName,
    lastName,
    id,
    age,
    sex
  ) {
    this.accountNumber = accountNumber;
    this.agencyNumber = agencyNumber;
    this.firstDeposit = firstDeposit;
    this.client = new Client(firstName, lastName, id, age, sex);

    Account.totalAccounts++;
  }

  calculateBalance() {
    return this.firstDeposit * (1 - 0.18);
  }
}

/* --------- */
/* FUNCTIONS */
/* --------- */

/* Gets the value of the radio input which corresponds to
 * 'Sex' input. */
const getValue = () => {
  for (let i = 0; i < sex.length; i++) {
    if (sex[i].checked) return sex[i].value;
  }
};

/* Clears the whole form and focus the prompt in the 'Account
 * Number' input. */
const clearForm = () => {
  accountNumber.value = '';
  agencyNumber.value = '';
  firstDeposit.value = '';
  firstName.value = '';
  lastName.value = '';
  id.value = '';
  age.value = '';

  for (let i = 0; i < sex.length; i++) {
    sex[i].checked = false;
  }

  accountNumber.focus();
};

/* Saves the data from the form to an 'Account' object,
 * then push it into an array of 'Account' objects. */
const setPushAccount = () => {
  let sexValue = getValue();

  const myAccount = new Account(
    accountNumber.value,
    agencyNumber.value,
    firstDeposit.value,
    firstName.value,
    lastName.value,
    id.value,
    age.value,
    sexValue
  );

  arrayAccounts.push(myAccount);
};

/* Prints the number of registered accounts */
const printNumAccounts = () => {
  let numberAccounts = document.createElement('div');

  numberAccounts.innerHTML = `
    <p style="font-weight:bold; background-color: darkblue; color: white;
    font-size: 20px; padding: 20px; text-align: center">
      Number of registered accounts: ${Account.totalAccounts}
    </p>
    <hr>
  `;

  document.body.appendChild(numberAccounts);
};

/* Prints the whole information of each account orderly. */
const printAccountInfo = () => {
  let count = 1;
  let container = document.createElement('div');

  for (const account of arrayAccounts) {
    container.innerHTML += `
    <h2>Account ${count}</h2>
    <ul>
    `;

    const keysAccount = Object.getOwnPropertyNames(account);
    const keysClient = Object.getOwnPropertyNames(account.client);

    accountKeys.forEach((element, index) => {
      container.innerHTML += `
      <li>${element} : 
        <span style="color: red; font-weight: bold;">
          ${account[keysAccount[index]]}
        </span>
      </li>
      `;
    });

    clientKeys.forEach((element, index) => {
      container.innerHTML += `
      <li>${element} : 
        <span style="color: green; font-weight: bold;">
          ${account.client[keysClient[index]]}
        </span>
      </li>
      `;
    });

    container.innerHTML += `</ul>`;
    count++;
  }

  document.body.appendChild(container);
};

/* ------- */
/* BUTTONS */
/* ------- */

/* 'Submit' Button on click */
submitBtn.onclick = () => {
  setPushAccount();
  clearForm();
};

/* 'Print Accounts' Button on click  */
displayAccounts.onclick = () => {
  printNumAccounts();
  printAccountInfo();
};
