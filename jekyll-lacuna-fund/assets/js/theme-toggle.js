(function () {
  var buttons = document.querySelectorAll('[data-theme-toggle]');
  function update() {
    var light = document.documentElement.classList.contains('light');
    buttons.forEach(function (button) {
      button.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
      button.querySelector('span').textContent = light ? '☾' : '☀';
      var label = button.querySelector('[data-theme-label]');
      if (label) label.textContent = light ? 'Dark' : 'Light';
    });
  }
  buttons.forEach(function (button) { button.addEventListener('click', function () { var light = document.documentElement.classList.toggle('light'); localStorage.setItem('lacuna-theme', light ? 'light' : 'dark'); update(); }); });
  update();
  var sidebar = document.querySelector('[data-sidebar]');
  var frame = document.querySelector('.site-frame');
  var collapse = document.querySelector('[data-sidebar-collapse]');
  function closeMenu() { document.documentElement.classList.remove('sidebar-open'); }
  document.querySelectorAll('[data-sidebar-open]').forEach(function (item) { item.addEventListener('click', function () { document.documentElement.classList.add('sidebar-open'); }); });
  document.querySelectorAll('[data-sidebar-close], [data-sidebar] a').forEach(function (item) { item.addEventListener('click', closeMenu); });
  if (localStorage.getItem('lacuna-sidebar') === 'collapsed') document.documentElement.classList.add('sidebar-collapsed');
  if (collapse) collapse.addEventListener('click', function () { var collapsed = document.documentElement.classList.toggle('sidebar-collapsed'); localStorage.setItem('lacuna-sidebar', collapsed ? 'collapsed' : 'expanded'); });
}());
