'use strict';

window.synchronizeFields = function (event, firstField, secondField, callback) {
  callback(firstField, secondField);

  firstField.addEventListener(event, function () {
    callback(firstField, secondField);
  });
};
