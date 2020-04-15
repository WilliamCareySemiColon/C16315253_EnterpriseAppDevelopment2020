//The login button fields
$("#RegisterInsteadBtn").click(function() {
  ClearLoginDetails();
  $("#Register").show();
  $("#Login").hide();
});

$("#LoginClearBtn").click(function() {
  ClearLoginDetails();
});

$("#LoginBtn").click(function() {
  //variables to pass to the server
  var username = document.getElementById("loguname").value;
  var password = document.getElementById("logpass").value;

  var data = {
    username: username,
    password: password
  };

  $.ajax({
    type: "POST",
    data: data,
    dataType: "json",
    url: "/endpoint",
    success: function(data) {
      console.log("success");
      console.log(JSON.stringify(data));
    },
    error: function(data) {
      console.log(data);
    }
  });
});

//register button fields instead
$("#LoginInsteadBtn").click(function() {
  ClearRegisterDetails();
  $("#Login").show();
  $("#Register").hide();
});

$("#RegisterClearBtn").click(function() {
  ClearRegisterDetails();
});

$("#RegisterBtn").click(function() {
  alert("test method for now");
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
