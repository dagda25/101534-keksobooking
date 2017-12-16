'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  var setup = function (onSuccess, onFailure) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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

    xhr.timeout = 10000;

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
