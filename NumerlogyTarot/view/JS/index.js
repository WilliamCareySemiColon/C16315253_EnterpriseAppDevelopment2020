/**********************************************************************************************************
 * The login section of the index.html page for the button and other functionality handlers
 **********************************************************************************************************/
// $("#RegisterInsteadBtn").click(function () {
//   ClearLoginDetails();
//   $("#Register").show();
//   $("#Login").hide();
// });

$("#LoginClearBtn").click(function () {
  ClearLoginDetails();
});

$("#LoginBtn").click(function () {
  //variables to pass to the server
  var username = document.getElementById("loguname").value;
  var password = document.getElementById("logpass").value;

  var data = {
    username: username,
    password: password,
  };
  //ajax call to nake sure the user details are corrrect
  $.ajax({
    type: "POST",
    data: data,
    dataType: "json",
    url: "/checkuserdetails",
    success: function (data) {
      console.log(data.items[0]);
      //if the user does not exist
      if (data.items[0] === undefined) {
        alert("User with username does not exist");
      } //if the user exist
      else {
        var usernameparm = data.items[0].username;
        var passwordparm = data.items[0].password;
        //if the username and password requirement are acceptted
        if (username === usernameparm && password === passwordparm) {
          //redirect to the page desired
          window.location.replace("http://localhost:7777/login");
        } //if the username match but the username does not
        else if (username === usernameparm && password !== passwordparm) {
          alert("password entered is incorect for the user " + usernameparm);
        }
      }
    },
    error: function (data) {
      console.log("error\n\n");
      console.log(data);
    },
  }); //end ajax
});

//methods for clearing the fieids
function ClearLoginDetails() {
  document.getElementById("loguname").value = "";
  document.getElementById("logpass").value = "";
}

/************************************************************************************
 * The register buttons div section functionality
 ************************************************************************************/
//register button fields instead
// $("#LoginInsteadBtn").click(function () {
//   ClearRegisterDetails();
//   alert("login instead button clicked");
//   $("#Register").hide();
//   $("#Login").show();
// });

$("#RegisterClearBtn").click(function () {
  ClearRegisterDetails();
});

$("#RegisterBtn").click(function () {
  var fname = document.getElementById("fname").value;
  //if the middle name value is untouched, it is passed as a empty string
  var mname = document.getElementById("mname").value;
  var lname = document.getElementById("lname").value;
  var reguname = document.getElementById("reguname").value;
  //var email = document.getElementById("email").value;
  var DOB = document.getElementById("DOB").value;
  var regpass = document.getElementById("regpass").value;
  var conpass = document.getElementById("conpass").value;

  //method to validate the fields inputted by the user
  var flag = Validate(fname, lname, reguname, DOB, regpass, conpass);

  if (flag) {
    //converting the date object to the desired date
    var DOBDate = new Date(DOB);
    var day = DOBDate.getDate();
    var month = DOBDate.getMonth() + 1;
    var year = DOBDate.getFullYear();
    var DOBParameter = day + "/" + month + "/" + year;

    var data = {
      username: reguname,
      password: regpass,
    };

    console.log(data);

    var registerData = {
      username: reguname,
      fname: fname,
      mname: mname,
      lname: lname,
      DOB: DOBParameter,
      password: regpass,
    };

    //exterior ajax call to check if the user details already exist
    $.ajax({
      type: "POST",
      data: data,
      dataType: "json",
      url: "/checkuserdetails",
      success: function (data) {
        console.log(data.items[0]);
        //if the user does not exist
        if (data.items[0] === undefined) {
          //interior ajax call to register the user details
          $.ajax({
            type: "POST",
            data: registerData,
            dataType: "json",
            url: "/register",
            success: function (data) {
              console.log("success communcation " + data.items);
              //redirect to the page desired
              window.location.replace("http://localhost:7777/login");
            },
            error: function (data) {
              console.log("Failed in communcation");
            },
          }); //end inner ajax
        } //if the user exist
        else {
          alert(
            "user already exist with that username - please select a different username"
          );
        }
      },
      error: function (data) {
        console.log("error\n\n");
        console.log(data);
      },
    }); //end exterior ajax call
  }
});

function ClearRegisterDetails() {
  document.getElementById("fname").value = "";
  document.getElementById("mname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("reguname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("DOB").value = "yyyy-MM-dd";
  document.getElementById("regpass").value = "";
  document.getElementById("conpass").value = "";
}
//make sure the date picker is created when the file is ready
$(document).ready(function () {
  //to ensure the date picker is in the correct format
  $(".datepicker").datepicker({
    dateFormat: "dd/mm/yyyy",
    startDate: new Date(),
    maxDate: "now",
  });
});

//function to valiadate all the fields of the registration form
function Validate(firstname, lastname, reguname, DOB, regpass, conpass) {
  //regex strings
  var datere = /^[a-zA-Z]+$/;

  //http://regexlib.com/(X(1)A(LfhPFy1dGQ3hvH3PcsjaD7HVu3iHaA5imOvYnLx30Y8tEK-McG7D5hG4zEU3hgKGSYrWk9uJE3s7L8H3-S6DdFWcQPLjFQmtGo6Nmj9t3LYchpMVfR0BrNB80_YPDJ6EwU2NabSeMTch3Do_0VAtwgRLWKSahj7NUbfwB1cIRasu3lZFhN_ULvvWPHRPZJMN0))/REDetails.aspx?regexp_id=2799
  var passwordregex = /^(?=(.*[a-zA-Z].*){2,})(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,15}$/;

  if (firstname === "" || firstname === undefined) {
    alert("Firstname needs to be filled in correctly");
    return false;
  }

  if (lastname === "" || lastname === undefined) {
    alert("last name needs to be filled in correctly");
    return false;
  }

  if (reguname === "" || reguname === undefined || reguname.length < 6) {
    alert("username needs to be filled in properly in 6 or more characters");
    return false;
  }

  if (
    DOB === "" ||
    DOB === undefined ||
    //!datere.test(DOB) ||
    DOB.length !== 10
  ) {
    alert("Date of birth needs to be filled in correctly");
    return false;
  }

  if (
    regpass === "" ||
    regpass === undefined ||
    regpass.length < 8 ||
    regpass.length > 15 ||
    !passwordregex.test(regpass)
  ) {
    alert(
      "Password needs to be filled in correctly in, between 8 and 15 charaters," +
        "contain at least two letters (not case sensitive), one number, one special character"
    );
    return false;
  }

  if (regpass !== conpass) {
    alert("Password needs to be confirmed");
    return false;
  }

  return true;
}
