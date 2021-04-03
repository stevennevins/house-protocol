pragma solidity >=0.6.0 <0.7.0;

interface IERC20 {
        event Approval(address indexed src, address indexed dst,uint amt);
        event Transfer(address indexed src, address indexed dst, uint amt);

        function totalSupply() external view returns (uint);
        function balanceOf(address whom) external view returns (uint);
        function allowance(address src, address dst) external view returns (uint);

        function approve(address dst, uint amt)  external returns (bool);
        function transfer(address dst, uint amt) external returns (bool);
        function transferFrom(address src, address dst, uint amt) external returns (bool);

        function decimals() public view returns (uint8);
        function symbol() public view returns (string);
        function name() public view returns (string);
}
