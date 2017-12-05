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
    }
  };
})();
