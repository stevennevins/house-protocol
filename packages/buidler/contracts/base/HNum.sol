pragma solidity >=0.6.0 <0.7.0;

import "./HConst.sol";

contract HNum is HConst{
        function htoi(uint a)
                internal pure
                returns (uint)
        {
                return a/ BONE;
        }

        function hfloor(uint a)
                internal pure
                returns (uint)
        {
                return htoi(a) * BONE;
        }

        function hmod(uint a, uint b)
                internal pure
                returns (uint)
        {
                require( b!= 0, 'ERR_DIV_0');
                return a % b;
        }
        function hadd(uint a, uint b)
                internal pure
                returns (uint)
        {
                uint c = a + b;
                require(c>=a, "ERR_ADD_OVERFLOW");
                return c;
        }

        function hsub(uint a, uint b)
                internal pure
                returns (uint)
        {
                (uint c, bool flag) = hsubSign(a, b);
                require(!flag, "ERR_SUB_UNDERFLOW");
                return c;
        }

        function hsubSign(uint a, uint b)
                internal pure
                returns (uint, bool)
        {
                if (a >= b){
                        return (a-b,false);
                } else{
                        return (b-a, true);
                }
        }

        function hmul(uint a, uint b)
                internal pure
                returns (uint)
        {
                uint c0 = a * b;
                require(a==0 || c0 / a == b, "ERR_MUL_OVERFLOW");
                uint c1 = c0 + (BONE / 2);
                require(c1 >= c0, "ERR_MUL_OVERFLOW");
                uint c2 = c1 / BONE;
                return c2;
        }

        function hdiv(uint a, uint b)
                internal pure
                returns (uint)
        {
                require(b != 0, "ERR_DIV_ZERO");
                uint c0 = a * BONE;
                require(a == 0 || c0 / a == BONE, "ERR_DIV_INTERNAL");
                uint c1 = c0 + (b / 2);
                require(c1 >= c0, "ERR_DIV_INTERNAL");
                uint c2 = c1 / b;
                return c2;
        }

        function hpowi(uint a, uint n)
                internal pure
                returns (uint)
        {
                uint z = n % 2 != 0 ? a : BONE;

                for (n /= 2; n != 0; n /= 2){
                        a = hmul(a, a);

                        if (n % 2 != 0) {
                                z = hmul(z, a);
                        }
                }
                return z;
        }

        function hpow(uint base, uint exp)
                internal pure
                returns (uint)
        {
                require(base >= MIN_HPOW_BASE, "ERR_HPOW_BASE_TOO_LOW");
                require(base <= MAX_HPOW_BASE, "ERROR_HPOW_BASE_TOO_HIGH");

                uint whole = hfloor(exp);
                uint remain = hsub(exp, whole);

                uint wholePow = hpowi(base, htoi(whole));

                if (remain == 0){
                        return wholePow;
                }

                uint partialResult = hpowApprox(base, remain, HPOW_PRECISION);
                return hmul(wholePow, partialResult);
        }

        function hpowApprox(uint base, uint exp, uint precision)
                internal pure
                returns (uint)
        {
                uint a = exp;
                (uint x, bool xneg) = hsubSign(base, BONE);
                uint term = BONE;
                uint sum = term;
                bool negative = false;


                for (uint i = 1; term >= precision; i++){
                        uint bigK = i * BONE;
                        (uint c, bool cneg) = hsubSign(a, hsub(bigK, BONE));
                        term = hmul(term, hmul(c, x));
                        term = hdiv(term, bigK);
                        if (term == 0) break;

                        if (xneg) negative = !negative;
                        if (cneg) negative = !negative;
                        if (negative){
                                sum = hsub(sum, term);
                        } else{
                                sum = hadd(sum, term);
                        }
                }
                return sum;
        }
}
