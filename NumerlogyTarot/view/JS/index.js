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
  alert("test method in place");
  //the login method using the xmlHttpRequest
  //   var xmlHttpRequest = new XMLHttpRequest();
  //   //the handler when the request is ready
  //   xmlHttpRequest.onreadystatechange = function() {
  //     //ready and returned with the sources
  //     if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200) {
  //       var myArr = JSON.parse(xmlhttp.responseText);
  //       console.log(myArr);
  //     }
  //   };
  //   //variables to pass to the server
  //   var uname = document.getElementById("loguname").value;
  //   var pass = document.getElementById("logpass").value;

  //   var url = "../server.js";

  //   xmlhttp.open("POST", url, true, uname, pass); //true asynchronous
  //   xmlhttp.send();

  var data = {};
  data.title = "title";
  data.message = "message";

  $.ajax({
    type: "POST",
    data: {
      text: "message"
    },
    contentType: "application/json",
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
