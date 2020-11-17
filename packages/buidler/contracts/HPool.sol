pragma solidity >=0.6.0 <0.7.0;

import "./base/HToken.sol";
import "./base/HMath.sol";
import "./base/IERC20.sol";
import {IHPoolFactory} from "./base/IHPoolFactory.sol";
import {IHDealerFactory} from "./base/IHDealerFactory.sol";

contract HPool is HToken, HMath{
        address public _underlying;
        bool private _mutex;
        IHPoolFactory public IPoolF;
        IHDealerFactory public IDealF;
 
        bool public win;
        struct game {
                address player;
                uint bet;
                uint b;
                uint edge;
                address dealer;
                }

        mapping(bytes32 => game) public games;

        constructor(address token, address dealerFactory, string memory symbol, string memory name, uint8 decimals) public{
                IPoolF = IHPoolFactory(msg.sender);
                IDealF = IHDealerFactory(dealerFactory);
                _underlying = token;
                _symbol = symbol;
                _name = name;
                _decimals = decimals;
        }

        modifier _lock_() {
                require(!_mutex, "ERR_REENTRY");
                _mutex = true;
                _;
                _mutex = false;
        }

        function initialize(uint amt) external {
                require(totalSupply()==0);
                _pullUnderlying(_underlying, msg.sender, amt);
                _mintPoolShare(amt);
                _pushPoolShare(msg.sender, amt);
        }

        function joinPool(uint tokenIn) external {
                uint hTokenSupply = totalSupply();
                uint tokenBalance = IERC20(_underlying).balanceOf(address(this));
                uint hToken = tokenSwap(tokenIn, tokenBalance, hTokenSupply);
                _pullUnderlying(_underlying, msg.sender, tokenIn);
                _mintPoolShare(hToken);
                _pushPoolShare(msg.sender, hToken);
        }
        
        function exitPool(uint hTokenIn) external {
                uint hTokenSupply = totalSupply();
                uint tokenBalance = IERC20(_underlying).balanceOf(address(this));
                uint token = hTokenSwap(hTokenIn, tokenBalance, hTokenSupply);
                _pullPoolShare(msg.sender, hTokenIn);
                _pushUnderlying(_underlying, msg.sender, token);
                _burnPoolShare(hTokenIn);

        }
        //==
        // 'Underlying' token manipulation functions make external calls but are not locked
        // must "_lock_" or otherwise ensure reentry-safety
        // This is from balancer this project wouldn't have been possible without their example

        function _mintPoolShare(uint amount) internal {
                _mint(amount);
        }

        function _burnPoolShare(uint amount) internal {
                _burn(amount);
        }

        function _pushPoolShare(address to, uint amount) internal {
                _push(to, amount);
        }

        function _pullPoolShare(address from, uint amount) internal {
                _pull(from, amount);
        }

        function _pushUnderlying(address erc20, address to, uint amount) internal {
                bool xfer = IERC20(erc20).transfer(to, amount);
                require(xfer, "ERR_ERC20_FALSE");
        }

        function _pullUnderlying(address erc20, address from, uint amount) internal {
                bool xfer = IERC20(erc20).transferFrom(from, address(this), amount);
                require(xfer, "ERR_ERC20_FALSE");
        }

        // Dealer functions
        function commit(address player, uint bet, uint b, uint edge, bytes32 requestId) external{
                require(IDealF.isDealer(msg.sender));
                //if statement checking maxbet and setting bet to it if bet > maxbet
                _pullUnderlying(_underlying, player, bet);
                games[requestId] = game(player, bet, b, edge, msg.sender);
        }
        
        function payout(bytes32 requestId) external {
//                require(msg.sender==VRF_Coordinator);
                //uint result = result(1, choices, randomness);
                //uint p = pWin(choices);
                //uint b = payOdds(p);
                //uint maxbet = maxBet(IERC20(_underlying).balanceOf(address(this)), edge, b, 1);
                //check maxbet vs bet, set bet to max bet and return excess
                win = true;

                //if result = choice payout 
                //if (choice == result) {
                //        uint payout = payout(b, bet, edge);
                //        win=true;
                //}
        }

        function clear(bytes32 requestId) external {
                delete games[requestId];
        }

}
