'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  var timeIn = form.querySelector('select#timein');
  var timeOut = form.querySelector('select#timeout');
  var type = form.querySelector('select#type');
  var priceInput = form.querySelector('input#price');
  var roomNumber = form.querySelector('select#room_number');
  var capacity = form.querySelector('select#capacity');

  timeIn.addEventListener('change', function (evt) {
    onTimeChange(evt, timeOut);
  });

  timeOut.addEventListener('change', function (evt) {
    onTimeChange(evt, timeIn);
  });

  type.addEventListener('change', function (evt) {
    priceInput.min = onTypeChange(evt.target.value);
  });

  roomNumber.addEventListener('change', function (evt) {
    capacity.value = onRoomNumberChange(evt.target.value);
  });

  form.addEventListener('invalid', function (evt) {
    evt.target.style.outline = '3px solid red';
  }, true);

  function onTimeChange(evt, time) {
    time.value = evt.target.value;
  }

  function onTypeChange(realtyType) {
    var bungaloMinPrice = 0;
    var flatMinPrice = 1000;
    var houseMinPrice = 5000;
    var palaceMinPrice = 10000;
    var minPrice;

    switch (realtyType) {
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

    return minPrice;
  }

  function onRoomNumberChange(rooms) {
    var roomsCapacity;

    if (rooms === '100') {
      roomsCapacity = 0;
    } else if (rooms === '1') {
      roomsCapacity = 1;
    } else if (rooms === '2'){
      roomsCapacity = 2;
    } else {
      roomsCapacity = 3;
    }

    return roomsCapacity;
  }
})();
