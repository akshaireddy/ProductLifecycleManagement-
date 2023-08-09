// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductLifecycleManagement {
    enum Stage { Created, Design, Manufacturing, Testing, Distribution, Completed }

    struct Product {
        uint productId;
        string name;
        Stage stage;
        address owner;
        uint createdTimestamp;
    }

    mapping(uint => Product) public products;
    uint public productCount;

    event ProductStageUpdated(uint indexed productId, Stage newStage);

    constructor() {
        createProduct("Sample Product");
    }

    function createProduct(string memory _name) public {
        productCount++;
        products[productCount] = Product(productCount, _name, Stage.Created, msg.sender, block.timestamp);
    }

    modifier onlyOwner(uint _productId) {
        require(products[_productId].owner == msg.sender, "Only the owner can perform this action");
        _;
    }

    function updateProductStage(uint _productId, Stage _newStage) public onlyOwner(_productId) {
        require(_productId > 0 && _productId <= productCount, "Invalid product ID");
        require(_newStage > products[_productId].stage, "Invalid stage transition");

        products[_productId].stage = _newStage;
        emit ProductStageUpdated(_productId, _newStage);
    }

    function getProduct(uint _productId) public view returns (
        uint productId,
        string memory name,
        Stage stage,
        address owner,
        uint createdTimestamp
    ) {
        Product storage product = products[_productId];
        return (
            product.productId,
            product.name,
            product.stage,
            product.owner,
            product.createdTimestamp
        );
    }
}
