'use strict';

(function () {
  window.createPins = function (relatedAds) {
    var map = document.querySelector('.map');
    var mapPins = map.querySelector('.map__pins');

    for (var i = 0; i < relatedAds.length; i++) {
      var pinWidth = 46;
      var pinHeight = 61;
      var btn = document.createElement('button');
      var fragmentPin = document.createDocumentFragment();
      btn.style.left = relatedAds[i].location.x - pinWidth / 2 + 'px';
      btn.style.top = relatedAds[i].location.y - pinHeight + 'px';
      btn.classList.add('map__pin');
      btn.classList.add('hidden');

      var img = document.createElement('img');
      img.src = relatedAds[i].author.avatar;
      img.width = 40;
      img.height = 40;
      img.draggable = false;

      btn.appendChild(img);
      fragmentPin.appendChild(btn);

      mapPins.appendChild(fragmentPin);
    }
    return map;
  };
})();
