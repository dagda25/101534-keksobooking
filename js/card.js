'use strict';

(function () {
  window.createAds = function (relatedAds) {
    var fragmentAd = document.createDocumentFragment();

    for (var i = 0; i < relatedAds.length; i++) {
      fragmentAd.appendChild(createSingleAd(relatedAds[i]));
    }

    return fragmentAd;
  };

  function createSingleAd(relatedAd) {
    var template = document.querySelector('template');
    var element = template.content.cloneNode(true);
    element.removeChild(element.children[1]);
    element.children[0].classList.add('hidden');

    var avatar = element.querySelector('.popup__avatar');
    avatar.src = relatedAd.author.avatar;

    var title = element.children[0].children[2];
    title.innerText = relatedAd.offer.title;

    var address = element.children[0].children[3].children[0];
    address.innerText = relatedAd.offer.address;

    var price = element.children[0].children[4];
    price.innerHTML = relatedAd.offer.price + ' &#8381;/ночь';

    var type = element.children[0].children[5];
    type.innerText = getLocalName(relatedAd.offer.type);

    var rooms = element.children[0].children[6];
    rooms.innerText = relatedAd.offer.rooms + ' ' + getPluralEnding(relatedAd.offer.rooms, 'комната', 'комнаты', 'комнат') + ' для ' + relatedAd.offer.guests + ' ' + getPluralEnding(relatedAd.offer.guests, 'гостя', 'гостей', 'гостей');

    var checkin = element.children[0].children[7];
    checkin.innerText = 'Заезд после ' + relatedAd.offer.checkin + ', выезд до ' + relatedAd.offer.checkout;

    var featuresBlock = element.children[0].children[8];
    var numberOfFeatures = relatedAd.offer.features.length;

    for (var i = numberOfFeatures; i < featuresBlock.children.length;) {
      featuresBlock.removeChild(featuresBlock.children[i]);
    }

    var description = element.children[0].children[9];
    description.innerText = relatedAd.offer.description;

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

  function getPluralEnding(number, firstForm, secondForm, thirdForm) {
    var stringNumber = number.toString();
    if (number === 11 || number === 12 || number === 13 || number === 14) {
      return thirdForm;
    } else if (stringNumber.slice(-1) === '1') {
      return firstForm;
    } else if (stringNumber.slice(-1) === '2' || stringNumber.slice(-1) === '3' || stringNumber.slice(-1) === '4') {
      return secondForm;
    }
    return thirdForm;
  }
})();
