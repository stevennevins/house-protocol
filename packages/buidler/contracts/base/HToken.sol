pragma solidity >=0.6.0 <0.7.0;

import "./IERC20.sol";
import "./HTokenBase.sol";

contract HToken is HTokenBase, IERC20{
        //General
        string public _name;
        string public  _symbol;
        uint8 public _decimals;
        
        function name() public view returns(string memory){

                return _name;
        }

        function symbol() public view returns (string memory){
                return _symbol;
        }

        function decimals() public view returns(uint8){
                return _decimals;
        }

        function allowance(address src, address dst) external view override returns (uint){
                return _allowance[src][dst];
        }

        function balanceOf(address whom) external view override returns (uint){
                return _balance[whom];
        }

        function totalSupply() public view override returns (uint){
                return _totalSupply;
        }

        function approve(address dst, uint amt) external override returns (bool){
                _allowance[msg.sender][dst] = amt;
                emit Approval(msg.sender, dst, amt);
                return true;
        }

        function increaseApproval(address dst, uint amt) external returns (bool){
                _allowance[msg.sender][dst] = _allowance[msg.sender][dst].add(amt);
                emit Approval(msg.sender, dst, _allowance[msg.sender][dst]);
                return true;
        }

        function decreaseApproval(address dst, uint amt) external returns (bool){
                uint oldValue = _allowance[msg.sender][dst];
                if (amt > oldValue){
                        _allowance[msg.sender][dst]=0;
                } else {
                        _allowance[msg.sender][dst] = oldValue.sub(amt);
                }
                emit Approval(msg.sender, dst, _allowance[msg.sender][dst]);
                return true;
        }

        function transfer(address dst, uint amt) external override returns (bool){
                _move(msg.sender, dst, amt);
                return true;
        }

        function transferFrom(address src, address dst, uint amt) external override returns (bool){
                require(msg.sender == src || amt <= _allowance[src][msg.sender], "ERR_HTOKEN_BAD_CALLER");
                _move(src, dst, amt);
                if (msg.sender != src && _allowance[src][msg.sender]!=uint256(-1)){
                        _allowance[src][msg.sender] = _allowance[src][msg.sender].sub(amt);
                        emit Approval(msg.sender, dst, _allowance[src][msg.sender]);
                }
                return true;
        }
}
