'use strict';

(function () {
  window.synchronizeFields = function (firstField, secondField, firstFieldValues, secondFieldValues, callback) {
    firstField.addEventListener('change', function () {
      var valueIndex = firstFieldValues.indexOf(firstField.value);
      callback(secondField, secondFieldValues[valueIndex]);
    });
  };
})();
