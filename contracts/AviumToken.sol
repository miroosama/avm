pragma solidity ^0.5.0;

contract AviumToken {
    string  public name = "Avium Token";
    string  public symbol = "AVM";
    uint256 public totalSupply;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    struct Unit {
      address from;
      address to;
      uint256 value;
    }

    Unit[] public units;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;


    constructor(uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    function pendingPayment(address _to, uint256 _value) internal {
      units.push(Unit(msg.sender, _to, _value));
    }

    function makePayment(address _from, address _to) public returns (bool success) {
      require(msg.sender == _from);
      uint total = 0;
      for(uint i = 0; i < units.length; i++){
        if(units[i].to == _to){
          total += units[i].value;
          remove(i);
        }
      }

      emit Transfer(msg.sender, _to, total);

      return true;
    }

    function remove(uint index) internal {
        if (index >= units.length) return;

        for (uint i = index; i<units.length-1; i++){
            units[i] = units[i+1];
        }
        units.length--;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;

        emit Approval(msg.sender, _spender, _value);

        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;

        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);

        return true;
    }
}
