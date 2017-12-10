'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  var timeIn = form.querySelector('select#timein');
  var timeOut = form.querySelector('select#timeout');
  var type = form.querySelector('select#type');
  var priceInput = form.querySelector('input#price');
  var roomNumber = form.querySelector('select#room_number');
  var capacity = form.querySelector('select#capacity');

  window.synchronizeFields ('change', timeIn, timeOut, onTimeChange);

  window.synchronizeFields ('change', timeOut, timeIn, onTimeChange);

  window.synchronizeFields ('change', type, priceInput, getMinPriceFromType);

  window.synchronizeFields ('change', roomNumber, capacity, onRoomNumberChange);

  form.addEventListener('invalid', function (evt) {
    evt.target.style.outline = '3px solid red';
  }, true);

  function onTimeChange(firstTime, secondTime) {
     secondTime.value = firstTime.value;
  }

  function getMinPriceFromType(firstField, secondField) {
    var bungaloMinPrice = 0;
    var flatMinPrice = 1000;
    var houseMinPrice = 5000;
    var palaceMinPrice = 10000;
    var minPrice = 0;

    switch (firstField.value) {
      case 'flat':
        minPrice = flatMinPrice;
        break;
      case 'bungalo':
        minPrice = bungaloMinPrice;
        break;
      case 'house':
        minPrice = houseMinPrice;
        break;
      case 'palace':
        minPrice = palaceMinPrice;
        break;
    }

    secondField.min = minPrice;
  }

  function onRoomNumberChange(firstField, secondField) {
    var roomsCapacity;

    if (firstField.value === '100') {
      roomsCapacity = 0;
    } else if (firstField.value === '1') {
      roomsCapacity = 1;
    } else if (firstField.value === '2') {
      roomsCapacity = 2;
    } else {
      roomsCapacity = 3;
    }

    secondField.value = roomsCapacity;
  }
})();
