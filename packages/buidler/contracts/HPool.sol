pragma solidity >=0.6.0 <0.7.0;

import "./base/HToken.sol";
import "./base/HMath.sol";
import "./base/IERC20.sol";
import {IHPoolFactory} from "./base/IHPoolFactory.sol";
import {IHDealerFactory} from "./base/IHDealerFactory.sol";


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

        function joinPool(uint hTokenOut) external _lock_ {
                uint poolTotal = totalSupply();
        }
        
        function exitPool(uint hTokenIn) external _lock_ {
                uint poolTotal = totalSupply();
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
