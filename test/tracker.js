var Tracker = artifacts.require("./Tracker.sol");

contract("Tracker", function(accounts) {
  var trackerInstance;

  it("ITEMS: initializes Items with two items", function() {
    return Tracker.deployed().then(function(instance) {
      return instance.itemCount();
    }).then(function(count) {
      assert.equal(count, 2);
    });
  });

  it("ITEMS: it initializes the items with the correct values when they are added", function() {
    return Tracker.deployed().then(function(instance) {
      trackerInstance = instance;
      return trackerInstance.Items(1);
    }).then(function(item) {
      assert.equal(item[0], 1, "contains the correct id");
      assert.equal(item[1], "Item 1", "contains the correct name");
      assert.equal(item[2], "Boston", "contains the correct origin");
      return trackerInstance.Items(2);
    }).then(function(item) {
      assert.equal(item[0], 2, "contains the correct id");
      assert.equal(item[1], "Item 2", "contains the correct name");
      assert.equal(item[2], "Moscow", "contains the correct origin");
    });
  });

  it("ITEMS: allows a user to update current location", function() {
    return Tracker.deployed().then(function(instance) {
      trackerInstance = instance;
      packageId = 1;
      return trackerInstance.updateLocation(packageId, 'Dubai', { from: accounts[0] });
    }).then(function(receipt) {
      return trackerInstance.users(accounts[0]);
    }).then(function(voted) {
      assert(voted, "the user was marked as voted");
      return trackerInstance.Items(packageId);
    }).then(function(item) {
      var newLocation = item[5];
      assert.equal(newLocation, 'Dubai', "updated location correctly");
    })
  });

  it("ITEMS: allows a user to change sensitivity", function() {
    return Tracker.deployed().then(function(instance) {
      trackerInstance = instance;
      packageId = 1;
      return trackerInstance.updateSensitivity(packageId, 6, { from: accounts[0] });
    }).then(function(receipt) {
      return trackerInstance.users(accounts[0]);
    }).then(function(voted) {
      assert(voted, "the user was marked as voted");
      return trackerInstance.Items(packageId);
    }).then(function(item) {
      var newSensitivity = item[4];
      assert.equal(newSensitivity, 6, "updated sensitivity correctly");
    })
  });

  it("ITEMS: allows a user to change destination", function() {
    return Tracker.deployed().then(function(instance) {
      trackerInstance = instance;
      packageId = 1;
      return trackerInstance.updateDestination(packageId, 'Texas', { from: accounts[0] });
    }).then(function(receipt) {
      return trackerInstance.users(accounts[0]);
    }).then(function(voted) {
      assert(voted, "the user was marked as voted");
      return trackerInstance.Items(packageId);
    }).then(function(item) {
      var newDestination = item[3];
      assert.equal(newDestination, 'Texas', "updated destination correctly");
    })
  });

  it("MEDICINES: allows a user to update current location", function() {
    return Tracker.deployed().then(function(instance) {
      trackerInstance = instance;
      packageId = 1;
      return trackerInstance.updateMedLocation(packageId, 'Dubai', { from: accounts[0] });
    }).then(function(receipt) {
      return trackerInstance.users(accounts[0]);
    }).then(function(voted) {
      assert(voted, "the user was marked as voted");
      return trackerInstance.Medicines(packageId);
    }).then(function(medicine) {
      var newLocation = medicine[4];
      assert.equal(newLocation, 'Dubai', "updated location correctly");
    })
  });

  it("MEDICINES: allows a user to change unit number", function() {
    return Tracker.deployed().then(function(instance) {
      trackerInstance = instance;
      packageId = 1;
      return trackerInstance.updateMedUnits(packageId, "500", { from: accounts[0] });
    }).then(function(receipt) {
      return trackerInstance.users(accounts[0]);
    }).then(function(voted) {
      assert(voted, "the user was marked as voted");
      return trackerInstance.Medicines(packageId);
    }).then(function(medicine) {
      var newUnits = medicine[6];
      assert.equal(newUnits, "500", "updated location correctly");
    })
  });

  it("MEDICINES: allows a user to change medicine temperature", function() {
    return Tracker.deployed().then(function(instance) {
      trackerInstance = instance;
      packageId = 1;
      return trackerInstance.updateMedTemp(packageId, "43F", { from: accounts[0] });
    }).then(function(receipt) {
      return trackerInstance.users(accounts[0]);
    }).then(function(voted) {
      assert(voted, "the user was marked as voted");
      return trackerInstance.Medicines(packageId);
    }).then(function(medicine) {
      var newTemp = medicine[7];
      assert.equal(newTemp, "43F", "updated location correctly");
    })
  });

  it("SUPPLIES: allows a user to update current location", function() {
    return Tracker.deployed().then(function(instance) {
      trackerInstance = instance;
      packageId = 1;
      return trackerInstance.updateSupLocation(packageId, 'Dubai', { from: accounts[0] });
    }).then(function(receipt) {
      return trackerInstance.users(accounts[0]);
    }).then(function(voted) {
      assert(voted, "the user was marked as voted");
      return trackerInstance.Supplies(packageId);
    }).then(function(supply) {
      var newLocation = supply[5];
      assert.equal(newLocation, 'Dubai', "updated location correctly");
    })
  });

  it("SUPPLIES: allows a user to update units", function() {
    return Tracker.deployed().then(function(instance) {
      trackerInstance = instance;
      packageId = 1;
      return trackerInstance.updateSupUnits(packageId, '2000', { from: accounts[0] });
    }).then(function(receipt) {
      return trackerInstance.users(accounts[0]);
    }).then(function(voted) {
      assert(voted, "the user was marked as voted");
      return trackerInstance.Supplies(packageId);
    }).then(function(supply) {
      var newUnits = supply[7];
      assert.equal(newUnits, '2000', "updated location correctly");
    })
  });

  it("DONATIONS: allows a user to update current location", function() {
    return Tracker.deployed().then(function(instance) {
      trackerInstance = instance;
      packageId = 1;
      return trackerInstance.updateDonLocation(packageId, 'Singapore', { from: accounts[0] });
    }).then(function(receipt) {
      return trackerInstance.users(accounts[0]);
    }).then(function(voted) {
      assert(voted, "the user was marked as voted");
      return trackerInstance.Donations(packageId);
    }).then(function(donation) {
      var newLoc = donation[4];
      assert.equal(newLoc, 'Singapore', "updated location correctly");
    })
  });

});
