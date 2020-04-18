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
