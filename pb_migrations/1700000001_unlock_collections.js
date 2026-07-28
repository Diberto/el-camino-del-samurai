// pb_migrations/1700000001_unlock_collections.js
migrate((db) => {
  try {
    db.newQuery("UPDATE _collections SET listRule=NULL, viewRule=NULL, createRule=NULL, updateRule=NULL, deleteRule=NULL WHERE name IN ('settings', 'posts', 'media');").execute();
  } catch (_) {}
});
