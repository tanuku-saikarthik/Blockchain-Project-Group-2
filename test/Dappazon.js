const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Real Estate Contract", function () {
  let contract, owner, inspector, buyer, seller;

  beforeEach(async function () {
    [owner, inspector, buyer, seller] = await ethers.getSigners();

    const RealEstate = await ethers.getContractFactory("LandRegistry");
    contract = await RealEstate.deploy();
    await contract.deployed();

    // Assign inspector role
    const INSPECTOR_ROLE = await contract.INSPECTOR_ROLE();
    await contract.grantRole(INSPECTOR_ROLE, inspector.address);

    // Mock an offer
    await contract.createProperty("Property 1", ethers.utils.parseEther("10"));
    await contract.connect(seller).listProperty(0, ethers.utils.parseEther("10"));
    await contract.connect(buyer).makeOffer(0, ethers.utils.parseEther("10"), { value: ethers.utils.parseEther("10") });
    await contract.connect(seller).acceptOffer(0);
  });

  it("should allow inspector to approve offer and transfer funds", async function () {
    // Get initial balance of seller
    const initialSellerBalance = await ethers.provider.getBalance(seller.address);

    // Approve offer as inspector
    await expect(contract.connect(inspector).inspectorApproveOffer(0, buyer.address, seller.address))
      .to.emit(contract, "InspectorApprovedOffer")
      .withArgs(0)
      .to.emit(contract, "FundsTransferred")
      .withArgs(0, seller.address, ethers.utils.parseEther("10"));

    // Verify offer status
    const offer = await contract.offers(0);
    expect(offer.status).to.equal(2); // InspectorApproved

    // Verify seller received funds
    const finalSellerBalance = await ethers.provider.getBalance(seller.address);
    expect(finalSellerBalance.sub(initialSellerBalance)).to.equal(ethers.utils.parseEther("10"));

    // Verify property ownership transfer
    const property = await contract.properties(0);
    expect(property.owner).to.equal(buyer.address);
    expect(property.isListed).to.be.false;
  });

  it("should not allow non-inspector to approve offer", async function () {
    await expect(contract.connect(buyer).inspectorApproveOffer(0, buyer.address, seller.address))
      .to.be.revertedWith("Only inspector can approve");
  });

  it("should fail if the offer is not in SellerAccepted status", async function () {
    // Manually modify the offer status to something else
    await contract.connect(inspector).inspectorApproveOffer(0, buyer.address, seller.address);
    await expect(contract.connect(inspector).inspectorApproveOffer(0, buyer.address, seller.address))
      .to.be.revertedWith("Offer must be accepted by seller");
  });
});
