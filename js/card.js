'use strict';

(function () {
  window.createAds = function (data) {
    var fragmentAd = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragmentAd.appendChild(createAd(data[i]));
    }

    return fragmentAd;
  };

  function createAd(dataElement) {
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

    for (var i = 0; i < featuresBlock.children.length; i++) {
      featuresBlock.children[i].classList.add('hidden');
    }

    dataElement.offer.features.forEach(function (item) {
      switch (item) {
        case 'wifi':
          featuresBlock.children[0].classList.remove('hidden');
          break;
        case 'dishwasher':
          featuresBlock.children[1].classList.remove('hidden');
          break;
        case 'parking':
          featuresBlock.children[2].classList.remove('hidden');
          break;
        case 'washer':
          featuresBlock.children[3].classList.remove('hidden');
          break;
        case 'elevator':
          featuresBlock.children[4].classList.remove('hidden');
          break;
        case 'conditioner':
          featuresBlock.children[5].classList.remove('hidden');
          break;
      }
    });

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
