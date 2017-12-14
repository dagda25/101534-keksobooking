'use strict';

(function () {
  window.utils = {
    getRandomValue: function (min, max) {
      return min + Math.floor(Math.random() * (max + 1 - min));
    },

    getRandomElement: function (arr) {
      return arr[window.utils.getRandomValue(0, arr.length - 1)];
    },

    getRandomLengthArray: function (arr) {
      return arr.slice(0, window.utils.getRandomValue(0, arr.length));
    },

    closePopup: function (element, mapPins) {
      element.classList.add('hidden');
      document.removeEventListener('keydown', window.onPopupEscPress);

      for (var i = 1; i < mapPins.length; i++) {
        mapPins[i].classList.remove('map__pin--active');
      }
    }
  };
})();
