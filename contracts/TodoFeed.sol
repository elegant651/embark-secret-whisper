// SPDX-License-Identifier: MIT
pragma solidity >=0.4.24;
contract TodoFeed {
  
  event TodoCompleted (uint256 indexed todoId, address owner, string title, uint256 timestamp);
  event TodoVerified (uint256 indexed todoId, address verifier);

  TodoData[] public todoList;
  mapping(uint256 => TodoData) public todoMap;

  struct PhotoData {
    uint256 todoId;
    string photo;
    uint256 timestamp;
    bool isVerified;
    address verifier;
  }

  struct TodoData {
    uint256 todoId;
    address owner;
    string title;
    string rule;
    PhotoData[] photos;
    uint256 timestamp;
    bool isVerified;
    address verifier;
  }

  function writeTodo(string memory title, string memory rule) public {
    uint256 todoId = todoList.length + 1;

    PhotoData[] memory photos;

    TodoData memory newData = TodoData({
      todoId : todoId,
      owner : msg.sender,
      title : title,
      rule : rule,
      photos : photos,
      timestamp : block.timestamp,
      isVerified: false,
      verifier: address(0)
    });

    todoList.push(newData);
    todoMap[todoId] = newData;

    emit TodoCompleted(todoId, msg.sender, title, block.timestamp);
  }

  // function uploadTodo(uint256 todoId, string memory photo) public {
  //   todoMap[todoId]
  // }

  function verifyTodo(uint256 todoId) public {
    todoMap[todoId].isVerified = true;
    todoMap[todoId].verifier = msg.sender;

    emit TodoVerified(todoId, msg.sender);
  }

  function getTotalTodoCount () public view returns (uint) {
    return todoList.length;
  }

  function getTodo (uint todoId) public view 
    returns(uint256, address, string memory, string memory, uint256, bool, address) {
      require(todoMap[todoId].todoId != 0, "Todo does not exist");
      return (
        todoMap[todoId].todoId,
        todoMap[todoId].owner,
        todoMap[todoId].title,
        todoMap[todoId].rule,        
        todoMap[todoId].timestamp,
        todoMap[todoId].isVerified,
        todoMap[todoId].verifier);
  }

  // function getPhotos (uint todoId)

  // function getPhotosCount ()


}
