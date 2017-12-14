'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; 

    return xhr;
  };

  function load(onLoad, onError) {
    var xhr = setup(onLoad, onError);

    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();
  }

  function save(data, onUpload, onError) {
    var xhr = setup(onUpload, onError);

    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  }

  function onError(errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');
    
    node.textContent = errorMessage;

    if (!errorMessage) {
      node.textContent = 'Произошла ошибка';
    } 

    document.body.insertAdjacentElement('afterbegin', node);

    setTimeout(function() {
      document.body.removeChild(node);
    }, 2000)
  } 

  function onLoad(data) {
    window.createPins(data).appendChild(window.createAds(data));

    var map = document.querySelector('.map');
    var mapPins = map.querySelectorAll('.map__pin');
    var popups = map.querySelectorAll('.popup');
    var popupClose = map.querySelectorAll('.popup__close');

    for (var i = 1; i < mapPins.length; i++) {
      mapPins[i].addEventListener('click', function (evt) {
        onMapPinClick(evt, popups, mapPins);
      });
    }

    for (i = 0; i < popupClose.length; i++) {
      popupClose[i].addEventListener('click', function (evt) {
        onPopupCloseClick(evt, mapPins);
      });
    }
  } 

  function onUpload(data) {
    var form = document.querySelector('.notice__form');
    var node = document.createElement('div');

    node.classList.add('success-message');
    
    node.innerHTML = 'Данные успешно отправлены'; 
    document.body.insertAdjacentElement('afterbegin', node);

    form.reset();

    setTimeout(function() {
      document.body.removeChild(node);
    }, 2000)
  } 

  window.backend = {
    load: load,
    save: save,
    onLoad: onLoad,
    onError: onError,
    onUpload: onUpload
  } 
})();
