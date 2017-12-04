'use strict';

(function () {
  window.createAds = function (relatedAds) {
    var fragmentAd = document.createDocumentFragment();

    for (var i = 0; i < relatedAds.length; i++) {
      fragmentAd.appendChild(createSingleAd(relatedAds, i));
    }

    return fragmentAd;
  };

  function createSingleAd(relatedAds, i) {
    var template = document.querySelector('template');
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

    return element;
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
})();
