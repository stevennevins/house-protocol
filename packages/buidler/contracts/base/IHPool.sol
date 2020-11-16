pragma solidity >=0.6.0 <0.7.0;

interface IHPool {

        function joinPool(uint hTokenOut) external;

        function exitPool(uint hTokenIn) external view returns(address);

        function commit(address player, uint bet, uint b, uint edge, bytes32 requestId) external returns (bool); 

        function payout(bytes32 requestId) external;
}

