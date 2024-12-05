CreateAuctionM = {
    init: () => {
        console.log("CreateAuctionM init")
        return CreateAuctionM.bindEvents()
    },

    bindEvents: () => {
        // $("#createAuctionModal").on("click", "#submitAuction", CreateAuctionM.create(event))
        $(document).on("click", "#submitAuction", function (event) {
            console.log("hhhh")
            CreateAuctionM.create(event)
        })
    },

    create: (event) => {
        event.stopImmediatePropagation()
        event.preventDefault()
        console.log(`create event target: ${event.target}`)

        // get values
        let tokenToSell = parseInt(event.target.getAttribute("data-token-id"))
        console.log(`tokenToSell: ${tokenToSell}`)
        // in ether
        let startingPrice = $("#startingPrice").val()
        console.log(`startingPrice: ${startingPrice}`)
        let endingPrice = $("#endingPrice").val() // in ether
        let duration = $("#duration").val() // in hours
        // convert to wei
        startingPrice = web3.toWei(startingPrice, "ether")
        endingPrice = web3.toWei(endingPrice, "ether")
        // convert from hours to seconds
        duration = duration * 60 * 60

        if (startingPrice < endingPrice) {
            alert("Error: Starting price must be greater than ending price")
            throw "Error: Starting price must be greater than ending price"
        }

        web3.eth.getAccounts((error, accounts) => {
            if (error) {
                throw error
            }

            const account = accounts[0]
            let approved = false

            App.contracts.NFTDutchAuction.deployed()
                .then((instance) => {
                    console.log(`instance: ${instance}`)
                    return instance
                })
                .then((NFTDutchAuction_instance) => {
                    return App.contracts.NumbersNFT.deployed()
                        .then((instance) => {
                            // allow transfer of NFT by NFTDutchAuction contract
                            // TODO: before calling .approve(), check if 'tokenToSell' has not been approved already
                            console.log(`tokenToSell: ${tokenToSell}`)
                            return instance.approve(
                                NFTDutchAuction_instance.address,
                                tokenToSell,
                                { from: account }
                            )
                        })
                        .then((result) => {
                            // mark first step as completed
                            $("#progress ol li:first-child > .step-completed").show()
                            $("#progress ol li:first-child").addClass("step-completed")
                            $("#submitAuction").text("Start auction")
                            approved = true
                        })
                        .catch((err) => {
                            console.error(err.message)
                        })
                })
                .then(() => {
                    // TODO: there has to be a prettier way to do this
                    if (approved) {
                        // create auction
                        App.contracts.NFTDutchAuction.deployed()
                            .then((instance) => {
                                console.log("-> idTokenToSell: " + tokenToSell)
                                console.log("-> startingPrice: " + startingPrice + " wei")
                                console.log("-> endingPrice: " + endingPrice + " wei")
                                console.log("-> duration: " + duration + " seconds")

                                tokenToSell = parseInt(tokenToSell)
                                startingPrice = parseInt(startingPrice)
                                endingPrice = parseInt(endingPrice)
                                duration = parseInt(duration)
                                console.log("calling NFTDutchAuction.createAuction()")
                                return instance.createAuction(
                                    tokenToSell,
                                    startingPrice,
                                    endingPrice,
                                    duration,
                                    { from: account }
                                )
                            })
                            .then((result) => {
                                // mark second step as completed
                                $("#progress ol li:last-child > .step-completed").show()
                                $("#progress ol li:last-child").addClass("step-completed")
                                console.log(`mark sold : ${tokenToSell}`)
                                soldTokenArray = JSON.parse(localStorage.getItem("soldNFTs"))
                                console.log(`old array: ${soldTokenArray}`)
                                soldTokenArray.push(tokenToSell)
                                console.log(`new array : ${soldTokenArray}`)
                                localStorage.setItem("soldNFTs", JSON.stringify(soldTokenArray))
                                // Inventory.soldTokens.push(tokenToSell)

                                // window.location.reload()
                                return $("#createAuctionModal").modal("hide")
                            })
                            .catch((error) => {
                                console.error(error.message)
                            })
                    }
                })
                .catch((error) => {
                    console.error(error.message)
                })
        })
    },
}

$(() => {
    $(window).load(() => {
        CreateAuctionM.init()
    })
})
