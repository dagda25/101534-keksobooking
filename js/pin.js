'use strict';

(function () {
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

    for (var i = 0; i < data.length; i++) {
      var PIN_WIDTH = 46;
      var PIN_HEIGHT = 61;
      var btn = document.createElement('button');
      var fragmentPin = document.createDocumentFragment();
      btn.style.left = data[i].location.x - PIN_WIDTH / 2 + 'px';
      btn.style.top = data[i].location.y - PIN_HEIGHT + 'px';
      btn.classList.add('map__pin');
      btn.classList.add('hidden');
      btn.realtyType = data[i].offer.type;
      btn.price = data[i].offer.price;
      btn.rooms = data[i].offer.rooms;
      btn.guests = data[i].offer.guests;
      btn.features = data[i].offer.features;

      var img = document.createElement('img');
      img.src = data[i].author.avatar;
      img.width = 40;
      img.height = 40;
      img.draggable = false;

      btn.appendChild(img);
      fragmentPin.appendChild(btn);

      mapPinsArea.appendChild(fragmentPin);
    }

    var mapPins = Array.from(map.querySelectorAll('.map__pin'));

    var onMouseUpActivate = function () {
      activateMap(map);
      activateForm(form);
      showMapPins(mapPins);

      mapPins.forEach(function (element) {
        element.classList.add('hidden');
      });

      mapPins = reducePinsToFive(mapPins);

      mapPins.forEach(function (element) {
        element.classList.remove('hidden');
      });      
    };

    mapPinMain.addEventListener('mouseup', onMouseUpActivate);

    mapFilters.addEventListener('change', function () {
      window.debounce(onFilterChange);
    });

    function onFilterChange() {
      mapPins = Array.from(map.querySelectorAll('.map__pin'));
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
      mapPins = reducePinsToFive(mapPins);

      mapPins.forEach(function (element) {
        element.classList.remove('hidden');
      });

      mapPinMain.classList.remove('hidden');
      mapPinMain.removeEventListener('mouseup', onMouseUpActivate);
    }

    function reducePinsToFive(elements) {
      return elements.slice(0, 6);
    }

    function filterByType(elements, value) {
      return elements.filter(function (element) {
        return (value === 'any' || element.realtyType === value); 
      });
    }

    function filterByRooms(elements, value) {
      return elements.filter(function (element) {
        return (value === 'any' || element.rooms === parseInt(value)); 
      });
    }

    function filterByGuests(elements, value) {
      return elements.filter(function (element) {
        return (value === 'any' || element.guests === parseInt(value)); 
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
        return (value === 'any') || (value === 'low' && element.price < 10000) || (value === 'middle' && element.price >= 10000 && element.price < 50000) || (value === 'high' && element.price >= 50000) ; 
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
