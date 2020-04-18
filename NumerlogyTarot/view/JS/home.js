$("#VistAccount").click(function () {
  window.location.replace("/ViewAccount.html");
});

$("#logout").click(function () {
  if (confirm("Logout of the application")) {
    //alert("hello world");
    $.ajax({
      type: "POST",
      url: "/logout",
      success: function () {
        window.location.replace("http://localhost:7777/");
      },
      error: function () {
        console.log("error in logout the account");
      },
    });
  }
});

var Storeddata = {};
$(document).ready(function () {
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/GetUserDetails",
    success: function (data) {
      //console.log(data);
      Storeddata = data.items;
      console.log(Storeddata);

      let divSection = document.getElementById("PersonalUserWelcomeMessageDiv");
      var personalHeader = document.createElement("h3");
      let headerText = document.createTextNode(
        Storeddata.firstname +
          ", your details for numerlogy and tarot are below"
      );
      personalHeader.appendChild(headerText);
      divSection.appendChild(personalHeader);
    },
    error: function (data) {
      console.log(data);
    },
  }); //end ajax call
});

/*The button handlers for the home page of the application itself*/
$("#LifepathBtn").click(function () {
  var stringDateObj = Storeddata.DOB.split("/");

  var numberArray = GetLifePathNumber(stringDateObj);

  var elementToDisplay = 0;

  for (var i = 0; i < numberArray.length; i++) {
    elementToDisplay += numberArray[i];
  }

  elementToDisplay = GetLifePathNumberFromDays(String(elementToDisplay));

  alert(elementToDisplay);
});

$("#ExpressionNumberBtn").click(function () {
  var name = Storeddata.firstname;

  var element = CalculateExpressionNumber(name);
  alert(element);
});

$("#SoulUrgeBtn").click(function () {
  var name = Storeddata.firstname;

  var element = CalculateWithVowels(name, true);
  alert(element);
});

$("#PersonalityNumberBtn").click(function () {
  var name = Storeddata.firstname;

  var element = CalculateWithVowels(name, false);
  alert(element);
});

$("#BirthdayNumberBtn").click(function () {
  var stringDateObj = Storeddata.DOB.split("/");

  elementToDisplay = GetLifePathNumberFromDays(stringDateObj[1]);

  alert(elementToDisplay);
});

//the life path number
function GetLifePathNumber(StringNumber) {
  var element = GetLifePathNumberFromDays(StringNumber[2]);

  return [
    GetLifePathNumberFromDays(StringNumber[0]),
    GetLifePathNumberFromDays(StringNumber[1]),
    element,
  ];
}

//the lifepath and the birthday number
function GetLifePathNumberFromDays(StringNumbersDays) {
  var regularNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33, 44, 55];

  if (regularNumbers.includes(Number(StringNumbersDays))) {
    return Number(StringNumbersDays);
  }

  var sumElement = 0;
  var LoopedElement = StringNumbersDays;

  do {
    var elementsArray = [];
    for (var i = 0; i < LoopedElement.length; i++) {
      elementsArray.push(Number(LoopedElement[i]));
      sumElement += elementsArray[i];
    }
    if (!regularNumbers.includes(sumElement)) {
      LoopedElement = String(sumElement);
      sumElement = 0;
    }
  } while (!regularNumbers.includes(sumElement));

  return sumElement;
}

//Pythagorean Alphabet for the expression number, soul urge and personality number
var PythagAlpSinglePoint = ["a", "j", "s"];
var PythagAlpDoublePoint = ["b", "k", "t"];
var PythagAlpTriplePoint = ["c", "l", "u"];
var PythagAlpFourthlyPoint = ["d", "m", "w"];
var PythagAlpFifthlyPoint = ["e", "n", "x"];
var PythagAlpSixthlyPoint = ["f", "o", "x"];
var PythagAlpSeventhlyPoint = ["g", "p", "y"];
var PythagAlpEightlyPoint = ["h", "q", "z"];
var PythagAlpNineltyPoint = ["i", "r"];
var vowels = ["a", "e", "i", "o", "u"];

//calculate the expresion number
function CalculateExpressionNumber(Name) {
  var loweredName = Name.toLowerCase();
  var nameCalc = 0;

  for (var i = 0; i < loweredName.length; i++) {
    if (PythagAlpSinglePoint.includes(loweredName[i])) {
      nameCalc += 1;
    }

    if (PythagAlpDoublePoint.includes(loweredName[i])) {
      nameCalc += 2;
    }

    if (PythagAlpTriplePoint.includes(loweredName[i])) {
      nameCalc += 3;
    }

    if (PythagAlpFourthlyPoint.includes(loweredName[i])) {
      nameCalc += 4;
    }

    if (PythagAlpFifthlyPoint.includes(loweredName[i])) {
      nameCalc += 5;
    }

    if (PythagAlpSixthlyPoint.includes(loweredName[i])) {
      nameCalc += 6;
    }

    if (PythagAlpSeventhlyPoint.includes(loweredName[i])) {
      nameCalc += 7;
    }

    if (PythagAlpEightlyPoint.includes(loweredName[i])) {
      nameCalc += 8;
    }

    if (PythagAlpNineltyPoint.includes(loweredName[i])) {
      nameCalc += 9;
    }
  }

  return GetLifePathNumberFromDays(String(nameCalc));
}

function CalculateWithVowels(Name, VowelsAllowed) {
  console.log(Name);
  var loweredName = Name.toLowerCase();
  var nameCalc = 0;

  for (var i = 0; i < loweredName.length; i++) {
    if (vowels.includes(loweredName[i]) == VowelsAllowed) {
      if (PythagAlpSinglePoint.includes(loweredName[i])) {
        nameCalc += 1;
      }

      if (PythagAlpDoublePoint.includes(loweredName[i])) {
        nameCalc += 2;
      }

      if (PythagAlpTriplePoint.includes(loweredName[i])) {
        nameCalc += 3;
      }

      if (PythagAlpFourthlyPoint.includes(loweredName[i])) {
        nameCalc += 4;
      }

      if (PythagAlpFifthlyPoint.includes(loweredName[i])) {
        nameCalc += 5;
      }

      if (PythagAlpSixthlyPoint.includes(loweredName[i])) {
        nameCalc += 6;
      }

      if (PythagAlpSeventhlyPoint.includes(loweredName[i])) {
        nameCalc += 7;
      }

      if (PythagAlpEightlyPoint.includes(loweredName[i])) {
        nameCalc += 8;
      }

      if (PythagAlpNineltyPoint.includes(loweredName[i])) {
        nameCalc += 9;
      }
    } //end if statement for checking with the vowels
  }

  return GetLifePathNumberFromDays(String(nameCalc));
}
