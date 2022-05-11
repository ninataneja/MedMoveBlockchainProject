pragma solidity 0.5.16;

contract Tracker {
    // Read/write package

    struct Item {
        uint id;
        string name;
        string origin;
        string destination;
        uint senstivityLevel;
        string currentLoc;
        string history;
        string lastUpdated;
    }

    struct Donation {
        uint id;
        string name;
        string origin;
        string destination;
        string currentLoc;
        string patient;
        string donor;
        string subtype;
    }


    struct Medicine {
        uint id;
        string name;
        string origin;
        string destination;
        string currentLoc;
        string lastUpdated;
        string units;
        string temperature;
    }

    struct Supply {
        uint id;
        string name;
        string origin;
        string destination;
        uint senstivityLevel;
        string currentLoc;
        string history;
        string units;
    }


    mapping(uint => Item) public Items;
    mapping(uint => Donation) public Donations;
    mapping(uint => Medicine) public Medicines;
    mapping(uint => Supply) public Supplies;
    mapping(address => bool) public users;

    uint public itemCount;
    uint public donationCount;
    uint public medicineCount;
    uint public supplyCount;

    function addItem (string memory _name, string memory _origin, string memory _destination, uint _sensitivity, string memory _currentLoc, string memory _history, string memory _lastUpdated) private {
        itemCount ++;
        Items[itemCount] = Item(itemCount, _name, _origin, _destination, _sensitivity, _currentLoc, _history, _lastUpdated);
    }
    function addDonation (string memory _name, string memory _origin, string memory _destination, string memory _currentLoc, string memory _patient, string memory _donor, string memory _subtype) private {
        donationCount ++;
        //string[] memory tempArr = new string[](0);
        Donations[donationCount] = Donation(donationCount, _name, _origin, _destination, _currentLoc, _patient, _donor, _subtype);
    }

    function addMedicine (string memory _name, string memory _origin, string memory _destination, string memory _currentLoc, string memory _lastUpdated, string memory _units, string memory _temperature) private {
        medicineCount ++;
        //string[] memory tempArr = new string[](0);
        Medicines[medicineCount] = Medicine(donationCount, _name, _origin, _destination, _currentLoc, _lastUpdated, _units, _temperature);
    }

    function addSupply (string memory _name, string memory _origin, string memory _destination, uint _sensitivity, string memory _currentLoc, string memory _history, string memory _units) private {
        supplyCount ++;
        //string[] memory tempArr = new string[](0);
        Supplies[supplyCount] = Supply(donationCount, _name, _origin, _destination, _sensitivity, _currentLoc, _history, _units);
    }

    function updateLocation (uint _itemId, string memory _newLoc) public {

        // require a valid item
        require(_itemId > 0 && _itemId <= itemCount);

        // record that user is authed
        users[msg.sender] = true;

        // update candidate vote Count
        Items[_itemId].currentLoc = _newLoc;
    }

    function updateMedLocation (uint _medId, string memory _newLoc) public {

        // require a valid item
        require(_medId > 0 && _medId <= medicineCount);

        // record that user is authed
        users[msg.sender] = true;

        // update candidate vote Count
        Medicines[_medId].currentLoc = _newLoc;
    }

    function updateSupLocation (uint _supId, string memory _newLoc) public {

        // require a valid item
        require(_supId > 0 && _supId <= supplyCount);

        // record that user is authed
        users[msg.sender] = true;

        // update candidate vote Count
        Supplies[_supId].currentLoc = _newLoc;
    }

    function updateDonLocation (uint _donId, string memory _newLoc) public {

        // require a valid item
        require(_donId > 0 && _donId <= donationCount);

        // record that user is authed
        users[msg.sender] = true;

        // update candidate vote Count
        Donations[_donId].currentLoc = _newLoc;
    }

    function updateMedTemp (uint _medId, string memory _temp) public {

        // require a valid item
        require(_medId > 0 && _medId <= medicineCount);

        // record that user is authed
        users[msg.sender] = true;

        // update candidate vote Count
        Medicines[_medId].temperature = _temp;
    }

    function updateMedUnits (uint _medId, string memory _units) public {

        // require a valid item
        require(_medId > 0 && _medId <= medicineCount);

        // record that user is authed
        users[msg.sender] = true;

        // update candidate vote Count
        Medicines[_medId].units = _units;
    }

    function updateSupUnits (uint _supId, string memory _units) public {

        // require a valid item
        require(_supId > 0 && _supId <= supplyCount);

        // record that user is authed
        users[msg.sender] = true;

        // update candidate vote Count
        Supplies[_supId].units = _units;
    }

    function updateSensitivity (uint _itemId, uint _newSensitivity) public {

        // require a valid item
        require(_itemId > 0 && _itemId <= itemCount);

        // record that user is authed
        users[msg.sender] = true;

        Items[_itemId].senstivityLevel = _newSensitivity;
    }

    function updateDestination (uint _itemId,string memory _newDestination) public {
        // require a valid item
        require(_itemId > 0 && _itemId <= itemCount);

        // record that user is authed
        users[msg.sender] = true;

        Items[_itemId].destination = _newDestination;
    }


    // Constructor
    constructor() public {
        addItem("Item 1", "Boston", "Tokyo", 3, "NYC", "Last in Rhode Island", "Updated by MedInc");
        addItem("Item 2", "Moscow", "Paris", 3, "London", "Last in Athens", "Updated by UNICEF");
        addDonation("Organ Donation 1", "LA", "NYC", "SF", "Patient 1234", "Donor 1234", "Kidney");
        addMedicine("Antituberculosis", "LA", "Tokyo", "Hawaii", "Last in Guam", "200", "100F");
        addSupply("Bandaids", "LA", "Beijing", 6, "NYC", "Last in Boston", "1000");
    }
}