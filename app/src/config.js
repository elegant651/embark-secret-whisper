const MyNFT = require('../../dist/contracts/MyNFT.json')
const Auctions = require('../../dist/contracts/Auctions.json')

export default {
	MYNFT_CA: MyNFT.deployedAddress,
	AUCTIONS_CA: Auctions.deployedAddress,

	MYNFT_ABI: MyNFT.abiDefinition,
	AUCTIONS_ABI: Auctions.abiDefinition,

	GAS_AMOUNT: 5000000
}
