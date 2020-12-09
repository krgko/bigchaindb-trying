const driver = require("bigchaindb-driver");

const API_PATH = "http://localhost:9984/api/v1/";
// const API_PATH = "https://test.ipdb.io/api/v1/";

// Create new key pair
const krgko = new driver.Ed25519Keypair();

// Connection to test net
const conn = new driver.Connection(API_PATH);
console.log("###########");
console.log(`make connection to ${API_PATH}`);
console.log("###########");

const tx = driver.Transaction.makeCreateTransaction(
  { book: "How to understand things", age: 1 },
  { category: "Codex", ISBN: "98765", pages: 176 },
  [
    driver.Transaction.makeOutput(
      driver.Transaction.makeEd25519Condition(krgko.publicKey)
    ),
  ],
  krgko.publicKey
);
console.log("###########");
console.log("raw tx:", tx);
console.log("###########");

const txSigned = driver.Transaction.signTransaction(tx, krgko.privateKey);
console.log("###########");
console.log("tx signed:", txSigned);
console.log("###########");

conn.postTransactionCommit(txSigned).then((retrieveTx) => {
  console.log("###########");
  console.log(`transaction ${retrieveTx.id} passed`);
  console.log("###########");
  return;
});
