// pb_migrations/1700000000_init_collections.js
migrate((db) => {
  const dao = new Dao(db);

  // 1. Settings Collection
  try {
    dao.findCollectionByNameOrId("settings");
  } catch (_) {
    const collection = new Collection({
      name: "settings",
      type: "base",
      schema: [
        { name: "settings_data", type: "json" }
      ],
      listRule: "",
      viewRule: "",
      createRule: "",
      updateRule: "",
      deleteRule: ""
    });
    dao.saveCollection(collection);
  }

  // 2. Posts Collection
  try {
    dao.findCollectionByNameOrId("posts");
  } catch (_) {
    const collection = new Collection({
      name: "posts",
      type: "base",
      schema: [
        { name: "title", type: "text" },
        { name: "slug", type: "text" },
        { name: "excerpt", type: "text" },
        { name: "content", type: "text" },
        { name: "cover_image", type: "text" },
        { name: "status", type: "text" },
        { name: "author", type: "text" }
      ],
      listRule: "",
      viewRule: "",
      createRule: "",
      updateRule: "",
      deleteRule: ""
    });
    dao.saveCollection(collection);
  }

  // 3. Media Collection
  try {
    dao.findCollectionByNameOrId("media");
  } catch (_) {
    const collection = new Collection({
      name: "media",
      type: "base",
      schema: [
        { name: "name", type: "text" },
        { name: "url", type: "text" },
        { name: "type", type: "text" },
        { name: "size", type: "text" }
      ],
      listRule: "",
      viewRule: "",
      createRule: "",
      updateRule: "",
      deleteRule: ""
    });
    dao.saveCollection(collection);
  }
});
