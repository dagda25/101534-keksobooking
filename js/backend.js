'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';
  var STATUS_OK = 200;
  var TIMEOUT = 10000;

  function setup(onSuccess, onFailure) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onFailure(xhr.response);
      }
    });

    xhr.addEventListener('error', function () {
      onFailure('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onFailure('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  function load(onSuccess, onFailure) {
    var xhr = setup(onSuccess, onFailure);

    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();
  }

  function save(data, onSuccess, onFailure) {
    var xhr = setup(onSuccess, onFailure);

    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  }

  window.backend = {
    load: load,
    save: save
  };
})();
