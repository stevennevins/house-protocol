pragma solidity >=0.6.0 <0.7.0;


import "./base/HDealer.sol";

contract HDealerFactory{
        event DealerMinted(address tokenAddress);

        function deployNewDealer(address token) 
                public returns (address){
                HDealer d = new HDealer();
                emit DealerMinted(address(d));
        }
}
