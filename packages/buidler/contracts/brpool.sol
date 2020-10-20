pragma solidity >=0.6.0 <0.7.0;

import "@nomiclabs/buidler/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract brpool is ERC20 {
        using SafeMath for uint;
        address private owner;
        constructor() ERC20("King Ether", "KETH") public {
        owner = 0x8E0647590c0Bb51a47d43280D774818a5c053e5c;
        }
}
