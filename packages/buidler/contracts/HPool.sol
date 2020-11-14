pragma solidity >=0.6.0 <0.7.0;

import "./base/HToken.sol";
import "./base/HMath.sol";
import "./base/IERC20.sol";
import {IHPoolFactory} from "./base/IHPoolFactory.sol";
import {IHDealerFactory} from "./base/IHDealerFactory.sol";
//decimals: https://ethereum.stackexchange.com/questions/19673/decimals-on-erc20-tokens


contract HPool is HToken, HMath{
        address public _token;
        bool private _mutex;
        IHPoolFactory public IPoolF;
        IHDealerFactory public IDealF;
 
        constructor(address token, address dealerFactory) public{
                IPoolF = IHPoolFactory(msg.sender);
                IDealF = IHDealerFactory(dealerFactory);
                _token = token;
        }

        modifier _lock_() {
                require(!_mutex, "ERR_REENTRY");
                _mutex = true;
                _;
                _mutex = false;
        }

        function initialize(uint amt) external {
                require(totalSupply()==0);
                _pullUnderlying(_token, msg.sender, amt);
                _mintPoolShare(amt);
                _pushPoolShare(msg.sender, amt);
        }

        function joinPool(uint tokenIn) external {
                uint hTokenSupply = totalSupply();
                uint tokenBalance = IERC20(_token).balanceOf(address(this));
                uint hToken = tokenSwap(tokenIn, tokenBalance, hTokenSupply);
                _pullUnderlying(_token, msg.sender, tokenIn);
                _mintPoolShare(hToken);
                _pushPoolShare(msg.sender, hToken);
        }
        
        function exitPool(uint hTokenIn) external {
                uint hTokenSupply = totalSupply();
                uint tokenBalance = IERC20(_token).balanceOf(address(this));
                uint token = hTokenSwap(hTokenIn, tokenBalance, hTokenSupply);
                _pullPoolShare(msg.sender, hTokenIn);
                _pushUnderlying(_token, msg.sender, token);
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
        function payout(uint amt) external {
                require(IDealF.isDealer(msg.sender), 'Not Dealer');
                _pushUnderlying(_token, msg.sender, amt);
        }

}
