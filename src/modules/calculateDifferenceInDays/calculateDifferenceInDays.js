export function calculateDifferenceInDays(startDate) {
  var today = new Date();

  var dateToday = new Date(today);

  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = mm + "/" + dd + "/" + yyyy;

  dateToday = new Date(today);
  const dateStartEvent = new Date(startDate);
  const Difference_In_Time = dateStartEvent.getTime() - dateToday.getTime();
  const Difference_In_Days = (Difference_In_Time / (1000 * 3600 * 24)).toFixed(
    0
  );
  return Difference_In_Days;
}
