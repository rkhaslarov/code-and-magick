'use strict';

(function () {

  var setup = document.querySelector('.setup');
  var setupUserDialog = setup.querySelector('.setup-user .upload');

  setupUserDialog.addEventListener('mousedown', function (downEvt) {

    downEvt.preventDefault();

    var isDragging = false;
    var startPosition = {
      x: downEvt.clientX,
      y: downEvt.clientY
    };

    var onMouseMove = function (moveEvt) {

      moveEvt.preventDefault();

      var shift = {
        x: startPosition.x - moveEvt.clientX,
        y: startPosition.y - moveEvt.clientY
      };

      isDragging = true;

      startPosition = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {

      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (isDragging) {

        var onClickPreventDefault = function (e) {
          e.preventDefault();
          setupUserDialog.removeEventListener('click', onClickPreventDefault);
        };

        setupUserDialog.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

