// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title Treasury
 * @dev Holds ETH fees collected by the DustSweeper contract. 
 *      Only the owner or authorized roles can withdraw the stored ETH.
 */
contract Treasury {
    // ============ State Variables ============

    // Owner address with permission to withdraw
    address public owner;

    // ============ Events ============

    /**
     * @dev Emitted when ETH is deposited into the Treasury.
     * @param from Address that sent ETH.
     * @param amount The amount of ETH deposited.
     */
    event Deposit(address indexed from, uint256 amount);

    /**
     * @dev Emitted when ETH is withdrawn from the Treasury.
     * @param to Address receiving the ETH.
     * @param amount The amount of ETH withdrawn.
     */
    event Withdrawal(address indexed to, uint256 amount);

    // ============ Constructor ============

    /**
     * @notice Initializes the Treasury contract with the specified owner.
     * @param _owner The address authorized to withdraw ETH.
     */
    constructor(address _owner) {
        require(_owner != address(0), "Invalid owner address");
        owner = _owner;
    }

    // ============ Modifiers ============

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    // ============ Fallback / Receive ============

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    // ============ External Functions ============

    /**
     * @notice Withdraws a specified amount of ETH to a chosen address.
     * @param to The address receiving the withdrawn ETH.
     * @param amount The amount of ETH to withdraw.
     */
    function withdraw(address to, uint256 amount) external onlyOwner {
        require(to != address(0), "Cannot withdraw to zero address");
        require(amount <= address(this).balance, "Insufficient balance in treasury");

        (bool success, ) = payable(to).call{value: amount}("");
        require(success, "ETH transfer failed");

        emit Withdrawal(to, amount);
    }

    /**
     * @notice Updates the owner to a new address.
     * @param newOwner The address of the new owner.
     */
    function setOwner(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}
