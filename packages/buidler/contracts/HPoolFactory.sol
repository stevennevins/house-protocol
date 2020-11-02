pragma solidity >=0.6.0 <0.7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract HPoolFactory{
        address public fee;
        constructor() public {
                fee = 0x8E0647590c0Bb51a47d43280D774818a5c053e5c;
        }
}
