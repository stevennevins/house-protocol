pragma solidity >=0.6.0 <0.7.0;

import "./HNum.sol";

contract HTokenBase is HNum{
        mapping(address => uint) internal _balance;
        mapping(address => mapping(address=>uint)) internal _allowance;
        uint internal _totalSupply;

        event Approval(address indexed src, address indexed dst, uint amt);
        event Transfer(address indexed src, address indexed dst, uint amt);

        function _mint(uint amt) internal{
                _balance[address(this)] = hadd(_balance[address(this)], amt);
                _totalSupply = hadd(_totalSupply, amt);

                emit Transfer(address(0),  address(this), amt);
        }

        function _burn(uint amt) internal{
                require(_balance[address(this)]>=amt, "ERR_INSUFFICIENT_BALANCE");
                _balance[address(this)] = hsub(_balance[address(this)], amt);
                _totalSupply = hsub(_totalSupply, amt);

                emit Transfer(address(this), address(0), amt);

        }

        function _move(address src, address dst, uint amt) internal{
                require(_balance[src] >= amt, "ERR_INSUFFICIENT_BALANCE");
                _balance[src] = hsub(_balance[src], amt);
                _balance[dst] = hadd(_balance[dst], amt);

                emit Transfer(src, dst, amt);
        }

        function _push(address to, uint amt) internal{
                _move(address(this), to, amt);
        }

        function _pull(address from, uint amt) internal{
                _move(from,address(this),amt);
        }
}
