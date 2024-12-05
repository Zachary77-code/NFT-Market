## Getting up and running

```bash
# install dependencies, please add '-force' if some conflicts exist 
$ npm install 

# deploy contracts
# (make sure to first fire up ganache and to change the 'from' account in 'truffle.js').
# Or you can set the network to sepolia with your own account
$ truffle migrate --reset --network ganache

# start app
$ npm run dev
```

(The app is configured to check for a private [Ganache](https://truffleframework.com/ganache) network)

## Used packages

- [Truffle](https://truffleframework.com/truffle)
- [web3.js](https://github.com/ethereum/web3.js/)
- [Chart.js](https://github.com/chartjs/Chart.js)
- [Annotation plugin for Chart.js](https://github.com/chartjs/chartjs-plugin-annotation)
- [Fitty, Snugly text resizing](https://github.com/rikschennink/fitty)

## Used contracts

- [0xcert/ethereum-utils](https://github.com/0xcert/ethereum-utils)
- [0xcert/ethereum-erc721](https://github.com/0xcert/ethereum-erc721)

## Useful links

- [EIP-721](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md)
- [Developing for Ethereum: Getting Started with Ganache](https://www.codementor.io/swader/developing-for-ethereum-getting-started-with-ganache-l6abwh62j)
- [maksimivanov gradient-coin-tutorial-part-2](https://maksimivanov.com/posts/gradient-coin-tutorial-part-2/)
- [Dutch auction](https://en.wikipedia.org/wiki/Dutch_auction)

## Tools

- [MetaMask](https://metamask.io/)
- [Ganache](https://truffleframework.com/ganache)

## Known errors

**Minting does not work**

- Solution:
  Minting is currently only allowed by the owner of the NFT contract.
  Check that the address from which the contracts were deployed matches the
  address from which one calls `mint()`

**Attempting to run transaction which calls a contract function, but recipient address 0x... is not a contract address**

- Solution:
  Delete `.json` files in `build/contracts/` and redeploy contracts

**Nonce of account is not correct**

- Solution:
  Go to MetaMask -> Settings -> scroll to the bottom -> select `Reset Account`

**`bid()` reverts/out of gas**

- Solution:
  Use more gas ;-)

##
Contact me : Wechat: 735187569
             Email: gzhangbd@connect.ust.hk

