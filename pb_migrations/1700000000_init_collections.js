// pb_migrations/1700000000_init_collections.js
migrate((db) => {
  try {
    db.newQuery("PRAGMA cache_size = -2000;").execute();
    db.newQuery("PRAGMA temp_store = MEMORY;").execute();
  } catch (_) {}

  const dao = new Dao(db);

  function ensureCol(name, fields) {
    let collection;
    try {
      collection = dao.findCollectionByNameOrId(name);
    } catch (_) {
      collection = new Collection({
        name: name,
        type: "base"
      });
    }

    collection.listRule = "";
    collection.viewRule = "";
    collection.createRule = "";
    collection.updateRule = "";
    collection.deleteRule = "";

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
  }

  // 1. Settings Collection
  ensureCol("settings", [
    { name: "settings_data", type: "json" }
  ]);

  // 2. Posts Collection
  ensureCol("posts", [
    { name: "title", type: "text" },
    { name: "slug", type: "text" },
    { name: "excerpt", type: "text" },
    { name: "content", type: "text" },
    { name: "cover_image", type: "text" },
    { name: "status", type: "text" },
    { name: "author", type: "text" }
  ]);

  // 3. Media Collection
  ensureCol("media", [
    { name: "name", type: "text" },
    { name: "url", type: "text" },
    { name: "type", type: "text" },
    { name: "size", type: "text" }
  ]);
});
