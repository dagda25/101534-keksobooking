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
      reducePinsToFive(mapPins);
    };

    mapPinMain.addEventListener('mouseup', onMouseUpActivate);

    mapFilters.addEventListener('change', function () {
      window.debounce(onFilterChange);
    });

    function onFilterChange() {
      mapPins.forEach(function (element) {
        element.classList.add('hidden');
      });

      filterByType(mapPins, typesFilter.value);
      filterByPrice(mapPins, priceFilter.value);
      filterByRooms(mapPins, roomsFilter.value);
      filterByGuests(mapPins, guestsFilter.value);
      filterByFeatures(mapPins);
      reducePinsToFive(mapPins);

      mapPinMain.classList.remove('hidden');
      mapPinMain.removeEventListener('mouseup', onMouseUpActivate);
    }

    function reducePinsToFive(elements) {
      var counter = 0;
      for (var j = 1; j < elements.length; j++) {
        if (counter === 5) {
          elements[j].classList.add('hidden');
          continue;
        }

        if (!elements[j].classList.contains('hidden')) {
          counter++;
        }
      }
    }

    function filterByType(elements, value) {
      var visibleElements = elements.filter(function (element) {
        if (value === 'any' || element.realtyType === value) {
          return true;
        }
        return false;
      });

      visibleElements.forEach(function (element) {
        element.classList.remove('hidden');
      });
    }

    function filterByRooms(elements, value) {
      var hiddenElements = elements.filter(function (element) {
        if (value !== 'any' && element.rooms !== +value) {
          return true;
        }
        return false;
      });

      hiddenElements.forEach(function (element) {
        element.classList.add('hidden');
      });
    }

    function filterByGuests(elements, value) {
      var hiddenElements = elements.filter(function (element) {
        if (value !== 'any' && element.guests !== +value) {
          return true;
        }
        return false;
      });

      hiddenElements.forEach(function (element) {
        element.classList.add('hidden');
      });
    }

    function filterByFeatures(elements) {
      if (featuresFilter.children[0].checked === true) {
        elements.forEach(function (element) {
          if (element.features.indexOf('wifi') === -1) {
            element.classList.add('hidden');
          }
        });
      }

      if (featuresFilter.children[2].checked === true) {
        elements.forEach(function (element) {
          if (element.features.indexOf('dishwasher') === -1) {
            element.classList.add('hidden');
          }
        });
      }

      if (featuresFilter.children[4].checked === true) {
        elements.forEach(function (element) {
          if (element.features.indexOf('parking') === -1) {
            element.classList.add('hidden');
          }
        });
      }

      if (featuresFilter.children[6].checked === true) {
        elements.forEach(function (element) {
          if (element.features.indexOf('washer') === -1) {
            element.classList.add('hidden');
          }
        });
      }

      if (featuresFilter.children[8].checked === true) {
        elements.forEach(function (element) {
          if (element.features.indexOf('elevator') === -1) {
            element.classList.add('hidden');
          }
        });
      }

      if (featuresFilter.children[10].checked === true) {
        elements.forEach(function (element) {
          if (element.features.indexOf('conditioner') === -1) {
            element.classList.add('hidden');
          }
        });
      }

    }

    function filterByPrice(elements, value) {
      elements.forEach(function (element) {
        if (value === 'low' && element.price >= 10000) {
          element.classList.add('hidden');
        }

        if (value === 'middle' && (element.price < 10000 || element.price >= 50000)) {
          element.classList.add('hidden');
        }

        if (value === 'high' && element.price < 50000) {
          element.classList.add('hidden');
        }
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
