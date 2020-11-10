pragma solidity >=0.6.0 <0.7.0;


import "./HDealer.sol";

contract HDealerFactory{
        event DealerMinted(address tokenAddress);
        event UpdatePoolFactory(address poolFactory);
        address private _poolFactory;
        bool private _finalized=false;

        mapping(address=>bool) private dealers;
        function deployNewDealer() 
                public returns (address){
                        require(_poolFactory!=address(0), "Not linked to pool facotry");
//                HDealer d = new HDealer(_poolFactory, msg.sender);
                HDealer d = new HDealer();
                dealers[address(d)]=true;
                emit DealerMinted(address(d));
        }

        function finalize() external {
                _finalized=true;
        }
        function setPoolFactory(address poolFactory) external {
                require(!_finalized, "ERR_IS_FINALIZED");
                _poolFactory = poolFactory;
                emit UpdatePoolFactory(_poolFactory);
        }

        function getFactory() external view returns (address){
                return _poolFactory;
        }

        function isDealer(address dealer) external view returns (bool){
                return dealers[dealer];
        }
}
