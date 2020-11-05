pragma solidity >=0.6.0 <0.7.0;

contract HConst {
        uint public constant BONE = 10**18;

        uint public constant MIN_HPOW_BASE = 1 wei;
        uint public  constant MAX_HPOW_BASE = (2 * BONE) - 1 wei;
        uint public  constant HPOW_PRECISION = BONE / 10**10;

}
