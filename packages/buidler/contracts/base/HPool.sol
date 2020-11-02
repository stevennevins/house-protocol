pragma solidity >=0.6.0 <0.7.0;

import "./HToken.sol";
import "./HMath.sol";

contract HPool is HToken, HMath{
        address private _factory;
        address private _token;

        constructor() public{
                _factory = msg.sender;
        }

}
