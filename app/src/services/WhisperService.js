import Web3 from 'web3'
import {decodeFromHex, encodeToHex} from '../util/hexutils'

const DEFAULT_CHANNEL = "default";
const DEFAULT_TOPIC = "0x11223344";
const PRIVATE_MESSAGE_REGEX = /^\/msg (0x[A-Za-z0-9]{130}) (.*)$/;

const POW_TIME = 100;
const TTL = 20;
const POW_TARGET = 2;

let keyPair, pubKey, channelSymKey = null
let channelTopic = DEFAULT_TOPIC

const PROVIDER_PRIVNET_URI = `ws://${process.env.VUE_APP_WHISPER_HOST}:8546`
const PROVIDER_PRIVNET_HTTP_URI = `http://${process.env.VUE_APP_WHISPER_HOST}:8545`
const PROVIDER_TESTNET_URI = `wss://ropsten.infura.io/ws/v3/${process.env.VUE_APP_INFURA_KEY}`


const web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_PRIVNET_HTTP_URI));
const shh = web3.shh;

export async function init() {
  // try {
  //   // web3.setProvider(new Web3.providers.WebsocketProvider(PROVIDER_PRIVNET_URI, {headers: {Origin: "mychat"}}));
  //   web3.setProvider(new Web3.providers.HttpProvider(PROVIDER_PRIVNET_HTTP_URI));
  //   // await web3.eth.net.isListening();
  // } catch(e) {
  //   console.error(e)
  // }

  // TODO: Generate keypair
  keyPair = await shh.newKeyPair();
  console.log('kp',keyPair)

  // TODO: Obtain public key
  pubKey = await shh.getPublicKey(keyPair);

  // TODO: Generate a symmetric key
  channelSymKey = await shh.generateSymKeyFromPassword(DEFAULT_CHANNEL);  
}

export async function sendPublicMsg(msg) {
  msg = JSON.stringify(msg)

  // TODO: Send a public message
  shh.post({
    symKeyID: channelSymKey,
    sig: keyPair,
    ttl: TTL,
    topic: channelTopic,
    payload: encodeToHex(msg),
    powTime: POW_TIME,
    powTarget: POW_TARGET
  })
}

export async function subscribePublicMsg(callback) {
  // TODO: Subscribe to public chat messages
  return shh.subscribe("messages", {
    minPow: POW_TARGET,
    symKeyID: channelSymKey,
    topics: [channelTopic]
  }).on('data', callback).on('error', (err) => {
    console.error(err)
    // ui.addError("Couldn't decode message: " + err.message);
  });
}

