// SPDX-License-Identifier: MIT
pragma solidity >=0.4.24;
contract TodoFeed {
  
  event TodoCompleted (uint256 indexed todoId, address owner, string title, uint256 timestamp);
  event TodoUploaded (uint256 indexed photoId, uint256 indexed todoId, address owner, string photo);
  event TodoVerified (uint256 indexed photoId, uint256 indexed todoId, address verifier);

  TodoData[] public todoList;
  mapping(uint256 => TodoData) public todoMap;
  PhotoData[] public photoList;
  mapping(uint256 => PhotoData) public photoMap;

  struct PhotoData {
    uint256 photoId;
    uint256 todoId;
    address owner;
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
    uint256[] photos;
    uint256 timestamp;
  }

  function writeTodo(string memory title, string memory rule) public {
    uint256 todoId = todoList.length + 1;

    uint256[] memory photos;

    TodoData memory newData = TodoData({
      todoId : todoId,
      owner : msg.sender,
      title : title,
      rule : rule,
      photos : photos,
      timestamp : block.timestamp      
    });

    todoList.push(newData);
    todoMap[todoId] = newData;

    emit TodoCompleted(todoId, msg.sender, title, block.timestamp);
  }

  function uploadTodo(uint256 todoId, string memory photo) public {
    uint256 photoId = photoList.length + 1;

    PhotoData memory newData = PhotoData({
      photoId : photoId,
      todoId : todoId,
      owner : msg.sender,
      photo : photo,
      timestamp : block.timestamp,
      isVerified: false,
      verifier: address(0)
    });

    photoList.push(newData);
    photoMap[photoId] = newData;
    todoMap[todoId].photos.push(photoId);

    emit TodoUploaded(photoId, todoId, msg.sender, photo);
  }

  function verifyTodo(uint256 photoId) public {
    photoMap[photoId].isVerified = true;
    photoMap[photoId].verifier = msg.sender;
    uint256 todoId = photoMap[photoId].todoId;

    emit TodoVerified(photoId, todoId, msg.sender);
  }

  function getTotalTodoCount () public view returns (uint) {
    return todoList.length;
  }

  function getTotalPhotoCount () public view returns (uint) {
    return photoList.length;
  }

  function getTodo (uint todoId) public view 
    returns(uint256, address, string memory, string memory, uint256[] memory, uint256) {
      require(todoMap[todoId].todoId != 0, "Todo does not exist");
      return (
        todoMap[todoId].todoId,
        todoMap[todoId].owner,
        todoMap[todoId].title,
        todoMap[todoId].rule,
        todoMap[todoId].photos,
        todoMap[todoId].timestamp);
  }

  function getPhoto (uint photoId) public view 
    returns(uint256, uint256, address, string memory, uint256, bool, address) {
      require(photoMap[photoId].photoId != 0, "Photo does not exist");
      return (
        photoMap[photoId].photoId,
        photoMap[photoId].todoId,
        photoMap[photoId].owner,
        photoMap[photoId].photo,
        photoMap[photoId].timestamp,
        photoMap[photoId].isVerified,
        photoMap[photoId].verifier);
  }

  // function getPhotos (uint todoId)

}
