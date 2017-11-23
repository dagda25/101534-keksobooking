'use strict';

(function () {
  var relatedAds = [];
  var realtyDescriptions = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var realtyTypes = ['flat', 'house', 'bungalo'];
  var chekinTimes = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var map = document.querySelector('.map');
  var fragmentPin = document.createDocumentFragment();
  var mapPins = document.querySelector('.map__pins');
  var template = document.querySelector('template');
  var fragmentAd = document.createDocumentFragment();

  for (var i = 0; i < 8; i++) {
    relatedAds[i] = {
      'author': {
        'avatar': 'img/avatars/user' + '0' + (i + 1) + '.png'
      },

      'offer': {
        'title': realtyDescriptions[i],
        'address': '',
        'price': getRandomValue(1000, 1000000),
        'type': getRandomElement(realtyTypes),
        'rooms': getRandomValue(1, 5),
        'guests': getRandomValue(1, 10),
        'checkin': getRandomElement(chekinTimes),
        'checkout': getRandomElement(chekinTimes),
        'features': getRandomLengthArray(features),
        'description': '',
        'photos': []
      },

      'location': {
        'x': getRandomValue(300, 900),
        'y': getRandomValue(100, 500)
      }
    };

    relatedAds[i].offer.address = relatedAds[i].location.x + ', ' + relatedAds[i].location.y;
  }

  map.classList.remove('map--faded');

  for (i = 0; i < relatedAds.length; i++) {
    var btn = document.createElement('button');
    btn.style.left = relatedAds[i].location.x - 23 + 'px';
    btn.style.top = relatedAds[i].location.y - 64 + 'px';
    btn.classList.add('map__pin'); 

    var img = document.createElement('img');
    img.src = relatedAds[i].author.avatar;
    img.width = 40;
    img.height = 40;
    img.draggable = false;

    btn.appendChild(img);
    fragmentPin.appendChild(btn);
  }

  mapPins.appendChild(fragmentPin);

  for (i = 0; i < 1/* relatedAds.length*/; i++) {  
    var element = template.content.cloneNode(true);
    element.removeChild(element.children[1]);

    var avatar = element.querySelector('.popup__avatar');
    avatar.src = relatedAds[i].author.avatar;

    var title = element.querySelector('h3');
    title.innerText = relatedAds[i].offer.title;

    var address = element.querySelector('small');
    address.innerText = relatedAds[i].offer.address;

    var price = element.querySelector('.popup__price');
    price.innerText = relatedAds[i].offer.price + ' Р/ночь';

    var type = element.querySelector('h4');
    type.innerText = getRussian(relatedAds[i].offer.type);

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

  map.appendChild(fragmentAd);
})();

function getRandomValue(min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomLengthArray(arr) {
  var newArr = [];
  newArr.length = getRandomValue(0, arr.length);
  for (var i = 0; i < newArr.length; i++) {
    newArr[i] = arr[i];
  }
  return newArr;
}

function getRussian(x) {
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
};
