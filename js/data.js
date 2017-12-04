'use strict';

(function () {
  window.getRelatedAd = function (i) {
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

  function getRandomValue(min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
  }

  function getRandomElement(arr) {
    return arr[getRandomValue(0, arr.length - 1)];
  }

  function getRandomLengthArray(arr) {
    return arr.slice(0, getRandomValue(0, arr.length));
  }
})();
