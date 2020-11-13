pragma solidity >=0.6.0 <0.7.0;

interface IHPool {

        function joinPool(uint hTokenOut) external;

        function exitPool(uint hTokenIn) external view returns(address);

        function payout(uint amt) external;
}

