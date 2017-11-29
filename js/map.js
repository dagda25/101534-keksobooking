'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var relatedAds = [];
var map = document.querySelector('.map');
var mapPinMain = map.querySelector('.map__pin--main');

for (var q = 0; q < 8; q++) {
  relatedAds[q] = getRelatedAd(q);
}

createPins(relatedAds).appendChild(createAds(relatedAds));

var mapPin = map.querySelectorAll('.map__pin');
var popups = map.querySelectorAll('.popup');
var popupClose = map.querySelectorAll('.popup__close');


for (var y = 1; y < mapPin.length; y++) {
  mapPin[y].addEventListener('click', onMapPinClick);
}

for (var z = 0; z < popupClose.length; z++) {
  popupClose[z].addEventListener('click', onPopupCloseClick);
}

mapPinMain.addEventListener('mouseup', function () {
  activateMap();
  activateForm();
  showMapPins();
});

mapPinMain.addEventListener('keyup', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateMap();
    activateForm();
    showMapPins();
  }
});

function getRandomValue(min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

function getRandomElement(arr) {
  return arr[getRandomValue(0, arr.length - 1)];
}

function getRandomLengthArray(arr) {
  return arr.slice(0, getRandomValue(0, arr.length));
}

function getLocalName(x) {
  if (x === 'flat') {
    return 'Квартира';
  } else if (x === 'house') {
    return 'Дом';
  }
  return 'Бунгало';
}

function getRoomsEnding(x) {
  if (x === 1) {
    return ' комната для ';
  } else if (x === 5) {
    return ' комнат для ';
  }
  return ' комнаты для ';
}

function getRelatedAd(index) {
  var realtyDescriptions = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var realtyTypes = ['flat', 'house', 'bungalo'];
  var checkinTimes = ['12:00', '13:00', '14:00'];
  var checkoutTimes = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var obj = {
    'author': {
      'avatar': 'img/avatars/user0' + (index + 1) + '.png'
    },

    'offer': {
      'title': realtyDescriptions[index],
      'address': '',
      'price': getRandomValue(1000, 1000000),
      'type': getRandomElement(realtyTypes),
      'rooms': getRandomValue(1, 5),
      'guests': getRandomValue(1, 10),
      'checkin': getRandomElement(checkinTimes),
      'checkout': getRandomElement(checkoutTimes),
      'features': getRandomLengthArray(features),
      'description': '',
      'photos': []
    },

    'location': {
      'x': getRandomValue(300, 900),
      'y': getRandomValue(100, 500)
    }
  };

  obj.offer.address = obj.location.x + ', ' + obj.location.y;
  return obj;
}

function createPins(arr) {
  var mapPins = map.querySelector('.map__pins');

  for (var x = 0; x < arr.length; x++) {
    var pinWidth = 46;
    var pinHeight = 61;
    var btn = document.createElement('button');
    var fragmentPin = document.createDocumentFragment();
    btn.style.left = arr[x].location.x - pinWidth / 2 + 'px';
    btn.style.top = arr[x].location.y - pinHeight + 'px';
    btn.classList.add('map__pin');
    btn.classList.add('hidden');

    var img = document.createElement('img');
    img.src = arr[x].author.avatar;
    img.width = 40;
    img.height = 40;
    img.draggable = false;

    btn.appendChild(img);
    fragmentPin.appendChild(btn);

    mapPins.appendChild(fragmentPin);
  }
  return map;
}

function createAds(arr) {
  var template = document.querySelector('template');
  var fragmentAd = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    var element = template.content.cloneNode(true);
    element.removeChild(element.children[1]);
    element.children[0].classList.add('hidden');

    var avatar = element.querySelector('.popup__avatar');
    avatar.src = arr[i].author.avatar;

    var title = element.querySelector('h3');
    title.innerText = arr[i].offer.title;

    var address = element.querySelector('small');
    address.innerText = arr[i].offer.address;

    var price = element.querySelector('.popup__price');
    price.innerText = arr[i].offer.price + ' Р/ночь';

    var type = element.querySelector('h4');
    type.innerText = getLocalName(arr[i].offer.type);

    var rooms = element.querySelectorAll('p')[2];
    rooms.innerText = arr[i].offer.rooms + getRoomsEnding(arr[i].offer.rooms) + arr[i].offer.guests + ' гостей';

    var checkin = element.querySelectorAll('p')[3];
    checkin.innerText = 'Заезд после ' + arr[i].offer.checkin + ', выезд до ' + arr[i].offer.checkout;

    var featuresBlock = element.querySelector('.popup__features');
    var numberOfFeatures = arr[i].offer.features.length;

    for (var j = numberOfFeatures; j < featuresBlock.children.length;) {
      featuresBlock.removeChild(featuresBlock.children[j]);
    }

    var description = element.querySelectorAll('p')[4];
    description.innerText = arr[i].offer.description;

    fragmentAd.appendChild(element);
  }

  return fragmentAd;
}

function activateMap() {
  map.classList.remove('map--faded');
}

function activateForm() {
  var form = document.querySelector('.notice__form');
  var fieldset = form.querySelectorAll('fieldset');

  form.classList.remove('notice__form--disabled');

  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = false;
  }
}

function showMapPins() {
  var mapPins = map.querySelectorAll('.map__pin');

  for (var i = 1; i < mapPins.length; i++) {
    mapPins[i].classList.remove('hidden');
  }
}

function openPopup(element) {
  element.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
}

function closePopup(element) {
  element.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);

  for (var j = 1; j < mapPin.length; j++) {
    mapPin[j].classList.remove('map__pin--active');
  }
}

function onMapPinClick(evt) {
  for (var i = 0; i < popups.length; i++) {
    popups[i].classList.add('hidden');
  }

  for (var j = 1; j < mapPin.length; j++) {
    mapPin[j].classList.remove('map__pin--active');
  }

  evt.currentTarget.classList.add('map__pin--active');
  openPopup(popups[getElementNumber(evt.currentTarget) - 2]);
}

function onPopupCloseClick(evt) {
  closePopup(evt.currentTarget.parentNode);
}

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {

    for (var j = 0; j < popups.length; j++) {
      closePopup(popups[j]);
    }

  }
}

function getElementNumber(el) {
  var i = 0;

  while (el.previousSibling) {
    if (el.previousSibling.nodeType === 1) {
      i++;
    }

    el = el.previousSibling;
  }

  return i;
}
