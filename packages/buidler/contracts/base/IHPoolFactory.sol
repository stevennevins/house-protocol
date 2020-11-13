pragma solidity >=0.6.0 <0.7.0;

interface IHPoolFactory {
        function setFactory(address dealerFactory) external;

        function getFactory() external view returns(address);

        function isPool(address pool) external view returns(address);
}
