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


    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    mapping(address => mapping(address => uint256)) public units;


    constructor(uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
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

    function _pendingPayment(address _to, uint256 _value) public {
      units[msg.sender][_to] += _value;
    }

    function _getUnits(address _owner,address _to) external view returns(uint[] memory) {
      uint[] memory result = new uint[](units[_owner][_to]);

      return result;
    }

    function _makePayment(address _from, address _to) public returns (bool success) {
      require(msg.sender == _from);
      uint256 total = units[msg.sender][_to];
      require(balanceOf[msg.sender] >= total);
      balanceOf[msg.sender] -= total;
      balanceOf[_to] += total;

      emit Transfer(msg.sender, _to, total);

      return true;
    }
}
