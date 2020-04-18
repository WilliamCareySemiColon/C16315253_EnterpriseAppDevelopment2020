$("#VistAccount").click(function () {
  window.location.replace("/ViewAccount.html");
});

$("#logout").click(function () {
  if (confirm("Logout of the application")) {
    //alert("hello world");
    $.ajax({
      type: "POST",
      url: "/logout",
      success: function () {
        window.location.replace("http://localhost:7777/");
      },
      error: function () {
        console.log("error in logout the account");
      },
    });
  }
});
