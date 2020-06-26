pragma solidity ^0.4.24;

import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract MyNFT is ERC721Token {
    constructor (string _name, string _symbol) public
        ERC721Token(_name, _symbol) {}

    function registerUniqueToken(
        address _repoCA,
        address _to,
        uint256 _tokenId,
        string  _tokenURI
    ) public
    {
        super._mint(_to, _tokenId);
        super._setTokenURI(_tokenId, _tokenURI);
        super.transferFrom(_to, _repoCA, _tokenId);

        emit TokenRegistered(_to, _tokenId);
    }

   event TokenRegistered(address _by, uint256 _tokenId);
}
