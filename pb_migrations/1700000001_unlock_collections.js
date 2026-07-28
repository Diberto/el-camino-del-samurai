// pb_migrations/1700000001_unlock_collections.js
migrate((db) => {
  const dao = new Dao(db);
  const collections = ["settings", "posts", "media"];

  for (const name of collections) {
    try {
      const collection = dao.findCollectionByNameOrId(name);
      collection.listRule = null;
      collection.viewRule = null;
      collection.createRule = null;
      collection.updateRule = null;
      collection.deleteRule = null;
      dao.saveCollection(collection);
    } catch (_) {}
  }
});
