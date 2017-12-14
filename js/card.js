'use strict';

(function () {
  window.createAds = function (data) {
    var fragmentAd = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragmentAd.appendChild(createSingleAd(data[i]));
    }

    return fragmentAd;
  };

  function createSingleAd(dataElement) {
    var template = document.querySelector('template');
    var element = template.content.cloneNode(true);
    element.removeChild(element.children[1]);
    element.children[0].classList.add('hidden');

    var avatar = element.querySelector('.popup__avatar');
    avatar.src = dataElement.author.avatar;

    var title = element.children[0].children[2];
    title.innerText = dataElement.offer.title;

    var address = element.children[0].children[3].children[0];
    address.innerText = dataElement.offer.address;

    var price = element.children[0].children[4];
    price.innerHTML = dataElement.offer.price + ' &#8381;/ночь';

    var type = element.children[0].children[5];
    type.innerText = getLocalName(dataElement.offer.type);

    var rooms = element.children[0].children[6];
    rooms.innerText = dataElement.offer.rooms + ' ' + getPluralEnding(dataElement.offer.rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + dataElement.offer.guests + ' ' + getPluralEnding(dataElement.offer.guests, ['гостя', 'гостей', 'гостей']);

    var checkin = element.children[0].children[7];
    checkin.innerText = 'Заезд после ' + dataElement.offer.checkin + ', выезд до ' + dataElement.offer.checkout;

    var featuresBlock = element.children[0].children[8];
    var numberOfFeatures = dataElement.offer.features.length;

    for (var i = numberOfFeatures; i < featuresBlock.children.length;) {
      featuresBlock.removeChild(featuresBlock.children[i]);
    }

    var description = element.children[0].children[9];
    description.innerText = dataElement.offer.description;

    return element;
  }

  function getLocalName(realtyType) {
    if (realtyType === 'flat') {
      return 'Квартира';
    } else if (realtyType === 'house') {
      return 'Дом';
    }
    return 'Бунгало';
  }

  function getPluralEnding(number, forms) {
    if ([11, 12, 13, 14].indexOf(number) !== -1) {
      return forms[2];
    } else if (number % 10 === 1) {
      return forms[0];
    } else if (number % 10 === 2 || number % 10 === 3 || number % 10 === 4) {
      return forms[1];
    }
    return forms[2];
  }
})();
