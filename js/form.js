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
    onTypeChange(evt, priceInput);
  });

  roomNumber.addEventListener('change', function (evt) {
    onRoomNumberChange(evt, capacity);
  });

  form.addEventListener('invalid', function (evt) {
    evt.target.style.outline = '3px solid red';
  }, true);

  function onTimeChange(evt, t) {
    t.value = evt.target.value;
  }

  function onTypeChange(evt, price) {
    var flatMinPrice = 1000;
    var bungaloMinPrice = 0;
    var houseMinPrice = 5000;
    var palaceMinPrice = 10000;

    switch (evt.target.value) {
      case 'flat':
        price.min = flatMinPrice;
        break;
      case 'bungalo':
        price.min = bungaloMinPrice;
        break;
      case 'house':
        price.min = houseMinPrice;
        break;
      case 'palace':
        price.min = palaceMinPrice;
        break;
    }
  }

  function onRoomNumberChange(evt, cap) {
    if (evt.target.value === '100') {
      cap.value = 0;
    } else {
      cap.value = evt.target.value;
    }
  }
})();
