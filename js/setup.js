'use strict';

/*
 * DOM-tree, essential DOM methods, templates.
*/

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var MAX_WIZARDS_NUMBER = 4;
var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;

var setup = document.querySelector('.setup');
var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var setupWizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var setupFireball = setup.querySelector('.setup-fireball-wrap');

/**
 * calculates and returns random value from given array
 *
 * @param  {Array} list
 * @return {*}
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
 * @return {Node}
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
 * @return {Node}
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

setup.classList.remove('hidden');
setup.querySelector('.setup-similar').classList.remove('hidden');

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupUserName.addEventListener('focus', onSetupUserNameFocus);
  setupUserName.addEventListener('blur', onSetupUserNameBlur);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    closePopup();
  }
};

var onSetupUserNameFocus = function () {
  document.removeEventListener('keydown', onPopupEscPress);
};

var onSetupUserNameBlur = function () {
  document.addEventListener('keydown', onPopupEscPress);
};

var onSetupWizardCoatClick = function () {
  var coatColor = getRandomValueFromArray(WIZARD_COAT_COLORS);
  setupWizardCoat.style.fill = coatColor;
  setup.querySelector('input[name="coat-color"]').value = coatColor;
};

var onSetupWizardEyesClick = function () {
  var eyeColor = getRandomValueFromArray(WIZARD_EYES_COLORS);
  setupWizardEyes.style.fill = eyeColor;
  setup.querySelector('input[name="eyes-color"]').value = eyeColor;
};

var onSetupFireballClick = function () {
  var fireballColor = getRandomValueFromArray(WIZARD_FIREBALL_COLORS);
  setupFireball.style.backgroundColor = fireballColor;
  setupFireball.querySelector('input[name="fireball-color"]').value = fireballColor;
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    closePopup();
  }
});

setupWizardCoat.addEventListener('click', onSetupWizardCoatClick);
setupWizardEyes.addEventListener('click', onSetupWizardEyesClick);
setupFireball.addEventListener('click', onSetupFireballClick);
