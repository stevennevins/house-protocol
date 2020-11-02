pragma solidity >=0.6.0 <0.7.0;


import "./base/HDealer.sol";

contract HDealerFactory{
        event DealerMinted(address tokenAddress);
        address private _poolFactory;

        mapping(address=>bool) public dealers;
        function deployNewDealer() 
                public returns (address){
                        require(_poolFactory!=address(0), "Not linked to pool facotry");
                HDealer d = new HDealer(_poolFactory);
                dealers[address(d)]=true;
                emit DealerMinted(address(d));
        }

        function setFactory(address poolFactory) external {
                _poolFactory = poolFactory;
        }
}
