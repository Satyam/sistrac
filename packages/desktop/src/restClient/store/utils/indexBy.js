export default function indexBy(collection, indexName, initial = {}) {
  return collection.reduce(
    (coll, item) => ({ ...coll, [item[indexName]]: item }),
    initial,
  );
}
