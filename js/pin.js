'use strict';

(function () {
  var PIN_WIDTH = 46;
  var PIN_HEIGHT = 61;
  var PIN_IMAGE = {
    WIDTH: 40,
    HEIGHT: 40
  };

  window.createPins = function (data) {
    var map = document.querySelector('.map');
    var mapPinsArea = map.querySelector('.map__pins');
    var mapPinMain = map.querySelector('.map__pin--main');
    var form = document.querySelector('.notice__form');
    var mapFilters = map.querySelector('.map__filters');
    var typesFilter = map.querySelector('#housing-type');
    var priceFilter = map.querySelector('#housing-price');
    var roomsFilter = map.querySelector('#housing-rooms');
    var guestsFilter = map.querySelector('#housing-guests');
    var featuresFilter = map.querySelector('#housing-features');
    mapPinMain.features = [];

    data.forEach(function (item) {
      var btn = document.createElement('button');
      var fragmentPin = document.createDocumentFragment();
      btn.style.left = item.location.x - PIN_WIDTH / 2 + 'px';
      btn.style.top = item.location.y - PIN_HEIGHT + 'px';
      btn.classList.add('map__pin');
      btn.classList.add('hidden');
      btn.realtyType = item.offer.type;
      btn.price = item.offer.price;
      btn.rooms = item.offer.rooms;
      btn.guests = item.offer.guests;
      btn.features = item.offer.features;

      var img = document.createElement('img');
      img.src = item.author.avatar;
      img.width = PIN_IMAGE.WIDTH;
      img.height = PIN_IMAGE.HEIGHT;
      img.draggable = false;

      btn.appendChild(img);
      fragmentPin.appendChild(btn);

      mapPinsArea.appendChild(fragmentPin);
    });

    var mapPins = Array.from(map.querySelectorAll('.map__pin'));

    function onMouseUpActivate() {
      activateMap(map);
      activateForm(form);
      showMapPins(mapPins);

      mapPins.forEach(function (element) {
        element.classList.add('hidden');
      });

      mapPins = mapPins.slice(0, 6);

      mapPins.forEach(function (element) {
        element.classList.remove('hidden');
      });
    }

    mapPinMain.addEventListener('mouseup', onMouseUpActivate);

    mapFilters.addEventListener('change', function () {
      window.debounce(onFilterChange);
    });

    function onFilterChange() {
      mapPins = Array.from(map.querySelectorAll('.map__pin'));
      var popups = Array.from(map.querySelectorAll('.popup'));
      mapPins = mapPins.slice(1);
      mapPins.forEach(function (element) {
        element.classList.add('hidden');
      });

      mapPins = filterByType(mapPins, typesFilter.value);
      mapPins = filterByPrice(mapPins, priceFilter.value);
      mapPins = filterByRooms(mapPins, roomsFilter.value);
      mapPins = filterByGuests(mapPins, guestsFilter.value);
      mapPins = filterByFeatures(mapPins, featuresFilter.children[0]);
      mapPins = filterByFeatures(mapPins, featuresFilter.children[2]);
      mapPins = filterByFeatures(mapPins, featuresFilter.children[4]);
      mapPins = filterByFeatures(mapPins, featuresFilter.children[6]);
      mapPins = filterByFeatures(mapPins, featuresFilter.children[8]);
      mapPins = filterByFeatures(mapPins, featuresFilter.children[10]);
      mapPins = mapPins.slice(0, 5);

      mapPins.forEach(function (element) {
        element.classList.remove('hidden');
      });

      mapPinMain.classList.remove('hidden');
      mapPinMain.removeEventListener('mouseup', onMouseUpActivate);

      mapPins = Array.from(map.querySelectorAll('.map__pin'));

      mapPins.forEach(function (item, index) {
        if (item.classList.contains('hidden')) {
          window.map.closePopup(popups[index - 1], mapPins);
        }
      });
    }

    function filterByType(elements, value) {
      return elements.filter(function (element) {
        return (value === 'any' || element.realtyType === value);
      });
    }

    function filterByRooms(elements, value) {
      return elements.filter(function (element) {
        return (value === 'any' || element.rooms === parseInt(value, 10));
      });
    }

    function filterByGuests(elements, value) {
      return elements.filter(function (element) {
        return (value === 'any' || element.guests === parseInt(value, 10));
      });
    }

    function filterByFeatures(elements, field) {
      if (field.checked === true) {
        return elements.filter(function (element) {
          return (element.features.indexOf(field.value) !== -1);
        });
      }
      return elements;
    }

    function filterByPrice(elements, value) {
      return elements.filter(function (element) {
        return (value === 'any') || (value === 'low' && element.price < 10000) || (value === 'middle' && element.price >= 10000 && element.price < 50000) || (value === 'high' && element.price >= 50000);
      });
    }

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
