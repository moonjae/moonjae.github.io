//= require_self

(function () {
  // Tag filter on the index: buttons toggle rows, state lives in the hash.
  var rows = Array.prototype.slice.call(document.querySelectorAll('.post-row'));
  var buttons = Array.prototype.slice.call(document.querySelectorAll('button.tag-btn'));
  var empty = document.getElementById('emptyNote');

  function tagsOf(row) {
    return (row.getAttribute('data-tags') || '').split(/\s+/);
  }

  function apply(tag) {
    var shown = 0;
    rows.forEach(function (row) {
      var on = tag === 'all' || tagsOf(row).indexOf(tag) !== -1;
      row.hidden = !on;
      if (on) shown++;
    });
    buttons.forEach(function (button) {
      button.classList.toggle('is-active', button.getAttribute('data-filter') === tag);
    });
    if (empty) empty.hidden = shown > 0;
  }

  function fromHash() {
    var match = location.hash.match(/^#tag=([\w-]+)/);
    apply(match ? match[1] : 'all');
  }

  if (buttons.length) {
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var filter = button.getAttribute('data-filter');
        history.replaceState(null, '', filter === 'all' ? '#all' : '#tag=' + filter);
        apply(filter);
      });
    });
    window.addEventListener('hashchange', fromHash);
    fromHash();
  }

  // Zooming: enlarge post images on click.
  if (typeof Zooming === 'function') {
    new Zooming({ customSize: '100%', scaleBase: 0.9, scaleExtra: 0 }).listen('.zooming');
  }

})();
