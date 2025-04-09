// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract LandRegistry is AccessControl {
    bytes32 public constant INSPECTOR_ROLE = keccak256("INSPECTOR_ROLE");

    // Offer status simplified to support the flow.
    enum OfferStatus { 
        BuyerFunded,      // Buyer submitted the offer with funds
        SellerAccepted,   // Seller has accepted the offer
        InspectorApproved,// Inspector approved; funds released & ownership transferred
        SellerRejected,   // Seller rejected the offer and funds refunded
        Cancelled         // Buyer cancelled before seller acceptance
    }

    // Basic property details.
    struct Property {
        uint256 id;
        address seller;
        address owner;
        bool isListed;
        uint256 askingPrice;
        string location;
    }

    // Offer holds the escrow funds from the buyer.
    struct Offer {
        uint256 id;
        uint256 propertyId;
        uint256 offerPrice; // funds held in escrow
        address buyer;
        OfferStatus status;
    }

    uint256 public propertyCount;
    uint256 public offerCount;

    mapping(uint256 => Property) public properties;
    // Each property can have multiple offers.
    mapping(uint256 => Offer[]) public propertyOffers;

    // --- EVENTS ---
    event PropertyListed(uint256 propertyId, address indexed seller);
    event OfferSubmitted(uint256 offerId, uint256 propertyId, address indexed buyer, uint256 offerPrice);
    event OfferCancelled(uint256 offerId, address indexed buyer);
    event SellerAcceptedOffer(uint256 offerId);
    event SellerRejectedOffer(uint256 offerId);
    event InspectorApprovedOffer(uint256 offerId);
    event FundsTransferred(uint256 offerId, address indexed seller, uint256 amount);

    constructor(address _inspector) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(INSPECTOR_ROLE, _inspector);
    }

    // --- PROPERTY FUNCTIONS ---

    // Seller lists a property.
    function listProperty(string calldata _location, uint256 _askingPrice) external {
        propertyCount++;
        properties[propertyCount] = Property({
            id: propertyCount,
            seller: msg.sender,
            owner: msg.sender,
            isListed: true,
            askingPrice: _askingPrice,
            location: _location
        });
        emit PropertyListed(propertyCount, msg.sender);
    }

    // --- OFFER & ESCROW FUNCTIONS ---

    // Buyer submits an offer by sending funds with the call.
    function submitOffer(uint256 _propertyId) external payable {
        Property storage prop = properties[_propertyId];
        require(prop.isListed, "Property not listed");
        require(msg.value > 0, "Must include funds");

        offerCount++;
        Offer memory newOffer = Offer({
            id: offerCount,
            propertyId: _propertyId,
            offerPrice: msg.value,
            buyer: msg.sender,
            status: OfferStatus.BuyerFunded
        });
        propertyOffers[_propertyId].push(newOffer);
        emit OfferSubmitted(offerCount, _propertyId, msg.sender, msg.value);
    }

    // Buyer cancels their offer before seller acceptance.
    function cancelOffer(uint256 _propertyId, uint256 _offerIndex) external {
        Offer storage offer = propertyOffers[_propertyId][_offerIndex];
        require(msg.sender == offer.buyer, "Not offer buyer");
        require(offer.status == OfferStatus.BuyerFunded, "Cannot cancel now");

        offer.status = OfferStatus.Cancelled;
        uint256 refund = offer.offerPrice;
        offer.offerPrice = 0;
        (bool success, ) = offer.buyer.call{value: refund}("");
        require(success, "Refund failed");
        emit OfferCancelled(offer.id, offer.buyer);
    }

    // Seller accepts an offer.
    function sellerAcceptOffer(uint256 _propertyId, uint256 _offerIndex) external {
        Property storage prop = properties[_propertyId];
        require(msg.sender == prop.seller, "Not property seller");
        Offer storage offer = propertyOffers[_propertyId][_offerIndex];
        require(offer.status == OfferStatus.BuyerFunded, "Offer not valid");
        offer.status = OfferStatus.SellerAccepted;
        emit SellerAcceptedOffer(offer.id);
    }

    // Seller rejects an offer and refunds the buyer.
    function sellerRejectOffer(uint256 _propertyId, uint256 _offerIndex) external {
        Property storage prop = properties[_propertyId];
        require(msg.sender == prop.seller, "Not property seller");
        Offer storage offer = propertyOffers[_propertyId][_offerIndex];
        require(offer.status == OfferStatus.BuyerFunded, "Offer not valid");
        offer.status = OfferStatus.SellerRejected;
        uint256 refund = offer.offerPrice;
        offer.offerPrice = 0;
        (bool success, ) = offer.buyer.call{value: refund}("");
        require(success, "Refund failed");
        emit SellerRejectedOffer(offer.id);
    }

    // Inspector approves an accepted offer, releasing funds to the seller and transferring ownership.
    function inspectorApproveOffer(uint256 _propertyId, uint256 _offerIndex) external onlyRole(INSPECTOR_ROLE) {
        Offer storage offer = propertyOffers[_propertyId][_offerIndex];
        Property storage prop = properties[_propertyId];
        require(offer.status == OfferStatus.SellerAccepted, "Offer not accepted");

        offer.status = OfferStatus.InspectorApproved;
        uint256 amount = offer.offerPrice;
        offer.offerPrice = 0;
        (bool success, ) = payable(prop.seller).call{value: amount}("");
        require(success, "Payment failed");

        // Finalize transfer.
        prop.owner = offer.buyer;
        prop.isListed = false;
        emit InspectorApprovedOffer(offer.id);
        emit FundsTransferred(offer.id, prop.seller, amount);
    }

    // --- VIEW FUNCTIONS ---

    // Get all offers for a property.
    function getOffers(uint256 _propertyId) external view returns (Offer[] memory) {
        return propertyOffers[_propertyId];
    }
}
