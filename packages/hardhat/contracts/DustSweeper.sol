// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title DustSweeper
 * @dev This contract handles the logic to swap user "dust" (small token balances) into ETH.
 *      It uses permit() for EIP-2612-compatible tokens and falls back to approve() otherwise.
 *      A portion (e.g., 10%) of the swapped ETH is sent to a treasury, while the remainder
 *      is returned to the user.
 */
contract DustSweeper {
    // ============ State Variables ============

    // Address of the Treasury contract
    address public treasury;

    // Percentage fee (in basis points) sent to the Treasury
    uint256 public treasuryFeeBps;

    // ============ Events ============

    /**
     * @dev Emitted when dust is swept for a specific user.
     * @param user The address of the user who invoked the sweep.
     * @param tokens The list of tokens swept.
     * @param totalEthOut The total ETH output from all token swaps.
     * @param treasuryFeeTaken The amount of ETH taken as a fee for the treasury.
     */
    event DustSwept(
        address indexed user,
        address[] tokens,
        uint256 totalEthOut,
        uint256 treasuryFeeTaken
    );

    // ============ Constructor ============

    /**
     * @notice Initializes the DustSweeper contract with the specified treasury and fee rate.
     * @param _treasury The address of the Treasury contract.
     * @param _treasuryFeeBps The fee in basis points (e.g., 1000 = 10%).
     */
    constructor(address _treasury, uint256 _treasuryFeeBps) {
        require(_treasury != address(0), "Treasury cannot be zero address");
        require(_treasuryFeeBps <= 10000, "Fee too high");
        
        treasury = _treasury;
        treasuryFeeBps = _treasuryFeeBps;
    }

    // ============ External Functions ============

    /**
     * @notice Sweeps all selected tokens from the caller's balance into ETH,
     *         distributing a portion of the proceeds to the Treasury.
     *
     * @dev 
     *  - For each token:
     *      1. If the token supports permit(), call permit() to set allowance.
     *      2. If not, rely on user having approved this contract or perform an approve() transaction.
     *      3. Execute swap using provided DEX routing data.
     *  - Sum up total ETH, send a portion to the Treasury, and return the rest to the user.
     *
     * @param tokens List of ERC-20 token addresses to swap.
     * @param swapData Encoded data for routing on the DEX (off-chain aggregator).
     * @param minEthOut The minimum total ETH the user must receive across all swaps.
     */
    function sweepDust(
        address[] calldata tokens,
        bytes calldata swapData,
        uint256 minEthOut
    ) external {
        // TODO: Implement logic for token approval, swapping, fee collection, etc.
        // Emit DustSwept event at the end.
    }

    /**
     * @notice Checks if a token supports EIP-2612 permit by probing token's DOMAIN_SEPARATOR.
     * @param token The address of the token to check.
     * @return bool True if the token supports permit, false otherwise.
     */
    function supportsPermit(address token) public view returns (bool) {
        // TODO: Implement try/catch logic
        return false; // Stub
    }

    /**
     * @notice Calculates the treasury fee in ETH for a given amount.
     * @param amount The total ETH to be distributed.
     * @return feeAmount The portion of ETH owed to the treasury.
     */
    function calculateFee(uint256 amount) public view returns (uint256 feeAmount) {
        // feeAmount = (amount * treasuryFeeBps) / 10000;
        return 0; // Stub
    }
}
