
//SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

 import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0/contracts/token/ERC721/ERC721.sol";
 import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0/contracts/access/Ownable.sol";
 import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.4.0/contracts/token/ERC20/ERC20.sol";


contract ArtSea is ERC721, Ownable{
    address payable public _contractOwner;
    
    using Address for address;
    
  
  
  
  struct Auction {
    uint256 tokenId; // ERC721 token id for the current lot
    uint256 step; // minimal diff between last bid and a new bid
    uint256 bidMaxTime; // max time in seconds between last bid and a new bid
    uint256 startBid; // minimal value for a first bid
    uint256 lastBid; // value of the last bid, zero at the beginning
    uint256 lastBidTime; // timestamp of the last bid, zero at the beginning
    address lastBidSender; // address of the last bid sender
    address tokenRefundAddress; // address for ERC721 token refunding if no bid was sent
    address ethReceiver; // address for eth receiver if auctiom successfully completed
    bool tokenPayment;
    bool active; // current lot state, is false if auction is not started or is over
  }

    
    ERC20 private _mintingCurrency;
    Auction private _lot;
    uint public auctionEndTime;
    bool public tokenbuying;
    address payable[] public teamShares;
    
    
    mapping (uint => uint) public price;
    mapping (uint => bool) public listedMap;
    mapping (uint256 => Auction) internal tokenIdToAuction;

    

    event Purchase(address indexed previousOwner, address indexed newOwner, uint price, uint nftID, string uri);

    event Minted(address indexed minter, uint price, uint nftID, string uri);

    event PriceUpdate(address indexed owner, uint oldPrice, uint newPrice, uint nftID);

    event NftListStatus(address indexed owner, uint nftID, bool isListed);
    
    event TokensTransfer (address indexed owner, address indexed reciever,uint amount);
    
    event Start (uint256 _tokenId,address _ethReceiver,address _tokenRefundAddress,uint256 _step,uint256 _startBid,uint256 _bidMaxTime,bool _tokenPayment);
    
    event Bid (uint256 _tokenId,uint256 _amount,address _bidSender,uint256 _previousBidAmount,address _previousBidSender,bool _tokenPayment);
    
    event Complete (uint256 _tokenId,uint256 _lastBidAmount,address _lastBidSender,bool success);
    
    event AuctionCancelled(uint256 tokenId);

    


    constructor() ERC721("ArtSea", "ArtSeaNFT")  {
        _contractOwner = msg.sender;
        
    }
    
    
    function _isOnAuction(Auction storage _auction) internal view returns (bool) {
        return (_auction.bidMaxTime > 0);
    }
    
    // AUCTION IMPLEMENTED BY DR
    
    function Auctionstart (
    uint256 _tokenId,
    uint256 _step,
    uint256 _startBid,
    uint256 _bidMaxTime,
    bool _tokenPayment) public  returns(bool) {
    require (_bidMaxTime > 0, "Please Enter more than 0 ");
    require (_bidMaxTime > block.timestamp, "Please enter the future time");
    require(msg.sender == ownerOf(_tokenId), "Youre not the Owner of this NFT");
    require (!_isOnAuction(tokenIdToAuction[_tokenId]),"This NFT is already on auction");  
    
    //  require (_lot.tokenRefundAddress != address(0),
    //   "Token refund wouldn't be zero address");
    // require (_lot.ethReceiver != address (0),
    //   "Ether receiver wouldn't be zero address");
    
    
    Auction memory auction = Auction 
     (
           uint256 (_tokenId), // ERC721 token id for the current lot
           uint256 (_step), // minimal diff between last bid and a new bid
           uint256 (_bidMaxTime), // max time in seconds between last bid and a new bid
           uint256 (_startBid), // minimal value for a first bid
           0, // value of the last bid, zero at the beginning
           0, // timestamp of the last bid, zero at the beginning
           address(0), // address of the last bid sender
           msg.sender, // address for ERC721 token refunding if no bid was sent
           msg.sender, // address for eth receiver if auctiom successfully completed
           bool (_tokenPayment),
           true // Active during auction
      );
               
        tokenIdToAuction[_tokenId] = auction;
        


    emit Start(
      _tokenId, 
      auction.ethReceiver, 
      auction.tokenRefundAddress, 
      auction.step, 
      auction.startBid, 
      auction.bidMaxTime, 
      auction.tokenPayment
    );
    
    return true;
  }
  
  function cancelAuctionByTokenId(uint256 _tokenId) public {
      Auction storage auction = tokenIdToAuction[_tokenId];

      require(auction.active);
      require(msg.sender == auction.ethReceiver);

      
      delete tokenIdToAuction[_tokenId];

      emit AuctionCancelled(auction.tokenId);
  }

  
  function getAuction(uint256 _tokenId)
        external
        view
        returns
    (
        address seller,
        uint256 startingPrice,
        uint256 endingPrice,
        uint256 duration
    ) {
      Auction storage auction = tokenIdToAuction[_tokenId];
        require(_isOnAuction(auction));
        return (
            auction.ethReceiver,
            auction.startBid,
            auction.lastBid,
            auction.bidMaxTime
        );
    }
    
    
    
  // BIDDING IN BNB CURRENCY FUNCTION
  
  function bidInBNB (uint256 _tokenId) public payable returns(bool) {
    Auction storage auction = tokenIdToAuction[_tokenId]; 
    require (auction.active, 'There is not any active auction now');
    require (!auction.tokenPayment, 'This lot can be payed in BNB Only');
    require(msg.sender != ownerOf(auction.tokenId), "You cannot Bid on your own NFT");
    if (auction.lastBidTime > 0) {
      require (block.timestamp  <= auction.bidMaxTime,
        'Previous bid has won, current auction is over');
    }
    uint256 _bnbAmount = msg.value;
    uint256 _minAmount = auction.startBid;
    if (auction.lastBid > 0) {
      _minAmount = auction.lastBid + auction.step;
    }

    require (_bnbAmount > _minAmount, 'Please enter the amount higher than current Bid');
    address _previousBidSender = auction.lastBidSender;
    uint256 _previousBid = auction.lastBid;
    auction.lastBidSender = _msgSender();
    auction.lastBidTime = block.timestamp;
    auction.lastBid = _bnbAmount;
    if (_previousBidSender != address(0)
      && _previousBid > 0) {
      payable(_previousBidSender).transfer(_previousBid);
      // return previous bid for a sender when next bid is sent
    }
    emit Bid(
      auction.tokenId,
      auction.lastBid,
      auction.lastBidSender,
      _previousBid,
      _previousBidSender,
      false
    );
    return true;
  }
  
  
  //COMPLETION OF AUCTION FUNCTION
  
  function completeAuction (uint256 _tokenId) external returns(bool) {
    Auction storage auction = tokenIdToAuction[_tokenId];
    require (auction.active, 'There is not any active auction now');
    require (block.timestamp > auction.bidMaxTime, 'Auction is not over yet');
    require(msg.sender == ownerOf(auction.tokenId), "Only Token Owner can completeAuction");
    bool _success;
    address _lastBidSender;
    if (auction.lastBid == 0) { // no bid happened, send ERC721 token to the refund address
      _transfer(
        msg.sender,
        auction.tokenRefundAddress,
        auction.tokenId
      );
    } else {
      _transfer( // auction was successful, send ERC721 token to the last bid sender
        msg.sender,
        auction.lastBidSender,
        auction.tokenId
      );
      _lastBidSender = auction.lastBidSender;
      _success = true;
    }
    uint256 _lastBid = auction.lastBid;
    auction.lastBid = 0;
    auction.lastBidTime = 0;
    auction.lastBidSender = address(0);
    auction.active = false;
    if (_lastBid > 0) {
      if (auction.tokenPayment) {
        require(_mintingCurrency.transfer(auction.ethReceiver, _lastBid));
      } else {
        payable(auction.ethReceiver).transfer(_lastBid); // send last bid to the ether receiver address
      }
    }
    
    emit Complete(auction.tokenId, _lastBid, _lastBidSender, _success);
    
    delete tokenIdToAuction[auction.tokenId];
    
    return true;
  }


    function mintingCurrency() external view returns (ERC20) {
        return _mintingCurrency;
    }

  
    function setMintingCurrency(ERC20 newMintingCurrency) onlyOwner external {
        _mintingCurrency = newMintingCurrency;
    }
    

  function mint(string memory _tokenURI, address _toAddress, uint _price) public returns (uint) {
        uint _tokenId = totalSupply() + 1;
        price[_tokenId] = _price;
        listedMap[_tokenId] = true;

        _safeMint(_toAddress, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);

        emit Minted(_toAddress, _price, _tokenId, _tokenURI);

        return _tokenId;
    }

    function buy(uint _id) external payable {
        _validate(_id);

        address _previousOwner = ownerOf(_id);
        address _newOwner = msg.sender;

        _trade(_id);

        emit Purchase(_previousOwner, _newOwner, price[_id], _id, tokenURI(_id));
    }
    
    
    // Batch minting function implemented by  DR
    
    function mintBatch(address _toAddress, uint256 numberofNFT,string calldata _tokenURI,uint _price) public   {
      
      for (uint i = 0; i < numberofNFT; i++) {
          uint _tokenId =totalSupply() + 1;
          price[_tokenId] = _price;
          listedMap[_tokenId] = true;
        _safeMint(_toAddress, _tokenId);
        _setTokenURI(_tokenId, _tokenURI);
        emit Minted(_toAddress, _price, _tokenId, _tokenURI);
      }
     
    }
    
    function updatePrice(uint _tokenId, uint _price) public returns (bool) {
        uint oldPrice = price[_tokenId];
        require(msg.sender == ownerOf(_tokenId), "Error, you are not the owner");
        price[_tokenId] = _price;

        emit PriceUpdate(msg.sender, oldPrice, _price, _tokenId);
        return true;
    }
    
    
    function _trade(uint _id) internal {
        address payable _buyer = payable(msg.sender);
        address payable _owner = payable(ownerOf(_id));

        _transfer(_owner, _buyer, _id);
        
        // 2.5% commission cut
        uint _commissionValue = price[_id] / 40 ;
        uint _sellerValue = price[_id] - _commissionValue;

        if(tokenbuying){
             _mintingCurrency.transferFrom(_buyer,_owner,_sellerValue);
             _mintingCurrency.transferFrom(_msgSender(),_contractOwner,_commissionValue);
        }
        else{
            _owner.transfer(_sellerValue);
            _contractOwner.transfer(_commissionValue);
        }

        // If buyer sent more than price, we send them back their rest of funds
        if (msg.value > price[_id]) {
            _buyer.transfer(msg.value - price[_id]);
        }

        listedMap[_id] = false;
    }
    
    
    
    function _validate(uint _id) internal {
        bool isItemListed = listedMap[_id];
        Auction storage auction = tokenIdToAuction[_id];  
        require(_exists(_id), "Error, wrong tokenId");
        require(isItemListed, "Item not listed currently");
        require (!auction.active, 'An Auction is ongoing on this Token you cannot buy this NFT');
        require(msg.sender != ownerOf(_id), "Can not buy what you own");
        require(msg.value >= price[_id],"Sorry the value is lower please enter correct amount");
    }
    
    function updateListingStatus(uint _tokenId, bool shouldBeListed) public returns (bool) {
        require(msg.sender == ownerOf(_tokenId), "Error, you are not the owner");

        listedMap[_tokenId] = shouldBeListed;

        emit NftListStatus(msg.sender, _tokenId, shouldBeListed);

        return true;
    }
    
}


