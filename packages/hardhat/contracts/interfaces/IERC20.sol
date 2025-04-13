// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title ERC20 Token Standard Interface
/// @dev See https://eips.ethereum.org/EIPS/eip-20
interface IERC20 {
    /// @notice Returns the total number of tokens in existence
    /// @return The total supply of the token
    function totalSupply() external view returns (uint256);

    /// @notice Returns the token balance of a specific account
    /// @param account The address to query
    /// @return The amount of tokens owned by `account`
    function balanceOf(address account) external view returns (uint256);

    /// @notice Transfers `amount` tokens from the caller to `to`
    /// @param to The address receiving the tokens
    /// @param amount The number of tokens to transfer
    /// @return True if the transfer succeeded
    function transfer(address to, uint256 amount) external returns (bool);

    /// @notice Returns the remaining tokens `spender` is allowed to spend on behalf of `owner`
    /// @param owner The address that owns the tokens
    /// @param spender The address approved to spend the tokens
    /// @return The remaining amount `spender` can spend
    function allowance(address owner, address spender) external view returns (uint256);

    /// @notice Approves `spender` to spend up to `amount` tokens on behalf of the caller
    /// @param spender The address authorized to spend
    /// @param amount The max amount `spender` can spend
    /// @return True if the approval succeeded
    function approve(address spender, uint256 amount) external returns (bool);

    /// @notice Transfers `amount` tokens from `from` to `to` using allowance mechanism
    /// @dev `amount` is deducted from caller’s allowance
    /// @param from The address to take tokens from
    /// @param to The address to send tokens to
    /// @param amount The number of tokens to transfer
    /// @return True if the transfer succeeded
    function transferFrom(address from, address to, uint256 amount) external returns (bool);

    /// @notice Emitted when `value` tokens are moved from one account (`from`) to another (`to`)
    /// @param from The address sending the tokens
    /// @param to The address receiving the tokens
    /// @param value The amount of tokens transferred
    event Transfer(address indexed from, address indexed to, uint256 value);

    /// @notice Emitted when the allowance of a `spender` for an `owner` is set by `approve`
    /// @param owner The address that approved tokens
    /// @param spender The address allowed to spend
    /// @param value The new allowance
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
