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
        'price': window.utils.getRandomValue(1000, 1000000),
        'type': window.utils.getRandomElement(realtyTypes),
        'rooms': window.utils.getRandomValue(1, 5),
        'guests': window.utils.getRandomValue(1, 10),
        'checkin': window.utils.getRandomElement(checkinTimes),
        'checkout': window.utils.getRandomElement(checkoutTimes),
        'features': window.utils.getRandomLengthArray(features),
        'description': '',
        'photos': []
      },

      'location': {
        'x': window.utils.getRandomValue(300, 900),
        'y': window.utils.getRandomValue(250, 650)
      }
    };

    obj.offer.address = obj.location.x + ', ' + obj.location.y;
    return obj;
  };
})();
