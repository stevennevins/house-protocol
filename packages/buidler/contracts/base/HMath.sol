pragma solidity >=0.6.0 <0.7.0;

import "./HNum.sol";

contract HMath is HConst, HNum{
      function tokenSwap(
              uint tokenIn,
              uint tokenBalance,
              uint hTokenSupply
      )
      public pure
      returns (uint)
      {
              return hmul(tokenIn, hdiv(hTokenSupply, tokenBalance));
            
      }
      function hTokenSwap(
              uint hTokenIn,
              uint tokenBalance,
              uint hTokenSupply
      )
      public pure
      returns (uint)
      {
              return hmul(hTokenIn, hdiv(tokenBalance, hTokenSupply));

      }
        //functions for calculating bet size and exchanges

       /*********************************************
       //Calc Range of Choices
       //hi = Highest Int
       //lo = Lowest Int
       //
       //Choices = hi - lo + 1
       //
      **********************************************/
     function choiceRange(
             uint hi,
             uint lo
     )
     public pure
     returns (uint)
     {
            return  hadd( hsub(hi,lo), 1);
     }
     /************************************************
     //Calculate the result of a roll
     //lo = lowest int
     //choices = range of choices for the roll
     //choice = player choice
     //randomness = result from VRF
     //
     //result = randomness % range + lo
     ************************************************/
     function result(
             uint lo,
             uint choices,
             uint randomness
     )
     public pure
     returns (uint)
     {
             return hadd(hmod(randomness, choices), lo);
     }
     
     /************************************************
     //Calculate the probability of a win
     //
     //choices = range of choices for the roll
     //
     //p = 1 / choices
     //
     ************************************************/
     function pWin(
             uint choices
     )
     public pure
     returns (uint)
     {
             return hdiv(1 , choices);
     }
     /************************************************
     //Calculates the payout at p
     //
     //p = probability of win
     //b = payout at p
     // 
     // b = ( 1 - p ) / p
     ************************************************/
     function payOdds(
             uint p
     )
     public pure
     returns (uint)
     {
             return hdiv(hsub(1, p), p);
     }
     /************************************************
     //Calculate the payout at the odds taken, bet size, and edge
     //bet = amount the player bet
     //edge = house edge
     //b = payout odds
     //b = (1 - p )/ p
     //payout = (bet * b + bet)(1-edge)
     ************************************************/
     function payout(
             uint b,
             uint bet,
             uint edge
     )
     public pure
     returns (uint)
     {
             return hmul(hadd(hmul(bet , b), bet) , hsub(1 , edge));
     }
     /************************************************
     //Owners' payout at the odds taken, bet size, and edge
     //bet = amount the player bet
     //edge = house edge
     //b = payout odds
     //b = (1 - p )/ p
     //payout = (bet * b + bet)(edge / 2)
     ************************************************/
     function ownersPayout(
             uint b,
             uint bet,
             uint edge
     )
     public pure
     returns (uint)
     {
             return hmul(hadd(hmul(bet , b), bet) , hdiv(edge , 2));
     }
     /************************************************
     //Max bet
     //bankroll = amount of token held in reserve
     //edge = house edge
     //k = % of edge to risk
     //
     //max = bankroll * k * edge
     ************************************************/
     function maxBet(
             uint bankroll,
             uint edge,
             uint k
     )
     public pure
     returns (uint)
     {
             return hmul(hmul( bankroll, edge ), k);
     }




}
