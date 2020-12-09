# BigchainDB Trying

Try to learning about BigchainDB by doing

Summary from [Key concepts of BigchainDB](https://www.bigchaindb.com/developers/guide/key-concepts-of-bigchaindb/)

Test BigchainDB: <https://test.ipdb.io/>

## Getting started

Easiest way to do

```bash
npm install
npm run sample
```

Example output

```bash
###########
make connection to https://test.ipdb.io/api/v1/
###########
###########
raw tx: {
  id: null,
  operation: 'CREATE',
  outputs: [ { condition: [Object], amount: '1', public_keys: [Array] } ],
  inputs: [ { fulfillment: null, fulfills: null, owners_before: [Array] } ],
  metadata: { category: 'Codex', ISBN: '98765', pages: 176 },
  asset: { data: { book: 'How to understand things', age: 1 } },
  version: '2.0'
}
###########
###########
tx signed: {
  id: 'cd934b049924e312df97059d030e984971c211c34dbeaa7194f4e7a84011c324',
  operation: 'CREATE',
  outputs: [ { condition: [Object], amount: '1', public_keys: [Array] } ],
  inputs: [
    {
      fulfillment: 'pGSAIOtvEWrYejujexTEyR_r1zBIlzHSCCXFm0sDQDnd4NeOgUCe4oL-0W67stU128it5TbJIwX_W6v42qmN4NE9eq2S9gGP08fH6a3FczAEW0-kp1rgIebIw08zyS5o54lHGYcA',
      fulfills: null,
      owners_before: [Array]
    }
  ],
  metadata: { category: 'Codex', ISBN: '98765', pages: 176 },
  asset: { data: { book: 'How to understand things', age: 1 } },
  version: '2.0'
}
###########
###########
transaction cd934b049924e312df97059d030e984971c211c34dbeaa7194f4e7a84011c324 passed
###########
```

## Transaction Model

Data as assets.

Assets can be registered on BigchainDB by user `CREATE` transactions and `TRANSFER` (updated) to other users.

**Scenario:** Mr.A registers his book on BigchainDB in `CREATE` transaction. In the next day, He transfers this book to Mrs.B in `TRANSFER` transaction.

`CREATE` transaction

```txt
Input = Mr.A
Asset = Book "How to understand things"
Metadata = Age 1 yr
TX-ID = aaaaa
Output = Mr.A
```

`TRANSFER` transaction

```txt
Input = Mr.A
Asset = Book "How to understand things"
Metadata = Age 1 yr 6 mo (Mr.A transfers this asset after 6 months)
TX-ID = aaaab
Output = Mrs.B
```

Let's map to real transaction. For `CREATE`

<https://github.com/bigchaindb/BEPs/tree/master/13>

```javascript
{
    "id": "0e7a9a9047fdf39eb5ead7170ec412c6bffdbe8d7888966584b4014863e03518", // hash_of_xx(data)
    "version": "2.0", // Spec version <https://github.com/bigchaindb/BEPs/tree/master/13#versioning>
    "inputs": {
        "fulfills": {
            "transaction_id": "107ec21f4c53cd2a934941010437ac74882161bcbefdfd7664268823fc347996",
            "output_index": 0
        },
        "owners_before": [public_key_1, public_key_2, etc.],
        "fulfillment": "pGSAIDgbT-nnN57wgI4Cx17gFHv3UB_pIeAzwZCk10rAjs9bgUDxyNnXMl-5PFgSIOrN7br2Tz59MiWe2XY0zlC7LcN52PKhpmdRtcr7GR1PXuTfQ9dE3vGhv7LHn6QqDD6qYHYM" // n-of-n signature condtion, see owners_before
    },
    "outputs": {
        "condition": {
            "details": {
                "type": "ed25519-sha-256",
                "public_key": "HFp773FH21sPFrn4y8wX3Ddrkzhqy4La4cQLfePT2vz7"
            }, // Crypto condtion spec for more details, https://github.com/bigchaindb/BEPs/tree/master/13#transaction-components-conditions
            "uri": "ni:///sha-256;at0MY6Ye8yvidsgL9FrnKmsVzX0XrNNXFmuAPF4bQeU?fpt=ed25519-sha-256&cost=131072"
        },
        "public_keys": [public_key_1, public_key_2, etc.],
        "amount": "1" // Amount of asset
    },
    "operation": "CREATE", // CREATE, TRANSFER, VALIDATE_ELECTION, CHAIN_MIGRATION_ELECTION, VOTE
    "asset": {
        "data": {
            "desc": "Book name How to understand things",
            "age": 1,
            "condition": "Brand new"
        } // Other operation check https://github.com/bigchaindb/BEPs/tree/master/13#transaction-components-asset
    },
    "metadata": {
        "timestamp": "1510850314",
        "buy_date": "1710850314",
        "book_details": {
            "ISBN": "98765",
            "pages": "178"
        }
    }
}
```

## More details

### Asset

Can be claim (ownership), token, versioned document, time series (sensor data), state machine, permission (RBAC) - role, users, messages

### Input

It is an output of previous transaction. If no previous owner it could be `CREATE` transaction. In `TRANSFER` transaction it needs proof that user is authorized to transfer thing.

### Output

It needs some information that the public key associated with private key is current owner of the asset. For multiple outputs can be called divisible assets

### Metadata

It is an addtional data to a transaction, contains any type of data that can be updated to every transaction.

### Transaction ID

Contains all the information about transaction in a hashed way.
