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
  alert("Hello world 2");
});

$("#SoulUrgeBtn").click(function () {
  alert("Hello world 3");
});

$("#PersonalityNumberBtn").click(function () {
  alert("Hello world 4");
});

$("#BirthdayNumberBtn").click(function () {
  var stringDateObj = Storeddata.DOB.split("/");

  elementToDisplay = GetLifePathNumberFromDays(stringDateObj[1]);

  alert(elementToDisplay);
});
//Pythagorean Alphabet
var PythagAlpSinglePoint = ["a", "j", "s"];
var PythagAlpDoublePoint = ["b", "k", "t"];
var PythagAlpTriplePoint = ["c", "l", "u"];
var PythagAlpFourthlyPoint = ["d", "m", "w"];
var PythagAlpFifthlyPoint = ["e", "n", "x"];
var PythagAlpSixthlyPoint = ["f", "o", "x"];
var PythagAlpSeventhlyPoint = ["g", "p", "y"];
var PythagAlpSeventhlyPoint = ["h", "q", "z"];
var PythagAlpSeventhlyPoint = ["i", "r"];
var vowels = ["a", "e", "i", "o", "u"];

function PythagoreanAlphabetCalculation(
  NameToCalculateFigureFrom,
  AllowConstants,
  AllowVowels
) {}

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
