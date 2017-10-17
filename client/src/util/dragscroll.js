// from https://github.com/asvd/dragscroll/blob/master/dragscroll.js
// patched
function dragscroll(elements) {
  var _window = window;
  var _document = document;
  var mousemove = 'mousemove';
  var mouseup = 'mouseup';
  var mousedown = 'mousedown';
  var EventListener = 'EventListener';
  var addEventListener = 'add'+EventListener;
  var removeEventListener = 'remove'+EventListener;
  var newScrollX, newScrollY;

  var dragged = [];
  var i;
  var el;
  for (i = 0; i < dragged.length;) {
    el = dragged[i++];
    el = el.container || el;
    el[removeEventListener](mousedown, el.md, 0);
    _window[removeEventListener](mouseup, el.mu, 0);
    _window[removeEventListener](mousemove, el.mm, 0);
  }

  // cloning into array since HTMLCollection is updated dynamically
  dragged = [].slice.call(elements);
  for (i = 0; i < dragged.length;) {
    /* eslint-disable no-loop-func */
    (function(el, lastClientX, lastClientY, pushed, scroller, cont) {
      (cont = el.container || el)[addEventListener](
        mousedown,
        cont.md = function(e) {
          const preventDrag = (
            el.hasAttribute('nochilddrag') ||
            e.target.hasAttribute('nochilddrag')
          );
          const elFromPoint = _document.elementFromPoint(e.pageX, e.pageY);
          if (!preventDrag || elFromPoint === cont) {
            pushed = 1;
            lastClientX = e.clientX;
            lastClientY = e.clientY;

            e.preventDefault();
          }
        }, 0
      );

      _window[addEventListener](
        mouseup, cont.mu = function() {pushed = 0;}, 0
      );

      _window[addEventListener](
        mousemove,
        cont.mm = function(e) {
          if (pushed) {
            (scroller = el.scroller||el).scrollLeft -=
              newScrollX = (- lastClientX + (lastClientX=e.clientX));
            scroller.scrollTop -=
              newScrollY = (- lastClientY + (lastClientY=e.clientY));
            if (el === _document.body) {
              (scroller = _document.documentElement).scrollLeft -= newScrollX;
              scroller.scrollTop -= newScrollY;
            }
          }
        }, 0
      );
    })(dragged[i++]);
  }
}

export default dragscroll;