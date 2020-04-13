//The login button fields
$("#RegisterInsteadBtn").click(function() {
  $("#Register").show();
  $("#Login").hide();
});

$("#RegisterClearBtn").click(function() {
  document.getElementById("fname").value = "";
  document.getElementById("mname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("reguname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("DOB").value = "yyyy-MM-dd";
  document.getElementById("regpass").value = "";
  document.getElementById("conpass").value = "";
});

$("#LoginBtn").click(function() {
  alert("test method in place");
});

//register button fields instead
$("#LoginInsteadBtn").click(function() {
  $("#Login").show();
  $("#Register").hide();
});

$("#LoginClearBtn").click(function() {
  document.getElementById("loguname").value = "";
  document.getElementById("logpass").value = "";
});

$("#RegisterBtn").click(function() {
  alert("test method for now");
});
