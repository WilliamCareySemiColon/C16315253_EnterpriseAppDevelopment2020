$("#VistAccount").click(function () {
  window.location.replace("/ViewAccount.html");
});

$("#Home").click(function () {
  window.location.replace("/home.html");
});

$(".datepicker").datepicker({
  dateFormat: "dd/mm/yyyy",
  startDate: new Date(),
  maxDate: "now",
});
