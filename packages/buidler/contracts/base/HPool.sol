pragma solidity >=0.6.0 <0.7.0;

import "./HToken.sol";
import "./HMath.sol";
import "./IHDealerFactory.sol";

contract HPool is HToken, HMath, IHDealerFactory{
        address private _poolFactory;
        address private _token;
        address private _dealerFactory;

        constructor(address token, address dealerFactory) public{
                _poolFactory = msg.sender;
                _token = token;
                _dealerFactory = dealerFactory;
        }

}
