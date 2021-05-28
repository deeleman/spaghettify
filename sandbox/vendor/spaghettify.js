new Spaghettify({
  enabled: true,
  routes: ['*.html', 'content/*'],
  excludeByAttr: 'no-spa',
  loadProgress: true,
  persistAttr: 'data-persist',
});
