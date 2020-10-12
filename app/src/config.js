const MyNFT = require('../../dist/contracts/MyNFT.json')
const Auctions = require('../../dist/contracts/Auctions.json')
const TodoFeed = require('../../dist/contracts/TodoFeed.json')

export default {
	MYNFT_CA: MyNFT.deployedAddress,
	AUCTIONS_CA: Auctions.deployedAddress,
	FEED_CA: TodoFeed.deployedAddress,

	MYNFT_ABI: MyNFT.abiDefinition,
	AUCTIONS_ABI: Auctions.abiDefinition,
	FEED_ABI: TodoFeed.abiDefinition,

	GAS_AMOUNT: 5000000
}
