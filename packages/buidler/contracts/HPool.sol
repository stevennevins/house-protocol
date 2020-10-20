pragma solidity >=0.6.0 <0.7.0;

import "@nomiclabs/buidler/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract HPool is IERC20, ERC20{
        using SafeMath for uint;
        //Address for dealer factory
        address public dealers;
        //Address for factory to call initialize
        address public factory;
        //Tokens - token0 collateral, token1 bearer
        address public token0;
        address public token1;
        //Authorized games will want to pull from dealer factory
        mapping(address => bool) private AuthorizedGames;
        
        constructor() public {
                factory = msg.sender;
        }
        modifier onlyAuthorizedGame {
                _; 
        }
        function setOwner(address payable _owner) external onlyOwner {
                owner = _owner;  
        }
        // ERC-20 Related functions
        function initialize(address token0, address token1) external {
                require(msg.sender == factory, "Not Factory");
                token0 = _token0;
                token1 = _token1;
        }

        function priceVariables() external view returns (uint ETH, kETH) {
                return (address(this).balance, totalSupply()); 
        }
        function buyTokens() external payable {
                require(msg.value > 0, "No ether sent");
                if (totalSupply() == 0){
                        _mint(msg.sender, msg.value); 
                } else {
                        _mint(msg.sender, msg.value.mul(totalSupply()).div(address(this).balance.sub(msg.value)));
                } 
        }
        function sellTokens(uint amount) external {
                require(balanceOf(msg.sender) >= amount, "Insufficient balance");

                uint liquidityWithdrawable = amount.mul(address(this).balance).div(totalSupply());
                _burn(msg.sender, amount);

                msg.sender.transfer(liquidityWithdrawable); 
        }
        //Game related functions

        receive() external payable {}

        function payout(address payable winner, uint amount) external onlyAuthorizedGame {
                require(address(this).balance >= amount, "Insufficient balance");
                winner.transfer(amount); 
        }

}
