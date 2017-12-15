'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  var timeIn = form.querySelector('select#timein');
  var timeOut = form.querySelector('select#timeout');
  var type = form.querySelector('select#type');
  var priceInput = form.querySelector('input#price');
  var roomNumber = form.querySelector('select#room_number');
  var capacity = form.querySelector('select#capacity');

  window.synchronizeFields(timeIn, timeOut, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);

  window.synchronizeFields(timeOut, timeIn, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);

  window.synchronizeFields(type, priceInput, ['bungalo', 'flat', 'house', 'palace'], [0, 1000, 5000, 10000], syncValueWithMin);

  window.synchronizeFields(roomNumber, capacity, ['100', '1', '2', '3'], ['0', '1', '2', '3'], syncValues);

  form.addEventListener('invalid', function (evt) {
    evt.target.style.outline = '3px solid red';
  }, true);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(form);

    window.backend.save(formData, onUpload, window.map.onError);
  });

  function syncValues(element, value) {
    element.value = value;
  }

  function syncValueWithMin(element, value) {
    element.min = value;
  }

  function onUpload() {
    var node = document.createElement('div');

    node.classList.add('success-message');

    node.innerHTML = 'Данные успешно отправлены';
    document.body.insertAdjacentElement('afterbegin', node);

    form.reset();

    setTimeout(function () {
      document.body.removeChild(node);
    }, 2000);
  }
})();
