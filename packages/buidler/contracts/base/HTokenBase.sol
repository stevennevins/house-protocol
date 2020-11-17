pragma solidity >=0.6.0 <0.7.0;

import "@openzeppelin/contracts/math/SafeMath.sol";

contract HTokenBase {
        using SafeMath for uint;
        mapping(address => uint) internal _balance;
        mapping(address => mapping(address=>uint)) internal _allowance;
        uint internal _totalSupply;

        event Approval(address indexed src, address indexed dst, uint amt);
        event Transfer(address indexed src, address indexed dst, uint amt);

        function _mint(uint amt) internal{
                _balance[address(this)] = _balance[address(this)].add(amt);
                _totalSupply = _totalSupply.add(amt);

                emit Transfer(address(0),  address(this), amt);
        }

        function _burn(uint amt) internal{
                require(_balance[address(this)]>=amt, "ERR_INSUFFICIENT_BALANCE");
                _balance[address(this)] = _balance[address(this)].sub(amt);
                _totalSupply = _totalSupply.sub(amt);

                emit Transfer(address(this), address(0), amt);

        }

        function _move(address src, address dst, uint amt) internal{
                require(_balance[src] >= amt, "ERR_INSUFFICIENT_BALANCE");
                _balance[src] = _balance[src].sub(amt);
                _balance[dst] = _balance[dst].add(amt);

                emit Transfer(src, dst, amt);
        }

        function _push(address to, uint amt) internal{
                _move(address(this), to, amt);
        }

        function _pull(address from, uint amt) internal{
                _move(from,address(this),amt);
        }
}
