'use strict';

/*
 * DOM-tree, essential DOM methods, templates.
*/

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var MAX_WIZARDS_NUMBER = 4;

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

function getRandomValueFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateWizard() {

  var name = getRandomValueFromArray(WIZARD_NAMES);
  var surname = getRandomValueFromArray(WIZARD_SURNAMES);
  var coatColor = getRandomValueFromArray(WIZARD_COAT_COLORS);
  var eyesColor = getRandomValueFromArray(WIZARD_EYES_COLORS);

  return {
    name: name + ' ' + surname,
    coatColor: coatColor,
    eyesColor: eyesColor
  };
}

function renderWizard(wizard) {

  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

function renderWizards() {

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < MAX_WIZARDS_NUMBER; i++) {
    fragment.appendChild(renderWizard(generateWizard()));
  }

  return fragment;
}

similarListElement.appendChild(renderWizards());

userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');
