// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25;
contract TodoFeed {
  
  event TodoCompleted (uint256 indexed todoId, address owner, string title, bytes photo, uint256 timestamp);
  event TodoVerified (uint256 indexed todoId, address verifier);

  TodoData[] public todoList;
  mapping(uint256 => TodoData) public todoMap;

  struct TodoData {
    uint256 todoId;
    address owner;
    string title;
    bytes photo;
    uint256 timestamp;
    bool isVerified;
    address verifier;
  }

  function writeTodo(string memory title, bytes memory photo) public {
    uint256 todoId = todoList.length + 1;

    TodoData memory newData = TodoData({
      todoId : todoId,
      owner : msg.sender,
      title : title,
      photo : photo,
      timestamp : block.timestamp,
      isVerified: false,
      verifier: address(0)
    });

    todoList.push(newData);
    todoMap[todoId] = newData;

    emit TodoCompleted(todoId, msg.sender, title, photo, block.timestamp);
  }

  function verifyTodo(uint256 todoId) public {
    todoMap[todoId].isVerified = true;
    todoMap[todoId].verifier = msg.sender;

    emit TodoVerified(todoId, msg.sender);
  }

  function getTotalTodoCount () public view returns (uint) {
    return todoList.length;
  }

  function getTodo (uint todoId) public view 
    returns(uint256, address, string memory, bytes memory, uint256, bool, address) {
      require(todoMap[todoId].todoId != 0, "Todo does not exist");
      return (
        todoMap[todoId].todoId,
        todoMap[todoId].owner,
        todoMap[todoId].title,
        todoMap[todoId].photo,
        todoMap[todoId].timestamp,
        todoMap[todoId].isVerified,
        todoMap[todoId].verifier);
  }


}
