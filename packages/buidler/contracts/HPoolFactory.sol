pragma solidity >=0.6.0 <0.7.0;

import "./base/HPool.sol";

contract HPoolFactory{
        mapping(address=>address) public getPool;
        event PoolMinted(address tokenAddress);
        address private _dealerFactory;

        function deployNewPool(address token) 
                public returns (address){
                        require(getPool[token] == address(0), "Pool exists");
                        HPool p = new HPool(token, _dealerFactory);
                        getPool[token]=address(p);
                        emit PoolMinted(address(p));
        }
}
