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
