pragma solidity >=0.6.0 <0.7.0;

interface IHDealerFactory {
        event DealerMinted(address tokenAddress);


        function setFactory(address poolFactory) external;

        function getFactory() external view returns(address);

        function isDealer(address dealer) external view returns(bool);
}

