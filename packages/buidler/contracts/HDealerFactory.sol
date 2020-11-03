pragma solidity >=0.6.0 <0.7.0;


import "./base/HDealer.sol";

contract HDealerFactory{
        event DealerMinted(address tokenAddress);
        address public _poolFactory;

        mapping(address=>bool) private dealers;
        function deployNewDealer() 
                public returns (address){
                        require(_poolFactory!=address(0), "Not linked to pool facotry");
                HDealer d = new HDealer(_poolFactory, msg.sender);
                dealers[address(d)]=true;
                emit DealerMinted(address(d));
        }

        function setFactory(address poolFactory) external {
                _poolFactory = poolFactory;
        }

        function getFactory() external view returns (address poolFactory){
                return _poolFactory;
        }
}
