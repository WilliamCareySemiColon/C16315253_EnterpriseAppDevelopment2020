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

  var flag = Validate(fname, lname, reguname, email, DOB, regpass, conpass);

  if (flag) {
    //converting the date object to the desired date
    var DOBDate = new Date(DOB);
    var day = DOBDate.getDate();
    var month = DOBDate.getMonth() + 1;
    var year = DOBDate.getFullYear();
    var DOBParameter = day + "/" + month + "/" + year;

    //console.log(DOBParameter);

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
      DOB: DOBParameter,
      password: regpass,
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
          //implement the register details later
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
    }); //end ajax
  }
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
//to ensure the date picker is in the correct format
$(".datepicker").datepicker({
  dateFormat: "dd/mm/yyyy",
  startDate: new Date(),
  maxDate: "now",
});

//function to valiadate all the fields of the registration form
function Validate(firstname, lastname, reguname, email, DOB, regpass, conpass) {
  //regex strings
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var datere = /^[a-zA-Z]+$/;

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

  if (email === "" || !re.test(email) || email.length < 14) {
    alert("Email needs to be filled in correctly in 14 or more characters");
    return false;
  }

  if (
    DOB === "" ||
    DOB === undefined ||
    !datere.test(DOB) ||
    DOB.length !== 9
  ) {
    alert("Date of birth needs to be filled in correctly");
    return false;
  }

  if (regpass === "" || regpass === undefined || regpass.length < 8) {
    alert("Password needs to be filled in correctly in 8 or more charaters");
    return false;
  }

  if (regpass === conpass) {
    alert("Password needs to be confirmed");
    return false;
  }

  return true;
}
