pragma solidity >=0.6.0 <0.7.0;

contract HConst {
        uint public constant BONE = 10**18;
        uint public constant MIN_HPOW_BASE = 1 wei;
        uint public  constant MAX_HPOW_BASE = (2 * BONE) - 1 wei;
        uint public  constant HPOW_PRECISION = BONE / 10**10;
        address public VRF_Coordinator = 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9;
        address public LINK_Token = 0xa36085F69e2889c224210F603D836748e7dC0088;
}
