$("#Home").click(function () {
  window.location.replace("/home.html");
});

var Storeddata = {};
$(document).ready(function () {
  var fname = document.getElementById("fname");
  var mname = document.getElementById("mname");
  var lname = document.getElementById("lname");
  var reguname = document.getElementById("reguname");
  //var email = document.getElementById("email");
  var DOB = document.getElementById("DOB");
  var password = document.getElementById("password");

  $.ajax({
    type: "POST",
    dataType: "json",
    url: "/GetUserDetails",
    success: function (data) {
      //console.log(data.items);
      fname.value = data.items.firstname;
      mname.value = data.items.mname;
      lname.value = data.items.surname;
      reguname.value = data.items.username;
      DOB.value = data.items.DOB;
      password.value = data.items.password;
      Storeddata = data.items;
    },
    error: function (data) {
      console.log(data);
    },
  }); //end ajax call

  $(".datepicker").datepicker({
    dateFormat: "dd/mm/yyyy",
    startDate: new Date(),
    maxDate: "now",
  });
});

//the button handlers
$("#EditDetails").click(function () {
  SetFieldsDisabled(false);
});

$("#CancelEditing").click(function () {
  SetFieldsDisabled(true);
  RemoveChangesFromTextFields();
});

//the method handler to update the user details
$("#SubmitDetails").click(function () {
  var fname = document.getElementById("fname").value;
  var mname = document.getElementById("mname").value;
  var lname = document.getElementById("lname").value;
  var reguname = document.getElementById("reguname").value;
  var DOB = document.getElementById("DOB").value;
  var password = document.getElementById("password").value;

  var flag = Validate(fname, lname, DOB, password);
  if (flag) {
    var ParmDOB = ValidateDOB(DOB);

    data = {
      firstname: fname,
      middlename: mname,
      surname: lname,
      username: reguname,
      DOB: ParmDOB,
      password: password,
    };
    if (confirm("Are you sure you want to modify the details")) {
      $.ajax({
        type: "POST",
        data: data,
        dataType: "json",
        url: "/UpdateUserAccountDetails",
        success: function (data) {
          alert("Successfully modified the users details");
          console.log(data);
          Storeddata.firstname = data.items.name;
          Storeddata.mname = data.items.middlename;
          Storeddata.surname = data.items.surname;
          Storeddata.DOB = data.items.DOB;
          Storeddata.password = data.items.password;
          SetFieldsDisabled(true);
          RemoveChangesFromTextFields();
        },
        error: function (data) {
          console.log(data);
        },
      });
    }
  } else {
    alert("Fields were not modified correctly");
  }
});

//the method handler to allow the user to delete their account if they wish
$("#DeleteAccount").click(function () {
  if (confirm("are you sure you want to delete your account")) {
    data = {
      username: document.getElementById("reguname").value,
    };
    $.ajax({
      type: "POST",
      data: data,
      url: "/deleteAccount",
      success: function () {
        alert("Users details are successfully deleted");
        window.location.replace("http://localhost:7777/");
      },
      error: function () {
        console.log("error in deleting the account");
      },
    });
  }
});

//method to set the fields to disabled or not - triggered by two different buttons
function SetFieldsDisabled(Value) {
  document.getElementById("fname").disabled = Value;
  document.getElementById("mname").disabled = Value;
  document.getElementById("lname").disabled = Value;
  document.getElementById("DOB").disabled = Value;
  document.getElementById("password").disabled = Value;
  document.getElementById("CancelEditing").disabled = Value;
  document.getElementById("SubmitDetails").disabled = Value;
  document.getElementById("EditDetails").disabled = !Value;
}
//method to change the text to what is stored in the session, whther the user cancels the modifying details or submits them
function RemoveChangesFromTextFields() {
  document.getElementById("fname").value = Storeddata.firstname;
  document.getElementById("mname").value = Storeddata.mname;
  document.getElementById("lname").value = Storeddata.surname;
  document.getElementById("DOB").value = Storeddata.DOB;
  document.getElementById("password").value = Storeddata.password;
}

//function to valiadate all the fields of the registration form
function Validate(firstname, lastname, DOB, regpass) {
  //regex strings
  var datere = /^[a-zA-Z]+$/;
  var passwordregex = /^(?=(.*[a-zA-Z].*){2,})(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,15}$/;

  if (firstname === "" || firstname === undefined) {
    alert("Firstname needs to be filled in correctly");
    return false;
  }

  if (lastname === "" || lastname === undefined) {
    alert("last name needs to be filled in correctly");
    return false;
  }

  if (DOB !== Storeddata.DOB) {
    if (
      DOB === "" ||
      DOB === undefined ||
      //!datere.test(DOB) ||
      DOB.length !== 10
    ) {
      alert("Date of birth needs to be filled in correctly");
      return false;
    }
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

  return true;
}

//validate the DOB fields
function ValidateDOB(DOB) {
  if (DOB === Storeddata.DOB) {
    return DOB;
  } else {
    var DOBDate = new Date(DOB);
    var day = DOBDate.getDate();
    var month = DOBDate.getMonth() + 1;
    var year = DOBDate.getFullYear();
    var DOBParameter = day + "/" + month + "/" + year;

    return DOBParameter;
  }
}
