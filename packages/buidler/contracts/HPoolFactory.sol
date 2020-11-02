pragma solidity >=0.6.0 <0.7.0;

import "./base/HPool.sol";

contract HPoolFactory{
        event PoolMinted(address tokenAddress);

        function deployNewPool(address token) 
                public returns (address){
                HPool p = new HPool(token);
                emit PoolMinted(address(p));
        }
}
