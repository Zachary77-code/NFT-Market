// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// import "@0xcert/ethereum-utils/contracts/ownership/Ownable.sol";
import "./Ownable.sol";

// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev Truffle migrations manager.
 */
contract Migrations is Ownable {
    uint256 public lastCompletedMigration;

    // address private owner;

    /**
     * @dev Contract constructor.
     */
    constructor() public {
        owner = msg.sender;
    }

    /**
     * @dev Sets migration state.
     * @param _completed Last completed migration number.
     */
    function setCompleted(uint256 _completed) public onlyOwner {
        lastCompletedMigration = _completed;
    }

    /**
     * @dev Permorms migration.
     * @param _addr New migration address.
     */
    function upgrade(address _addr) public onlyOwner {
        Migrations upgraded = Migrations(_addr);
        upgraded.setCompleted(lastCompletedMigration);
    }
}
