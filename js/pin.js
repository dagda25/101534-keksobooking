'use strict';

(function () {
  window.createPins = function (data) {
    var map = document.querySelector('.map');
    var mapPinsArea = map.querySelector('.map__pins');
    var mapPinMain = map.querySelector('.map__pin--main');
    var form = document.querySelector('.notice__form');

    for (var i = 0; i < data.length; i++) {
      var PIN_WIDTH = 46;
      var PIN_HEIGHT = 61;
      var btn = document.createElement('button');
      var fragmentPin = document.createDocumentFragment();
      btn.style.left = data[i].location.x - PIN_WIDTH / 2 + 'px';
      btn.style.top = data[i].location.y - PIN_HEIGHT + 'px';
      btn.classList.add('map__pin');
      btn.classList.add('hidden');

      var img = document.createElement('img');
      img.src = data[i].author.avatar;
      img.width = 40;
      img.height = 40;
      img.draggable = false;

      btn.appendChild(img);
      fragmentPin.appendChild(btn);

      mapPinsArea.appendChild(fragmentPin);
    }

    var mapPins = map.querySelectorAll('.map__pin');

    mapPinMain.addEventListener('mouseup', function () {
      activateMap(map);
      activateForm(form);
      showMapPins(mapPins);
    });

    return map;
  };

  function activateMap(map) {
    map.classList.remove('map--faded');
  }

  function activateForm(form) {
    var fieldset = form.querySelectorAll('fieldset');

    form.classList.remove('notice__form--disabled');

    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = false;
    }
  }

  function showMapPins(mapPins) {
    for (var i = 1; i < mapPins.length; i++) {
      mapPins[i].classList.remove('hidden');
    }
  }
})();
