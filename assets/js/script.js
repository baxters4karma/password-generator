//Get DOM elements
const optionsForm = document.getElementById("cardOptions");
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("copyPW");

// creating object that calls the random generator functions
const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol,
};

// generate event listen
generateBtn = document.querySelector("#generate");
generateBtn.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// Copy password to clipboard
clipboardBtn = document.querySelector("copyPW");
clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerHTML;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  var copyText = resultEl.innerHTML;
  navigator.clipboard.writeText(copyText);
  textarea.remove();
  alert('Password copied to clipboard');
 });

// Generate password function
/*  (1) Initialize password variable
    (2) Filter out unchecked types
    (3) loop over length, calling generator function for each type
    (4) add final password to the password variable and return  */
function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{lower}, {upper}, {number}, {symbol}].filter
  (
    item => Object.values(item)[0]
  );

  // Doesn't have a selected type
  if(typesCount === 0) {
    return '';
  }

  //create a loop
  for(let i = 0; i < length; i += typesCount) {
    typesArr.forEach(type => {
      const funcName = Object.keys(typesArr[Math.floor(Math.random() * typesArr.length)])[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

// Show form entries/prompts for user to select user-specified criteria
function showForm() {

  if (optionsForm.style.display === "none") {
    alert("(1) Read these instructions\n(2) Click OK to close this dialog box\n(3) Enter password length by clicking on up/down scroll bar within field\n(4) Select one or more options\n(5) Click the Generate Password button\n(6) Click the Copy Password button, copying newly created password")
    optionsForm.style.display = "block";
  } else {
    optionsForm.style.display = "none";
  }
}

function clearForm() {
  document.getElementById("result").value = "";
  document.getElementById("lowercase").checked = false;
  document.getElementById("uppercase").checked = false;
  document.getElementById("numbers").checked = false;
  document.getElementById("symbols").checked = false;
  showForm();
};

/* generator function for random lowercase characters, using ASCII character values, 26 lowercase letters that start at ASCII code 97*/
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

/* generator function for random upper characters, using ASCII character values, 26 uppercase letters that start at ASCII code 65*/
function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

/* generator function for random numbers, using ASCII character values, 10 numbers (0-9) that start at ASCII code 48*/
function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// generator function for random symbol characters, using ASCII character values, 15 symbols that start at ASCII code 33*/
function getRandomSymbol() {
	return String.fromCharCode(Math.floor(Math.random() * 15) + 33);
}
