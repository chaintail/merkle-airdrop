// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title Logger
 * @dev A dedicated contract (or library) for logging events related to the Dust Sweeper DApp.
 *      This example logs token approvals, swaps, and error messages. 
 */
contract Logger {
    // ============ Events ============

    event TokenApproval(address indexed user, address indexed token, uint256 amount);
    event TokenSwap(address indexed user, address indexed token, uint256 amountIn, uint256 ethOut);
    event LogError(string message);

    // ============ External Functions ============

    /**
     * @notice Logs an approval for a token.
     * @param user Address that gave the approval.
     * @param token Address of the token approved.
     * @param amount Amount approved.
     */
    function logTokenApproval(address user, address token, uint256 amount) external {
        emit TokenApproval(user, token, amount);
    }

    /**
     * @notice Logs a token swap event.
     * @param user The address initiating the swap.
     * @param token The token swapped.
     * @param amountIn Amount of tokens swapped.
     * @param ethOut Amount of ETH received from the swap.
     */
    function logSwap(address user, address token, uint256 amountIn, uint256 ethOut) external {
        emit TokenSwap(user, token, amountIn, ethOut);
    }

    /**
     * @notice Logs an error message for debugging or informational purposes.
     * @param message The error string to be logged.
     */
    function logError(string calldata message) external {
        emit LogError(message);
    }
}
