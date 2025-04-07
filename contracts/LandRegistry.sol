// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract LandRegistry is AccessControl {
    // --- ROLE DEFINITIONS ---
    bytes32 public constant INSPECTOR_ROLE = keccak256("INSPECTOR_ROLE");

    // --- ENUMS & STRUCTS ---
    enum OfferStatus { 
        BuyerFunded,       // Buyer submits an offer with escrow funds deposited
        SellerAccepted,    // Seller accepts the offer
        InspectorApproved, // Inspector approves the accepted offer and finalizes transfer
        SellerRejected,    // Seller rejects the offer: funds refunded to buyer
        Cancelled          // Buyer cancels the offer (only allowed before seller acceptance)
    }
    
    struct Property {
        uint256 id;
        address seller;
        address owner;
        bool isListed;
        uint256 area;           // e.g., square meters
        uint256 askingPrice;    // in wei
        string location;
        string documentHash;    // off-chain document hash
    }
    
    struct Offer {
        uint256 id;
        uint256 propertyId;
        uint256 offerPrice;     // offered price (the escrow funds deposited by the buyer)
        uint256 escrowAmount;   // funds held in escrow
        address buyer;
        OfferStatus status;
    }
    
    // --- STATE VARIABLES ---
    uint256 public propertyCount;
    uint256 public offerCount;
    
    mapping(uint256 => Property) public properties;
    mapping(uint256 => Offer) public offers;
    mapping(address => uint256[]) public userTransactions;
    mapping(uint256 => uint256[]) public propertyOffers;
    uint256[] public activeProperties;
    
    // --- EVENTS ---
    event PropertyListed(uint256 propertyId, address indexed seller, uint256 timestamp);
    event PropertyUpdated(uint256 propertyId, address indexed seller, uint256 timestamp);
    event PropertyCancelled(uint256 propertyId, address indexed seller, uint256 timestamp);
    event OfferSubmitted(uint256 offerId, uint256 propertyId, address indexed buyer, uint256 offerPrice, uint256 timestamp);
    event OfferCancelled(uint256 offerId, address indexed buyer, uint256 timestamp);
    event SellerAcceptedOffer(uint256 offerId, uint256 timestamp);
    event SellerRejectedOffer(uint256 offerId, uint256 timestamp);
    event EscrowFunded(uint256 offerId, address indexed buyer, uint256 amount, uint256 timestamp);
    event InspectorApprovedOffer(uint256 offerId, uint256 timestamp);
    event FundsTransferred(uint256 offerId, address indexed recipient, uint256 amount, uint256 timestamp);
    event FundsRefunded(uint256 offerId, address indexed recipient, uint256 amount, uint256 timestamp);
    
    // --- CONSTRUCTOR ---
    constructor(address _inspector) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(INSPECTOR_ROLE, _inspector);
    }
    
    // ============================================================
    // PROPERTY MANAGEMENT FUNCTIONS
    // ============================================================
    
    function listProperty(
        string memory _location,
        uint256 _area,
        uint256 _askingPrice,
        string memory _documentHash
    ) public {
        propertyCount++;
        properties[propertyCount] = Property({
            id: propertyCount,
            seller: msg.sender,
            owner: msg.sender,
            isListed: true,
            area: _area,
            askingPrice: _askingPrice,
            location: _location,
            documentHash: _documentHash
        });
        activeProperties.push(propertyCount);
        emit PropertyListed(propertyCount, msg.sender, block.timestamp);
        userTransactions[msg.sender].push(propertyCount);
    }
    
    function updateProperty(
        uint256 _propertyId,
        string memory _location,
        uint256 _area,
        uint256 _askingPrice,
        string memory _documentHash
    ) public {
        Property storage prop = properties[_propertyId];
        require(msg.sender == prop.seller, "Only seller can update");
        require(prop.isListed, "Property not active");
        prop.location = _location;
        prop.area = _area;
        prop.askingPrice = _askingPrice;
        prop.documentHash = _documentHash;
        emit PropertyUpdated(_propertyId, msg.sender, block.timestamp);
    }
    
    function cancelPropertyListing(uint256 _propertyId) public {
        Property storage prop = properties[_propertyId];
        require(msg.sender == prop.seller, "Only seller can cancel listing");
        require(prop.isListed, "Property already inactive");
        prop.isListed = false;
        _removeActiveProperty(_propertyId);
        emit PropertyCancelled(_propertyId, msg.sender, block.timestamp);
    }
    
    function _removeActiveProperty(uint256 _propertyId) internal {
        uint256 length = activeProperties.length;
        for (uint256 i = 0; i < length; i++) {
            if (activeProperties[i] == _propertyId) {
                activeProperties[i] = activeProperties[length - 1];
                activeProperties.pop();
                break;
            }
        }
    }
    
    function getActiveProperties() public view returns (uint256[] memory) {
        return activeProperties;
    }
    
    // ============================================================
    // OFFER & ESCROW MANAGEMENT FUNCTIONS
    // ============================================================
    
    function submitOffer(uint256 _propertyId, uint256 _offerPrice, address _buyer) public payable {
        require(properties[_propertyId].isListed, "Property not listed");
        require(_offerPrice > 0, "Offer price must be > 0");
        require(msg.value == _offerPrice, "Sent value must equal offer price");

        offerCount++;
        offers[offerCount] = Offer({
            id: offerCount,
            propertyId: _propertyId,
            offerPrice: _offerPrice,
            escrowAmount: msg.value, // Escrow amount is automatically passed via msg.value
            buyer: _buyer,
            status: OfferStatus.BuyerFunded
        });
        propertyOffers[_propertyId].push(offerCount);
        emit OfferSubmitted(offerCount, _propertyId, _buyer, _offerPrice, block.timestamp);
        emit EscrowFunded(offerCount, _buyer, msg.value, block.timestamp);
        userTransactions[_buyer].push(offerCount);
    }

    /// @notice Buyer cancels an offer (only allowed before seller acceptance) and is refunded.
    function cancelOffer(uint256 _offerId) public {
        Offer storage offer = offers[_offerId];
        require(msg.sender == offer.buyer, "Only buyer can cancel offer");
        require(offer.status == OfferStatus.BuyerFunded, "Offer cannot be cancelled at this stage");
        offer.status = OfferStatus.Cancelled;
        uint256 refundAmount = offer.escrowAmount;
        offer.escrowAmount = 0;
        (bool success, ) = offer.buyer.call{value: refundAmount}("");
        require(success, "Refund failed");
        emit OfferCancelled(_offerId, msg.sender, block.timestamp);
        emit FundsRefunded(_offerId, offer.buyer, refundAmount, block.timestamp);
    }
    
    /// @notice Seller accepts an offer.
    function sellerAcceptOffer(uint256 _offerId) public {
        Offer storage offer = offers[_offerId];
        Property storage prop = properties[offer.propertyId];
        require(msg.sender == prop.seller, "Only seller can accept offer");
        require(offer.status == OfferStatus.BuyerFunded, "Offer must be funded by buyer");
        offer.status = OfferStatus.SellerAccepted;
        emit SellerAcceptedOffer(_offerId, block.timestamp);
    }
    
    /// @notice Seller rejects an offer and refunds the buyer.
    function sellerRejectOffer(uint256 _offerId) public {
        Offer storage offer = offers[_offerId];
        Property storage prop = properties[offer.propertyId];
        require(msg.sender == prop.seller, "Only seller can reject offer");
        require(offer.status == OfferStatus.BuyerFunded, "Offer not in refundable state");
        offer.status = OfferStatus.SellerRejected;
        uint256 refundAmount = offer.escrowAmount;
        offer.escrowAmount = 0;
        (bool success, ) = offer.buyer.call{value: refundAmount}("");
        require(success, "Refund failed");
        emit SellerRejectedOffer(_offerId, block.timestamp);
        emit FundsRefunded(_offerId, offer.buyer, refundAmount, block.timestamp);
    }
    

 /// @notice Inspector approves the offer after off-chain validation and releases funds from the designated wallet to the seller.
/// @param _offerId The ID of the offer to approve.
/// @param seller The seller's address fetched from Supabase.
/// @param _amount The amount of funds to transfer to the seller.
function inspectorApproveOffer(
    uint256 _offerId, 
    address seller, 
    uint256 _amount
) public payable onlyRole(INSPECTOR_ROLE) returns (bool) {
    Offer storage offer = offers[_offerId];
    
    // Mark the offer as approved by the inspector.
    offer.status = OfferStatus.InspectorApproved;
    emit InspectorApprovedOffer(_offerId, block.timestamp);
    
    // Validate the transfer amount.
    require(_amount > 0, "Transfer amount must be > 0");
    require(msg.value > 0, "msg.value must be greater than 0");
    require(msg.value == _amount, "Attached value must equal the transfer amount");a
    require(_amount <= offer.escrowAmount, "Transfer amount exceeds escrow funds");
    
    // Require that the caller attaches the funds to be transferred.
    require(msg.value == _amount, "Attached value must equal the transfer amount");
    
    // Deduct the transfer amount from escrow funds.
    offer.escrowAmount -= _amount;
    
    // Transfer the funds (provided via msg.value) to the seller.
    (bool success, ) = payable(seller).call{value: msg.value}("");
    require(success, "Transfer to seller failed");
    emit FundsTransferred(_offerId, seller, _amount, block.timestamp);
    
    // If the escrow funds are fully released, finalize the property transfer.
    if (offer.escrowAmount == 0) {
        Property storage prop = properties[offer.propertyId];
        prop.owner = offer.buyer;
        prop.isListed = false;
        _removeActiveProperty(prop.id);
        
        // Record the transaction for both buyer and seller.
        userTransactions[offer.buyer].push(_offerId);
        userTransactions[seller].push(_offerId);
    }
    
    return true;
}


/// @notice Transfers a specified amount from the buyer to the seller.
/// @param buyer The address that will send the funds.
/// @param seller The address that will receive the funds.
/// @param amount The amount to be transferred.
function transferFunds(address payable buyer, address payable seller, uint256 amount) public returns (bool) {
    require(amount > 0, "Transfer amount must be greater than zero");
    require(buyer.balance >= amount, "Buyer has insufficient balance");

    (bool success, ) = seller.call{value: amount}("");
    require(success, "Transfer failed");

    return true;
}



    
    function getOffersForProperty(uint256 _propertyId) public view returns (uint256[] memory) {
        return propertyOffers[_propertyId];
    }
    
    function getBestOffer(uint256 _propertyId) public view returns (uint256 bestOfferId) {
        uint256[] memory offersForProperty = propertyOffers[_propertyId];
        uint256 highestPrice = 0;
        bestOfferId = 0;
        for (uint i = 0; i < offersForProperty.length; i++) {
            uint256 oId = offersForProperty[i];
            // Only consider offers in the initial BuyerFunded state
            if (offers[oId].offerPrice > highestPrice && offers[oId].status == OfferStatus.BuyerFunded) {
                highestPrice = offers[oId].offerPrice;
                bestOfferId = oId;
            }
        }
    }
    
    // ============================================================
    // USER TRANSACTION TRACKING & PAGINATION
    // ============================================================
    
    function getUserTransactions(address _user) public view returns (uint256[] memory) {
        return userTransactions[_user];
    }
    
    function getUserTransactionsPaginated(address _user, uint256 start, uint256 count) public view returns (uint256[] memory) {
        uint256[] storage txs = userTransactions[_user];
        require(start < txs.length, "Start index out of bounds");
        uint256 end = start + count;
        if (end > txs.length) {
            end = txs.length;
        }
        uint256[] memory paginated = new uint256[](end - start);
        for (uint256 i = start; i < end; i++) {
            paginated[i - start] = txs[i];
        }
        return paginated;
    }
}
// ============================================================ 