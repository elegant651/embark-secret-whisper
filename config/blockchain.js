const fs = require('fs')
let secrets
if(fs.existsSync('secrets.json')) {
  secrets = JSON.parse(fs.readFileSync('secrets.json', 'utf8'))
}

module.exports = {
  // applies to all environments
  default: {
    enabled: true,
    // client: "geth"
    rpcHost: "localhost", // HTTP-RPC server listening interface (default: "localhost")
    rpcPort: 8545, // HTTP-RPC server listening port (default: 8545)
    rpcCorsDomain: { // Domains from which to accept cross origin requests (browser enforced). This can also be a comma separated list
      auto: true, // When "auto" is true, Embark will automatically set the cors to the address of the webserver
      additionalCors: [] // Additional CORS domains to add to the list. If "auto" is false, only those will be added
    },
    wsRPC: true, // Enable the WS-RPC server
    wsOrigins: { // Same thing as "rpcCorsDomain", but for WS origins
      auto: true,
      additionalCors: []
    },
    wsHost: "localhost", // WS-RPC server listening interface (default: "localhost")
    wsPort: 8546 // WS-RPC server listening port (default: 8546)   
  },

  // default environment, merges with the settings in default
  // assumed to be the intended environment by `embark run` and `embark blockchain`
  development: {
    clientConfig: {
      miningMode: 'dev' // Mode in which the node mines. Options: dev, auto, always, off
    }
  },

  // used with "embark run privatenet" and/or "embark blockchain privatenet"
  privatenet: {
    // Accounts to use as node accounts
    // The order here corresponds to the order of `web3.eth.getAccounts`, so the first one is the `defaultAccount`
    // For more account configurations, see: https://framework.embarklabs.io/docs/blockchain_accounts_configuration.html
    accounts: [
      {
        nodeAccounts: true, // Accounts use for the node
        numAddresses: "1", // Number of addresses/accounts (defaults to 1)
        password: "config/development/password" // Password file for the accounts
      }
    ],
    clientConfig: {
      datadir: ".embark/privatenet/datadir", // Data directory for the databases and keystore
      miningMode: 'auto',
      genesisBlock: "config/privatenet/genesis.json" // Genesis block to initiate on first creation of a development node
    }
  },

  privateparitynet: {
    client: "parity",
    genesisBlock: "config/privatenet/genesis-parity.json",
    datadir: ".embark/privatenet/datadir",
    miningMode: 'off'
  },

  externalnode: {
    endpoint: "URL_OF_THE_NODE", // Endpoint of an node to connect to. Can be on localhost or on the internet
    accounts: [
      {
        mnemonic: "YOUR_MNEMONIC",
        hdpath: "m/44'/60'/0'/0/",
        numAddresses: "1"
      }
    ]
  },

  // used with "embark run testnet" and/or "embark blockchain testnet"
  testnet: {
    endpoint: 'https://ropsten.infura.io/v3/'+ secrets.infuraApiKey,
    accounts: [
      {
        "mnemonic": secrets.mnemonic
      }
    ]
  },

  mainnet: {
    endpoint: 'https://mainnet.infura.io/v3/'+ secrets.infuraApiKey,
    accounts: [
      {
        "mnemonic": secrets.mnemonic
      }
    ]
  },

  // merges with the settings in default
  // used with "embark run livenet" and/or "embark blockchain livenet"
  livenet: {
    networkType: "livenet",
    syncMode: "light",
    accounts: [
      {
        nodeAccounts: true,
        password: "config/livenet/password"
      }
    ]
  }

  // you can name an environment with specific settings and then specify with
  // "embark run custom_name" or "embark blockchain custom_name"
  //custom_name: {
  //}
};
