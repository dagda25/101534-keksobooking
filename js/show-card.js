'use strict';

(function () {
  window.showCard = function (card) {
    card.classList.remove('hidden');
    document.addEventListener('keydown', window.onPopupEscPress);
  }
})();
