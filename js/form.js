'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var form = document.querySelector('.notice__form');
  var timeIn = form.querySelector('select#timein');
  var timeOut = form.querySelector('select#timeout');
  var type = form.querySelector('select#type');
  var priceInput = form.querySelector('input#price');
  var roomNumber = form.querySelector('select#room_number');
  var capacity = form.querySelector('select#capacity');
  var avatarChooser = form.querySelector('.notice__photo input[type=file]');
  var avatarPreview = form.querySelector('.notice__preview img');
  var photoContainer = form.querySelector('.form__photo-container');
  var photoChooser = photoContainer.querySelector('input[type=file]');


  window.synchronizeFields(timeIn, timeOut, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);

  window.synchronizeFields(timeOut, timeIn, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);

  window.synchronizeFields(type, priceInput, ['bungalo', 'flat', 'house', 'palace'], [0, 1000, 5000, 10000], syncValueWithMin);

  window.synchronizeFields(roomNumber, capacity, ['100', '1', '2', '3'], ['0', '1', '2', '3'], syncRoomsAndGuests);


  form.addEventListener('invalid', function (evt) {
    evt.target.style.outline = '3px solid red';
  }, true);

  capacity.addEventListener('change', function (evt) {
    if (evt.target.value === '0') {
      roomNumber.value = '100';
    }
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(form);

    window.backend.save(formData, onUpload, window.map.onError);

  });

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  photoChooser.addEventListener('change', function () {
    var file = photoChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var photo = document.createElement('img');
        photo.src = reader.result;
        photo.height = '80';
        photo.style.maxWidth = '100%';
        photo.style.marginTop = '10px';
        photo.style.marginLeft = '10px';
        photoContainer.appendChild(photo);
      });

      reader.readAsDataURL(file);
    }
  });

  function syncValues(element, value) {
    element.value = value;
  }

  function syncRoomsAndGuests(element, value) {
    switch (value) {
      case '0':
        [].forEach.call(element.options, function (item) {
          item.hidden = (item.value !== '0');
          item.selected = (item.value === '0');
        });
        break;
      case '1':
        [].forEach.call(element.options, function (item) {
          item.hidden = (item.value !== '1');
          item.selected = (item.value === '1');
        });
        break;
      case '2':
        [].forEach.call(element.options, function (item) {
          item.hidden = (item.value === '3' || item.value === '0');
          item.selected = (item.value === '1');
        });
        break;
      case '3':
        [].forEach.call(element.options, function (item) {
          item.hidden = (item.value === '0');
          item.selected = (item.value === '1');
        });
        break;
    }

  }

  function syncValueWithMin(element, value) {
    element.min = value;
  }

  function onUpload() {
    var address = document.querySelector('input#address');
    var addressValue = address.value;
    var node = document.createElement('div');

    node.classList.add('success-message');

    node.innerHTML = 'Данные успешно отправлены';
    document.body.insertAdjacentElement('afterbegin', node);

    form.reset();

    address.value = addressValue;

    setTimeout(function () {
      document.body.removeChild(node);
    }, 2000);
  }
})();
