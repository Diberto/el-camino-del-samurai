// pb_migrations/1700000002_opinions_collection.js
migrate((db) => {
  try {
    db.newQuery("PRAGMA journal_mode = WAL;").execute();
    db.newQuery("PRAGMA synchronous = NORMAL;").execute();
    db.newQuery("PRAGMA cache_size = -64000;").execute();
    db.newQuery("PRAGMA temp_store = MEMORY;").execute();
  } catch (_) {}

  const dao = new Dao(db);

  let collection;
  try {
    collection = dao.findCollectionByNameOrId("opinions");
  } catch (_) {
    collection = new Collection({
      name: "opinions",
      type: "base"
    });
  }

  collection.listRule = "";
  collection.viewRule = "";
  collection.createRule = "";
  collection.updateRule = "";
  collection.deleteRule = "";

  const fields = [
    { name: "name", type: "text" },
    { name: "role", type: "text" },
    { name: "body", type: "text" },
    { name: "rating", type: "number" },
    { name: "avatar", type: "text" },
    { name: "verified", type: "bool" },
    { name: "status", type: "text" }
  ];

  for (const f of fields) {
    try {
      if (!collection.schema.getFieldByName(f.name)) {
        collection.schema.addField(new SchemaField({
          name: f.name,
          type: f.type
        }));
      }
    } catch (_) {}
  }

  try {
    dao.saveCollection(collection);
  } catch (_) {}

  try {
    db.newQuery("UPDATE _collections SET listRule=NULL, viewRule=NULL, createRule=NULL, updateRule=NULL, deleteRule=NULL WHERE name IN ('settings', 'posts', 'media', 'opinions');").execute();
  } catch (_) {}
});
