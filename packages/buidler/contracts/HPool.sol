pragma solidity >=0.6.0 <0.7.0;

import "./base/HToken.sol";
import "./base/HMath.sol";
import "./base/IHDealerFactory.sol";
import "./base/IERC20.sol";

contract HPool is HToken, HMath{
        address private _poolFactory;
        address private _token;
        address private _dealerFactory;
        bool private _mutex;

        constructor(address token, address dealerFactory) public{
                _poolFactory = msg.sender;
                _token = token;
                _dealerFactory = dealerFactory;
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

}
