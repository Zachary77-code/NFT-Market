Inventory = {
    // soldTokens: [],

    init: async () => {
        console.log("Inventory init")
        const accounts = await ethereum.request({ method: "eth_accounts" })
        console.log(accounts)
        Inventory.appendTokens(accounts[0])
    },

    // markAsSold: (number, event) => {
    //     event.preventDefault()
    //     event.stopImmediatePropagation()
    //     $(document).ready(function () {
    //         console.log(`markAs sold number: ${number}`)
    //         const selector = document.querySelectorAll(`.panel-number`)
    //         // document.
    //         // selector[]
    //         // $(`.panel-number[data-token-id=${number}]`)
    //         console.log(`selector: ${selector.length}`)
    //         var parentDiv = document.getElementById("accNumberTemplate")
    //         console.log(`parentDiv: ${parentDiv}`)
    //         // 使用querySelectorAll获取所有子级div元素
    //         var childDivs = parentDiv.querySelectorAll(".panel-number button")
    //         console.log(`childDivs: ${childDivs}`)
    //         // 遍历所有子级div元素，并打印它们的data-id属性值
    //         childDivs.forEach(function (childDiv) {
    //             if (childDiv.getAttribute("data-token-id") == number) {
    //                 console.log(`childDiv: ${childDiv}`)
    //                 console.log(`value:${childDiv.getAttribute("data-token-id")}`)
    //                 console.log(`BEFORE childDiv.innerHTML: ${childDiv.innerHTML}`)
    //                 childDiv.style.display = "none"
    //                 childDiv.offsetWidth // 触发重绘
    //                 childDiv.style.display = ""
    //                 childDiv.innerHTML = "SBBBBBBB"
    //                 childDiv.ariaDisabled = true
    //                 console.log(`AFTER childDiv.innerHTML: ${childDiv.innerHTML}`)

    //                 // childDiv.disabled = true
    //                 // 获取该div中的button元素
    //                 // var button = childDiv.querySelector("button")
    //                 // console.log(`button:${button}`)
    //                 // // 如果找到了button元素，将其设置为不可用
    //                 // if (button) {
    //                 //     button.disabled = true
    //                 // }
    //             }
    //         })
    //     })
    // },

    appendTokens: (account) => {
        // get account and load tokens
        App.contracts.NumbersNFT.deployed()
            .then((instance) => {
                console.log(`instance.balanceOf: ${instance.balanceOf(account)}`)
                // get the balance (number of NFT's) of the user
                return instance.balanceOf(account)
            })
            .then((o) => {
                console.log(`o.toNumber() :${o.toNumber()}`)
                return o.toNumber()
            })
            .then((balance) => {
                // get the i'th NFT of the user
                // starting at 0 -> "_index A counter less than `balanceOf(_owner)`"
                let i = 0
                const accNumberRow = $("#accNumberRow")

                let getOwnedNFT = (i) => {
                    var accNumberTemplate = $("#accNumberTemplate")
                    var accSoldNumberTemplate = $("#accNumberTemplate")
                    console.log(`calling getOwnedNFT() with i = ${i}`)
                    App.contracts.NumbersNFT.deployed()
                        .then((instance) => {
                            // get all NFT's of the user
                            return instance.tokenOfOwnerByIndex(account, i)
                        })
                        .then((o) => {
                            const number = o.toNumber()
                            // add thousands seperators
                            let formattedNumber = number
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                            // append number to dom

                            let soldNFTs = JSON.parse(localStorage.getItem("soldNFTs"))
                            console.log(`soldNFTs: ${soldNFTs}`)
                            var flag = 0
                            for (let i = 0; i < soldNFTs.length; i++) {
                                if (soldNFTs[i] === number) {
                                    accSoldNumberTemplate
                                        .find(".panel-body .number")
                                        .text(formattedNumber)
                                    accSoldNumberTemplate
                                        .find(".panel-number .number")
                                        .attr("data-token-id", number)
                                    accSoldNumberTemplate
                                        .find(".panel-number button")
                                        .attr("data-token-id", number)

                                    console.log(`found number ${number}`)
                                    console.log(`soldNFT: ${soldNFTs[i]} found number ${number}`)
                                    // accSoldNumberTemplate
                                    //     .find(`.panel-number .text-center`)
                                    //     // .filter(`[data-token-id="${soldNFTs[i]}"]`)
                                    //     // .parent()
                                    //     .text("Sold" + soldNFTs[i])
                                    //     .hide()
                                    //     // .attr("disabled", true)
                                    accNumberRow.append(accSoldNumberTemplate.html())
                                    break
                                    // accNumberRow.append(accNumberTemplate.html())
                                } else {
                                    flag++
                                }
                            }
                            if (flag === soldNFTs.length) {
                                accNumberTemplate.find(".panel-body .number").text(formattedNumber)
                                accNumberTemplate
                                    .find(".panel-number .number")
                                    .attr("data-token-id", number)
                                accNumberTemplate
                                    .find(".panel-number button")
                                    .attr("data-token-id", number)
                                accNumberRow.append(accNumberTemplate.html())
                            }
                            // soldNFTs.forEach((soldNFT) => {
                            //     if (soldNFT == number) {
                            //         console.log(`soldNFT: ${soldNFT} found number ${number}`)
                            //         accNumberTemplate
                            //             .find(".panel-number button")
                            //             .text("Sold")
                            //             .attr("disabled", true)

                            //         // accNumberRow.append(accNumberTemplate.html())
                            //     }
                            // })

                            i++
                            if (i < balance) {
                                console.log(`current i: ${i}`)
                                getOwnedNFT(i)
                            }
                        })
                        .then((o) => {
                            // fit textsize of large numbers
                            fitty("#accNumberRow .number", {
                                minSize: 20,
                                maxSize: 60,
                            })
                        })
                        .catch((err) => {
                            console.error(err.message)
                        })
                }
                getOwnedNFT(i)
            })
        // } else {
        //     console.log(`NOT DEPLOYED!!!!!!!!!!!!!!!!!!!`)
        //     console.log(`App.contracts.NumbersNFT.isDeployed: ${App.contracts}`)
        // }
        return Inventory.bindEvents()
        //return Inventory.appendAuctions(account)
    },

    bindEvents: () => {
        // add number to sell to modal
        $(document).on("click", "#accNumberRow .init-sell", function (e) {
            const formattedNumber = $(this).parent().parent().find(".number").text()
            const number = $(this).attr("data-token-id")
            console.log(`sold number : ${number}`)
            // add number to the modal
            $("#createAuctionModal .number").text(formattedNumber)
            $("#createAuctionModal .panel-body .number").attr("data-token-id", number)
            $("#submitAuction").attr("data-token-id", number)
            console.log(`add number to the modal`)
            // reset step progress on modal
            $("#progress ol li > .step-completed").hide()
            $("#progress ol li").removeClass("step-completed")
            $("#submitAuction").text("Allow transfer of NFT")
            console.log(`Allow transfer of NFT`)
            // https://getbootstrap.com/docs/4.1/components/modal/
            // when modal is ready
            $("#createAuctionModal").on("shown.bs.modal", (e) => {
                // fit textsize of large numbers in modal
                fitty("#createAuctionModal .number", {
                    minSize: 20,
                    maxSize: 60,
                })
            })
        })
    },
}

$(() => {
    $(window).load(() => {
        Inventory.init()
    })
})
