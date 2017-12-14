'use strict';

(function () {
  window.backend.load(window.backend.onLoad, window.backend.onError);

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

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

window.onPopupEscPress = function (evt) {
  var map = document.querySelector('.map');
  var mapPins = map.querySelectorAll('.map__pin');
  var popups = map.querySelectorAll('.popup');
  var ESC_KEYCODE = 27;

  if (evt.keyCode === ESC_KEYCODE) {

    for (var j = 0; j < popups.length; j++) {
      window.utils.closePopup(popups[j], mapPins);
    }

  }
};
