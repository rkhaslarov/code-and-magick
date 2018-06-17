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

/**
 * calculates and returns random value from given array
 *
 * @param  {Array} list
 * @return {Any}
 */
function getRandomValueFromArray(list) {
  return list[Math.floor(Math.random() * list.length)];
}

/**
 * generates all wizards information by amount
 *
 * @param  {Number} amount - amount of the entities which should be generated
 * @return {Array}
 */
function generateWizardsInfo(amount) {

  var wizards = [];

  for (var i = 0; i < amount; i++) {
    wizards.push({
      name: getRandomValueFromArray(WIZARD_NAMES) + ' ' + getRandomValueFromArray(WIZARD_SURNAMES),
      coatColor: getRandomValueFromArray(WIZARD_COAT_COLORS),
      eyesColor: getRandomValueFromArray(WIZARD_EYES_COLORS)
    });
  }

  return wizards;
}

/**
 * clones essential wizard template and modifies it
 *
 * @param  {Object} wizard - wizard information object
 * @return {Object}
 */
function renderWizard(wizard) {

  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
}

/**
 * renders wizards and returns dom fragment
 *
 * @return {Object}
 */
function renderAllWizards() {

  var fragment = document.createDocumentFragment();
  var wizards = generateWizardsInfo(MAX_WIZARDS_NUMBER);

  wizards.forEach(function (wizard) {
    fragment.appendChild(renderWizard(wizard));
  });

  return fragment;
}

similarListElement.appendChild(renderAllWizards());

userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');
