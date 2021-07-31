const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Conexão URL
const url = 'mongodb://localhost:27017';

// Nome do banco
const dbName = 'to-do-db';
const client = new MongoClient(url, { useUnifiedTopology: true });

var _db

// Use connect method to connect to the server
function connectToDb(callback) {
  client.connect(function (err) {
    console.log('Conectado com o banco');
    _db = client.db(dbName);
    callback(err)
  });
}

//Aqui e onde criamos nossas funcionalidades para interagir com o CRUD no banco.

const findDocuments = async () => {
  // Get the documents collection
  const collection = _db.collection('to-do-collection');
  // Find some documents
  try { // tratamento de erro!
    const results = await collection.find({}).toArray();
    return results
  } catch (error) {
    throw new Error(error)
  }
}

//Aqui e a função de inserir dados no banco!

const insertDocuments = async (document) => {
  // Get the documents collection
  const collection = _db.collection('to-do-collection');
  // Insert some documents
  try {
    const results = await collection.insertOne(document);
    return results
  } catch (error) {
    throw new Error(error)
  }
};

//Aqui é a função do Update!

const updateDocument = async (document) => {
  // Get the documents collection
  const collection = _db.collection('to-do-collection');
  // Update document where a is 2, set b equal to 1
  try {
    const results = await collection.updateOne({ _id: document._id }, { $set: document })
    return results
  } catch (error) {
    throw new Error(error)
  }
};

//Aqui é o Delete

const removeDocument = async (document) => {
  // Get the documents collection
  const collection = _db.collection('to-do-collection');
  // Delete document where a is 3
  collection.deleteOne({ _id: document._id });
  try {
    const results = await collection.deleteOne({ _id: document._id });
    return results
  } catch (error) {
    throw new Error(error)
  }
};

module.exports = {
  connectToDb,
  findDocuments,
  insertDocuments,
  updateDocument,
  removeDocument
}

/* connectToDb(async () => {
  const results = await findDocuments()
  console.log(results)
}) */

//18: 20