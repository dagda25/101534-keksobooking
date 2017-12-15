'use strict';

(function () {
  window.backend.load(onLoad, onError);

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 84;
  var MAP_WIDTH = 1200;
  var MAP_HEIGHT = 750;  
  var address = document.querySelector('input#address');
  var addressCoords = {};

  addressCoords.x = MAP_WIDTH / 2;
  addressCoords.y = MAP_HEIGHT / 2;
  address.value = 'x: ' + addressCoords.x + ', y: ' + addressCoords.y;

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

      if (mapPinMain.offsetLeft - shift.x + MAIN_PIN_WIDTH / 2 < MAIN_PIN_WIDTH) {
        addressCoords.x =  MAIN_PIN_WIDTH / 2;
      } else if (mapPinMain.offsetLeft - shift.x + MAIN_PIN_WIDTH / 2 > 1200) {
        addressCoords.x = 1200 - MAIN_PIN_WIDTH / 2;
      } else {
        addressCoords.x = mapPinMain.offsetLeft - shift.x;
      }

      if (mapPinMain.offsetTop - shift.y + MAIN_PIN_HEIGHT < 250) {
        addressCoords.y = 250 - MAIN_PIN_HEIGHT;
      } else if (mapPinMain.offsetTop - shift.y + MAIN_PIN_HEIGHT > 650) {
        addressCoords.y = 650 - MAIN_PIN_HEIGHT;
      } else {
        addressCoords.y = mapPinMain.offsetTop - shift.y;
      }

      mapPinMain.style.top = addressCoords.y + 'px';
      mapPinMain.style.left = addressCoords.x + 'px';

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

  function onLoad(data) {
    window.createPins(data).appendChild(window.createAds(data));

    var map = document.querySelector('.map');
    var mapPins = map.querySelectorAll('.map__pin');
    var popups = map.querySelectorAll('.popup');
    var popupClose = map.querySelectorAll('.popup__close');

    for (var i = 1; i < mapPins.length; i++) {
      mapPins[i].addEventListener('click', function (evt) {
        onMapPinClick(evt, popups, mapPins);
      });
    }

    for (i = 0; i < popupClose.length; i++) {
      popupClose[i].addEventListener('click', function (evt) {
        onPopupCloseClick(evt, mapPins);
      });
    }
  }

  function onError(errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');

    node.textContent = errorMessage;

    if (!errorMessage) {
      node.textContent = 'Произошла ошибка';
    }

    document.body.insertAdjacentElement('afterbegin', node);

    setTimeout(function () {
      document.body.removeChild(node);
    }, 2000);
  }

  function onPopupEscPress (evt) {
    var map = document.querySelector('.map');
    var mapPins = map.querySelectorAll('.map__pin');
    var popups = map.querySelectorAll('.popup');
    var ESC_KEYCODE = 27;

    if (evt.keyCode === ESC_KEYCODE) {

      for (var j = 0; j < popups.length; j++) {
        window.map.closePopup(popups[j], mapPins);
      }

    }
  };

  function onMapPinClick(evt, popups, mapPins) {
    for (var i = 0; i < popups.length; i++) {
      popups[i].classList.add('hidden');
    }

    for (var j = 1; j < mapPins.length; j++) {
      mapPins[j].classList.remove('map__pin--active');
      if (mapPins[j] === evt.currentTarget) {
        window.showCard(popups[j - 1]);
      }
    }

    evt.currentTarget.classList.add('map__pin--active');
  }

  function onPopupCloseClick(evt, mapPins) {
    window.map.closePopup(evt.currentTarget.parentNode, mapPins);
  }

  function closePopup (element, mapPins) {
    element.classList.add('hidden');
    document.removeEventListener('keydown', window.map.onPopupEscPress);

    for (var i = 1; i < mapPins.length; i++) {
      mapPins[i].classList.remove('map__pin--active');
    }
  }

  window.map = {
    onPopupEscPress: onPopupEscPress,
    closePopup: closePopup,
    onError: onError
  };
})();
