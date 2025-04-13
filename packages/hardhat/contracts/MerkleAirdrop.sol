// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {MerkleProof} from "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract MerkleAirdrop is Ownable {
    IERC20 public token;
    address public treasury;
    bytes32 public merkleRoot;
    uint256 public claimStart;
    uint256 public claimEnd;

    // Tracks if an address has claimed their tokens.
    mapping(address => bool) public claimed;

    event Claimed(address indexed claimant, uint256 amount);
    event RecoveredToken(address tokenAddress, uint256 amount);
    event RecoveredEther(uint256 amount);

    /**
     * @dev Constructor sets up the token, treasury, merkle root, and claim window.
     * @param _token Address of the ERC20 token.
     * @param _treasury Address holding the tokens and that has approved spending.
     * @param _merkleRoot The Merkle root representing the full airdrop data.
     * @param _claimStart Timestamp when claims can begin.
     * @param _claimEnd Timestamp when claims end.
     */
    constructor(
        IERC20 _token,
        address _treasury,
        bytes32 _merkleRoot,
        uint256 _claimStart,
        uint256 _claimEnd
    ) Ownable(msg.sender) {
        require(_claimStart < _claimEnd, "Invalid claim window");
        token = _token;
        treasury = _treasury;
        merkleRoot = _merkleRoot;
        claimStart = _claimStart;
        claimEnd = _claimEnd;
    }

    /**
     * @dev Allows eligible users to claim their tokens.
     * @param amount The claimable token amount.
     * @param proof The Merkle proof validating the claim.
     */
    function claim(uint256 amount, bytes32[] calldata proof) external {
        require(block.timestamp >= claimStart, "Claim period not started");
        require(block.timestamp <= claimEnd, "Claim period ended");
        require(!claimed[msg.sender], "Already claimed");

        // Recreate the leaf from the sender's address and amount.
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, amount));
        require(MerkleProof.verify(proof, merkleRoot, leaf), "Invalid Merkle proof");

        // Mark as claimed
        claimed[msg.sender] = true;

        // Transfer tokens from the treasury wallet to the claimant.
        bool success = token.transferFrom(treasury, msg.sender, amount);
        require(success, "Token transfer failed");

        emit Claimed(msg.sender, amount);
    }

    /**
     * @dev Recover any ERC20 tokens accidentally sent to the contract.
     * @param _tokenAddress The address of the ERC20 token to recover.
     */
    function recoverERC20(address _tokenAddress) external onlyOwner {
        IERC20 tokenToRecover = IERC20(_tokenAddress);
        uint256 balance = tokenToRecover.balanceOf(address(this));
        require(balance > 0, "No tokens to recover");
        require(tokenToRecover.transfer(owner(), balance), "Token transfer failed");
        emit RecoveredToken(_tokenAddress, balance);
    }

    /**
     * @dev Recover any Ether accidentally sent to the contract.
     */
    function recoverEther() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ether to recover");
        payable(owner()).transfer(balance);
        emit RecoveredEther(balance);
    }

    // Allow the contract to receive Ether.
    receive() external payable {}
}
