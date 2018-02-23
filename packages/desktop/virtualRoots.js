module.exports = {
  vFolder: 'src/_',
  default: 'rest',
  map: {
    rest: {
      _components: 'src/components',
      _connectors: 'src/restClient/connectors',
      _store: 'src/restClient/store',
      _src: 'src',
    },
    firebase: {
      _components: 'src/components',
      _connectors: 'src/firebase',
      _store: 'src/store',
      _src: 'src',
    },
    graphql: {
      _components: 'src/components',
      _connectors: 'src/graphqlClient',
      _store: 'src/restClient/store',
      _src: 'src',
    },
    unstated: {
      _components: 'src/components',
      _connectors: 'src/unstated/connectors',
      _store: 'src/unstated/store',
      _src: 'src',
    },
  },
};
