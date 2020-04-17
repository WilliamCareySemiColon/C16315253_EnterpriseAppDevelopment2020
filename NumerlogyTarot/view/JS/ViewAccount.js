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
    },
    error: function (data) {
      console.log(data);
    },
  });
});

//the button handlers
$("#EditDetails").click(function () {
  SetFieldsDisabled(false);
});

$("#CancelEditing").click(function () {
  SetFieldsDisabled(true);
});

$("#SubmitDetails").click(function () {
  alert("Hello World");
});

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
