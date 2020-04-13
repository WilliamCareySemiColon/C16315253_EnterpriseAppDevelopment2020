$("#login").click(function() {
  alert("Hello world");
});

//The login button fields
$("#RegisterInsteadBtn").click(function() {
  $("#Register").show();
  $("#Login").hide();
});

////register fields instead
$("#LoginInsteadBtn").click(function() {
  $("#Login").show();
  $("#Register").hide();
});

$("#LoginClearBtn").click(function() {
  document.getElementById("loguname").value = "";
  document.getElementById("logpass").value = "";
});
// $("#Register")

// $("#Login")
