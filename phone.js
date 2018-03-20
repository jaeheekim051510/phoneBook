const readline = require('readline');
var fs = require('fs');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var aData = [];


var newData = function(firstName, lastName, phoneNumber) {
    var newEntry = {};
    newEntry.firstName = firstName;
    newEntry.lastName = lastName;
    newEntry.phoneNumber = phoneNumber;
    aData.push(newEntry);
}


var question = function() {
    rl.question("=====================\n1.Look up and entry\n2.Set an entry\n3.Delete an entry\n4.List all entries\n5.Quit\n=====================\nWhat do you want to to (1-5)? ", function (answer) {
        if (answer === "1") {
            lookUpEntry();
        }
        else if (answer === "2") {
            setEntry();
        }
        else if (answer === "3") {
            console.log('3');
        }
        else if (answer === "4") {
            listData();
        }
        else if (answer === "5") {
            console.log('Thank you!');
            rl.close();
        }

        else {
            console.log('please type corret entry.')
            question();
        }
    });
};

var lookUpEntry = function() {
    rl.question("First Name: ", function(firstName) {
    var firstName = firstName.toUpperCase();
    rl.question("Last Name: ", function(lastName) {
        var lastName = lastName.toUpperCase();
        for (var x in aData) {
            if (firstName === aData[x]["firstName"] && lastName === aData[x]["lastName"]) {
                console.log(`***Entry Found***\nName: ${firstName} ${lastName}\nPhonenumber: ${aData[x]["phoneNumber"]}`);
                question();
            }
        }
    });
});
};


var setEntry = function() { 
    rl.question("First Name: ", function(firstName) {
    var firstName = firstName.toUpperCase();
    rl.question("Last Name: ", function(lastName) {
        var lastName = lastName.toUpperCase();
        rl.question("phoneNumber(000-000-0000): ", function(phoneNumber){
            newData(firstName, lastName, phoneNumber);
            saveData();
            console.log(`${firstName} ${lastName}'s phone number has been saved.`);
            question();
        });
    });
});
};

var saveData = function() {
    fs.writeFile('contact.txt', JSON.stringify(aData), function(err) {
        if (err) {
        console.log('err');
        };
    });
};

var listData = function() {
    fs.readFile('contact.txt', 'utf8', function(err, fileContents){
        if (err) {
            console.log('error')
        }
        else {
            console.log(fileContents);
            question();
            }
    });
};

var listAllEntry = function () {
    for (var x in aData) {
        console.log(`Name: ${aData[x]["firstName"]} ${aData[x]["lastName"]}, Phone Number: ${aData[x]["phoneNumber"]}`)
    };
    question();
}

question();
