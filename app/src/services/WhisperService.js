import Web3 from 'web3'

const DEFAULT_CHANNEL = "default";
const DEFAULT_TOPIC = "0x11223344";
const PRIVATE_MESSAGE_REGEX = /^\/msg (0x[A-Za-z0-9]{130}) (.*)$/;

const POW_TIME = 100;
const TTL = 20;
const POW_TARGET = 2;

const web3 = new Web3();

let keyPair, pubKey, channelSymKey = null
let channelTopic = DEFAULT_TOPIC

export async function init() {
  try {
    web3.setProvider(new Web3.providers.WebsocketProvider("ws://127.0.0.1:8546", {headers: {Origin: "mychat"}}));
    await web3.eth.net.isListening();
  } catch(e) {
    console.error(e)
  }

  // TODO: Generate keypair
  keyPair = await web3.shh.newKeyPair();

  // TODO: Obtain public key
  pubKey = await web3.shh.getPublicKey(keyPair);

  // TODO: Generate a symmetric key
  channelSymKey = await web3.shh.generateSymKeyFromPassword(DEFAULT_CHANNEL);  
}

export async function sendPublicMsg(msg) {
  msg = JSON.stringify(msg)

  // TODO: Send a public message
  web3.shh.post({
    symKeyID: channelSymKey,
    sig: keyPair,
    ttl: TTL,
    topic: channelTopic,
    payload: web3.utils.fromAscii(msg),
    powTime: POW_TIME,
    powTarget: POW_TARGET
  })
}

export async function subscribePublicMsg(callback) {
  // TODO: Subscribe to public chat messages
  return web3.shh.subscribe("messages", {
    minPow: POW_TARGET,
    symKeyID: channelSymKey,
    topics: [channelTopic]
  }).on('data', callback).on('error', (err) => {
    console.error(err)
    // ui.addError("Couldn't decode message: " + err.message);
  });
}

