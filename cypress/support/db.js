import PouchDB from 'pouchdb';

const name = 'centreon-frontend-workshop-2';

function connection() {
  return new PouchDB(name);
}

export default connection;