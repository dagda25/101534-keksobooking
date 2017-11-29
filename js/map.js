'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var relatedAds = [];
var map = document.querySelector('.map');
var mapPinMain = map.querySelector('.map__pin--main');

for (var i = 0; i < 8; i++) {
  relatedAds[i] = getRelatedAd(i);
}

createPins(relatedAds).appendChild(createAds(relatedAds));

var mapPin = map.querySelectorAll('.map__pin');
var popups = map.querySelectorAll('.popup');
var popupClose = map.querySelectorAll('.popup__close');


for (var i = 1; i < mapPin.length; i++) {
  mapPin[i].addEventListener('click', onMapPinClick);
}

for (i = 0; i < popupClose.length; i++) {
  popupClose[i].addEventListener('click', onPopupCloseClick);
}

mapPinMain.addEventListener('mouseup', function() {
  activateMap();
  activateForm();  
  showMapPins();
});

mapPinMain.addEventListener('keyup', function(evt) {
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

function getRelatedAd(i) {
  var realtyDescriptions = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var realtyTypes = ['flat', 'house', 'bungalo'];
  var checkinTimes = ['12:00', '13:00', '14:00'];
  var checkoutTimes = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var obj = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },

    'offer': {
      'title': realtyDescriptions[i],
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

function createPins(relatedAds) {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  for (var i = 0; i < relatedAds.length; i++) {
    var pinWidth = 46;
    var pinHeight = 61;
    var btn = document.createElement('button');
    var fragmentPin = document.createDocumentFragment();
    btn.style.left = relatedAds[i].location.x - pinWidth / 2 + 'px';
    btn.style.top = relatedAds[i].location.y - pinHeight + 'px';
    btn.classList.add('map__pin');
    btn.classList.add('hidden');

    var img = document.createElement('img');
    img.src = relatedAds[i].author.avatar;
    img.width = 40;
    img.height = 40;
    img.draggable = false;

    btn.appendChild(img);
    fragmentPin.appendChild(btn);

    mapPins.appendChild(fragmentPin);
  }
  return map;
}

function createAds(relatedAds) {
  var template = document.querySelector('template');
  var fragmentAd = document.createDocumentFragment();

  for (var i = 0; i < relatedAds.length; i++) {
    var element = template.content.cloneNode(true);
    element.removeChild(element.children[1]);
    element.children[0].classList.add('hidden');

    var avatar = element.querySelector('.popup__avatar');
    avatar.src = relatedAds[i].author.avatar;

    var title = element.querySelector('h3');
    title.innerText = relatedAds[i].offer.title;

    var address = element.querySelector('small');
    address.innerText = relatedAds[i].offer.address;

    var price = element.querySelector('.popup__price');
    price.innerText = relatedAds[i].offer.price + ' Р/ночь';

    var type = element.querySelector('h4');
    type.innerText = getLocalName(relatedAds[i].offer.type);

    var rooms = element.querySelectorAll('p')[2];
    rooms.innerText = relatedAds[i].offer.rooms + getRoomsEnding(relatedAds[i].offer.rooms) + relatedAds[i].offer.guests + ' гостей';

    var checkin = element.querySelectorAll('p')[3];
    checkin.innerText = 'Заезд после ' + relatedAds[i].offer.checkin + ', выезд до ' + relatedAds[i].offer.checkout;

    var featuresBlock = element.querySelector('.popup__features');
    var numberOfFeatures = relatedAds[i].offer.features.length;

    for (var j = numberOfFeatures; j < featuresBlock.children.length;) {
      featuresBlock.removeChild(featuresBlock.children[j]);
    }

    var description = element.querySelectorAll('p')[4];
    description.innerText = relatedAds[i].offer.description;

    fragmentAd.appendChild(element);
  }

  return fragmentAd;
};

function activateMap() {
  var map = document.querySelector('.map');

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
  var map = document.querySelector('.map');
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

  while (el = el.previousSibling) {
    el.nodeType == 1 && i++;
  }

  return i;
}
