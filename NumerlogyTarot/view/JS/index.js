//The login button fields
$("#RegisterInsteadBtn").click(function () {
  ClearLoginDetails();
  $("#Register").show();
  $("#Login").hide();
});

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

//register button fields instead
$("#LoginInsteadBtn").click(function () {
  ClearRegisterDetails();
  $("#Login").show();
  $("#Register").hide();
});

$("#RegisterClearBtn").click(function () {
  ClearRegisterDetails();
});

$("#RegisterBtn").click(function () {
  var fname = document.getElementById("fname").value;
  //if the middle name value is untouched, it is passed as a empty string
  var mname = document.getElementById("mname").value;
  var lname = document.getElementById("lname").value;
  var reguname = document.getElementById("reguname").value;
  var email = document.getElementById("email").value;
  var DOB = document.getElementById("DOB").value;
  var regpass = document.getElementById("regpass").value;
  var conpass = document.getElementById("conpass").value;

  //alert("test method for now");
  var data = {
    username: reguname,
    password: regpass,
  };

  var registerData = {
    username: reguname,
    fname: fname,
    mname: mname,
    lname: lname,
    email: email,
    DOB: DOB,
    password: regpass,
  };

  //format: yyyy-MM-dd
  console.log(DOB);

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
        //implement the register details later
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
  }); //end ajax
});

//methods for clearing the fieids
function ClearLoginDetails() {
  document.getElementById("loguname").value = "";
  document.getElementById("logpass").value = "";
}

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

$(".datepicker").datepicker({
  dateFormat: "mm/dd/yyyy",
  startDate: new Date(),
  maxDate: "now",
});
