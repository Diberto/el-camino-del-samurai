// pb_migrations/1700000001_unlock_collections.js
migrate((db) => {
  try {
    db.newQuery("UPDATE _collections SET listRule='', viewRule='', createRule='', updateRule='', deleteRule='' WHERE name IN ('settings', 'posts', 'media', 'opinions');").execute();
  } catch (_) {}
});
