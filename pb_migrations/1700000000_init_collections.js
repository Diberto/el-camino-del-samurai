// pb_migrations/1700000000_init_collections.js
migrate((db) => {
  const dao = new Dao(db);

  function ensureCol(name, schema) {
    try {
      const collection = dao.findCollectionByNameOrId(name);
      collection.listRule = "";
      collection.viewRule = "";
      collection.createRule = "";
      collection.updateRule = "";
      collection.deleteRule = "";
      dao.saveCollection(collection);
    } catch (_) {
      const collection = new Collection({
        name: name,
        type: "base",
        schema: schema,
        listRule: "",
        viewRule: "",
        createRule: "",
        updateRule: "",
        deleteRule: ""
      });
      dao.saveCollection(collection);
    }
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
