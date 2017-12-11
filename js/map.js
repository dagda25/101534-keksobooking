'use strict';

(function () {
  var ENTER_KEYCODE = 13;

  var relatedAds = [];
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');

  for (var i = 0; i < 8; i++) {
    relatedAds[i] = window.getRelatedAd(i);
  }

  window.createPins(relatedAds).appendChild(window.createAds(relatedAds));

  var mapPins = map.querySelectorAll('.map__pin');
  var popups = map.querySelectorAll('.popup');
  var popupClose = map.querySelectorAll('.popup__close');

  for (i = 1; i < mapPins.length; i++) {
    mapPins[i].addEventListener('click', function (evt) {
      onMapPinClick(evt, popups, mapPins);
    });
  }

  for (i = 0; i < popupClose.length; i++) {
    popupClose[i].addEventListener('click', function (evt) {
      onPopupCloseClick(evt, mapPins);
    });
  }

  mapPinMain.addEventListener('mouseup', function () {
    activateMap(map);
    activateForm(form);
    showMapPins(mapPins);
  });

  mapPinMain.addEventListener('keyup', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      activateMap(map);
      activateForm(form);
      showMapPins(mapPins);
    }
  });

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var address = document.querySelector('input#address');
      var MAIN_PIN_WIDTH = 62;
      var MAIN_PIN_HEIGHT = 84;
      var addressCoords = {};

      if (mapPinMain.offsetLeft - shift.x + MAIN_PIN_WIDTH / 2 < MAIN_PIN_WIDTH) {
        addressCoords.x = MAIN_PIN_WIDTH;
      } else if (mapPinMain.offsetLeft - shift.x + MAIN_PIN_WIDTH / 2 > 1200) {
        addressCoords.x = 1200;
      } else {
        addressCoords.x = mapPinMain.offsetLeft - shift.x + MAIN_PIN_WIDTH / 2;
      }

      if (mapPinMain.offsetTop - shift.y + MAIN_PIN_HEIGHT < 250) {
        addressCoords.y = 250;
      } else if (mapPinMain.offsetTop - shift.y + MAIN_PIN_HEIGHT > 650) {
        addressCoords.y = 650;
      } else {
        addressCoords.y = mapPinMain.offsetTop - shift.y + MAIN_PIN_HEIGHT;
      }

      mapPinMain.style.top = (addressCoords.y - MAIN_PIN_HEIGHT) + 'px';
      mapPinMain.style.left = (addressCoords.x - MAIN_PIN_WIDTH / 2) + 'px';

      address.value = 'x: ' + addressCoords.x + ', y: ' + addressCoords.y;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

function activateMap(map) {
  map.classList.remove('map--faded');
}

function activateForm(form) {
  var fieldset = form.querySelectorAll('fieldset');

  form.classList.remove('notice__form--disabled');

  for (var i = 0; i < fieldset.length; i++) {
    fieldset[i].disabled = false;
  }
}

function showMapPins(mapPins) {
  for (var i = 1; i < mapPins.length; i++) {
    mapPins[i].classList.remove('hidden');
  }
}

function closePopup(element, mapPins) {
  element.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);

  for (var j = 1; j < mapPins.length; j++) {
    mapPins[j].classList.remove('map__pin--active');
  }
}

function onMapPinClick(evt, popups, mapPins) {
  for (var i = 0; i < popups.length; i++) {
    popups[i].classList.add('hidden');
  }

  for (var j = 1; j < mapPins.length; j++) {
    mapPins[j].classList.remove('map__pin--active');
    if (mapPins[j] === evt.currentTarget) {
      showCard(popups[j - 1]);
    }
  }

  evt.currentTarget.classList.add('map__pin--active');

}

function onPopupCloseClick(evt, mapPins) {
  closePopup(evt.currentTarget.parentNode, mapPins);
}

function onPopupEscPress(evt) {
  var map = document.querySelector('.map');
  var mapPins = map.querySelectorAll('.map__pin');
  var popups = map.querySelectorAll('.popup');
  var ESC_KEYCODE = 27;

  if (evt.keyCode === ESC_KEYCODE) {

    for (var j = 0; j < popups.length; j++) {
      closePopup(popups[j], mapPins);
    }

  }
}
