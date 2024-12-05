const HDWalletProvider = require("@truffle/hdwallet-provider")

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // for more about customizing your Truffle configuration!
    networks: {
        ganache: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "5777",
            from: "0x4A05Cf33f88cc77A8DD8c99FFac753d3ab2bbc4a", // account address from which to deploy
            gas: 6721975,
        },
        sepolia: {
            provider: () =>
                new HDWalletProvider(
                    "1784187720dfb0857d02061849340959e1195e7592e8f3d8e2d2b73742bf65cd",
                    `https://eth-sepolia.g.alchemy.com/v2/d4V4H50ffcXv4k2Uivp3NxuzP5YRxYH9`
                ),
            network_id: 11155111, // Sepolia's network id
            from: "0x8a3828Cd8F1331f27a3E604CBea7B87De9DD04Bf",
        },
    },
    compilers: {
        solc: {
            version: "0.8.13",
        },
    },
}
