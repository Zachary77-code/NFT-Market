var NumbersNFT = artifacts.require("./NumbersNFT")
var NFTDutchAuction = artifacts.require("./NFTDutchAuction")

module.exports = function (deployer) {
    // first deploy NumbersNFT
    // deployer.deploy(NumbersNFT, "NumbersNFT", "NFT")
    deployer.deploy(NumbersNFT, "NumbersNFT", "NFT").then(function () {
        // then deploy NFTDutchAuction
        return deployer.deploy(NFTDutchAuction, NumbersNFT.address)
    })
}
