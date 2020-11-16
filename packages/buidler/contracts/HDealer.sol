pragma solidity >=0.6.0 <0.7.0;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "./base/HNum.sol";
import {IHPoolFactory} from "./base/IHPoolFactory.sol";
import {IHDealerFactory} from "./base/IHDealerFactory.sol";
import {IHPool} from "./base/IHPool.sol";
//add gulp: https://ethereum.stackexchange.com/questions/84851/how-to-withdraw-other-erc20-tokens-besides-ethereum-from-my-contract
contract HDealer is VRFConsumerBase, HNum{
    bytes32  internal keyHash;
    uint256 internal fee;
    address private _feeOwner;

    IHPoolFactory public IPoolF;
    IHDealerFactory public IDealF;
    IHPool public IPool;
        
    uint256 public randomResult;

    struct game {
            uint choice;
            uint choices;
            address pool;
            uint randomness;
    }

    mapping(bytes32 => game) public games;
            /**
            *Constructor inherits VRFConsumerBase
            * 
            * Network: Kovan
            * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
            * LINK token address:                0xa36085F69e2889c224210F603D836748e7dC0088
            * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
            */
            constructor(address poolFactory, address feeOwner) 
            VRFConsumerBase(
            0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator
            0xa36085F69e2889c224210F603D836748e7dC0088  // LINK Token
            ) public
            {
            keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
            fee = 0.1 * 10 ** 18; // 0.1 LINK
            _feeOwner = feeOwner;
            IPoolF = IHPoolFactory(poolFactory);
            IDealF = IHDealerFactory(msg.sender);
            }

            /** 
            * Requests randomness from a user-provided seed paid from contract balance
            */
            function roll(uint choice, uint bet,uint edge, uint lo, uint hi, address token, uint256 userProvidedSeed) public {
                     require(LINK.balanceOf(msg.sender)>=fee,"Not enough link - fill with faucet");
                     bool xfer = LINK.transferFrom(msg.sender, address(this), fee);
                     require(xfer , 'transfer of link failed');
                     require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
                     //add ierc20 and check user balance before submitting roll
                     address pool = IPoolF.getPool(token);
                     require(pool!=address(0), "Not a valid pool");
                     require( 0 < lo && lo <= choice && choice <= hi, "Invalid Choice");
                     bytes32 requestId = requestRandomness(keyHash, fee, userProvidedSeed);
                     IPool = IHPool(pool);
                     uint b = 1;
                     bool commit = IPool.commit(msg.sender, bet, b, edge, requestId);
                     require(commit, 'commit failed');
                     games[requestId] = game(
                             hadd(hsub(choice,lo),1),
                             hadd(hsub(hi,lo),1),
                             pool,
                             0
                             );
            }

            /**
            * Callback function used by VRF Coordinator
            */
            function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
                    games[requestId].randomness = randomness;
                    randomResult = games[requestId].randomness;
                    IPool = IHPool(games[requestId].pool); 
                    IPool.payout(requestId);
            }

}
