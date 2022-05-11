App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Tracker.json", function(tracker) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Tracker = TruffleContract(tracker);
      // Connect provider to interact with contract
      App.contracts.Tracker.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
    var trackerInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Tracker.deployed().then(function(instance) {
      trackerInstance = instance;
      return trackerInstance.itemCount();
    }).then(function(itemCount) {
      var itemsResults = $("#itemsResults");
      itemsResults.empty();

      var medResults = $("#medResults");
      medResults.empty();

      var itemsSelect = $('#itemsSelect');
      itemsSelect.empty();

      var loc = $('#loc');
      loc.empty();

      for (var i = 1; i <= itemCount; i++) {
        trackerInstance.Items(i).then(function(item) {
          var id = item[0];
          var name = item[1];
          var origin = item[2];
          var destination = item[3];
          var sensitivity = item[4];
          var location = item[5];
          var history = item[6];
          var lastUpdated = item[7];

          // Render candidate Result
          var itemTemplate = "<tr><th>" + id + "</th><td>" + name + "</th><td>" + origin + "</th><td>" + destination + "</th><td>" + sensitivity + "</th><td>" + location + "</th><td>" + history + "</td><td>" + lastUpdated;
          itemsResults.append(itemTemplate);

          // Render items select option
          var itemOption = "<option value'" + id + "' >" + name + "</ option>"
          itemsSelect.append(itemOption);
        });
      }

      // for (var j = 1; j <= medCount; j++) {
      //   trackerInstance.Medicines(j).then(function(medicine) {
      //     var id = medicine[0];
      //     var name = medicine[1];
      //     var origin = medicine[2];
      //     var destination = medicine[3];
      //     var location = medicine[4];
      //     var lastUpdated = medicine[5];
      //     var units = medicine[6];
      //     var temperature = medicine[7];

      //     // Render candidate Result
      //     var medTemplate = "<tr><th>" + id + "</th><td>" + name + "</th><td>" + origin + "</th><td>" + destination + "</th><td>" + location + "</th><td>" + lastUpdated + "</th><td>" + units + "</td><td>" + temperature;
      //     medResults.append(medTemplate);


      //     // Render items select option
      //     // var itemOption = "<option value'" + id + "' >" + name + "</ option>"
      //     // itemsSelect.append(itemOption);
      //   });
      // }
      return trackerInstance.users(App.account);
    }).then(function(hasVoted) {
      if (hasVoted) {
        $('form').hide();
      }
    
    loader.hide();
    content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

  changeLocation: function() {
    var itemId = $('#itemsSelect').val();
    var newLoc = $('#loc').val();
    console.log(newLoc);
    App.contracts.Tracker.deployed().then(function(instance) {
      return instance.updateLocation(itemId, newLoc,{ from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});