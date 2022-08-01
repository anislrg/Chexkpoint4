function randomUppercaseLetter() {
  return String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1) + 65));
}

function randomLowercaseLetter() {
  return String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1) + 97));
}

function randomSpecialCharacter() {
  const specialCharacters = ["!", "@", "#", "$", "%", "^", "&", "*"];
  return specialCharacters[
    Math.floor(Math.random() * specialCharacters.length)
  ];
}

function randomNumber() {
  return `${Math.floor(Math.random() * 10)}`;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    // Generate random number
    const j = Math.floor(Math.random() * (i + 1));

    const temp = array[i];
    // eslint-disable-next-line no-param-reassign
    array[i] = array[j];
    // eslint-disable-next-line no-param-reassign
    array[j] = temp;
  }

  return array;
}

function generatePassword() {
  const password = [
    randomUppercaseLetter(),
    randomNumber(),
    randomLowercaseLetter(),
    randomSpecialCharacter(),
    randomUppercaseLetter(),
    randomNumber(),
    randomLowercaseLetter(),
    randomSpecialCharacter(),
  ];

  return shuffleArray(password).join("");
}

// console.log(generatePassword());
module.exports = generatePassword;
