// // SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./tokens/NFTokenMetadata.sol";
import "./tokens/NFTokenEnumerable.sol";
import "./Ownable.sol";

contract NumbersNFT is NFTokenMetadata, NFTokenEnumerable, Ownable {
    constructor(string memory _name, string memory _symbol) {
        nftName = _name;
        nftSymbol = _symbol;
    }

    function _mint(address _owner, uint256 _id) public override(NFToken, NFTokenEnumerable) {
        super._mint(_owner, _id);
    }

    function _burn(
        address _owner,
        uint256 _tokenId
    ) public override(NFTokenEnumerable, NFTokenMetadata) onlyOwner {
        super._burn(_owner, _tokenId);
    }

    function addNFToken(
        address _to,
        uint256 _tokenId
    ) public override(NFToken, NFTokenEnumerable) {
        super.addNFToken(_to, _tokenId);
    }

    function removeNFToken(
        address _from,
        uint256 _tokenId
    ) public override(NFToken, NFTokenEnumerable) {
        super.removeNFToken(_from, _tokenId);
    }
}
