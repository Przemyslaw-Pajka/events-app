import $ from "jquery";
import "daterangepicker";
export let selectedDates = {
  startDate: {
    fullDate: null,
    day: null,
    month: null,
    year: null,
    dayOfWeek: null,
    monthName: null,
    monthShort: [],
  },
  endDate: {
    fullDate: null,
    day: null,
    month: null,
    year: null,
    dayOfWeek: null,
    monthName: null,
    monthShort: [],
  },
};
let monthNames = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];
export function datePicker() {
  $(document).ready(function () {
    var today = new Date();
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
    let todayDDMMYY = dd + "/" + mm + "/" + yyyy;

    $('input[name="date"]').daterangepicker(
      {
        minDate: todayDDMMYY,
        autoUpdateInput: false,
        locale: {
          format: "DD/MM/YYYY",
          separator: " - ",
          applyLabel: "Zatwierdź",
          cancelLabel: "Anuluj",
          fromLabel: "Od",
          toLabel: "Do",
          customRangeLabel: "Custom",
          weekLabel: "W",
          daysOfWeek: ["Nd", "Pn", "Wt", "Śr", "Cz", "Pt", "So"],
          monthNames: [
            "Styczeń",
            "Luty",
            "Marzec",
            "Kwiecień",
            "Maj",
            "Czerwiec",
            "Lipiec",
            "Sierpień",
            "Wrzesień",
            "Październik",
            "Listopad",
            "Grudzień",
          ],
          firstDay: 1,
        },
        startDate: this.todayDDMMYY,
        endDate: "05/04/2020",
      },
      function (start, end, label) {
        selectedDates.startDate.fullDate = start.format("DD/MM/YYYY");
        selectedDates.startDate.day = start.format("DD");
        selectedDates.startDate.month = start.format("MM");
        selectedDates.startDate.year = start.format("YYYY");
        selectedDates.startDate.date = start._d;

        selectedDates.endDate.fullDate = end.format("DD/MM/YYYY");
        selectedDates.endDate.day = end.format("DD");
        selectedDates.endDate.month = end.format("MM");
        selectedDates.endDate.year = end.format("YYYY");
        selectedDates.endDate.date = end._d;

        if (selectedDates.startDate.month[0] === 0) {
          selectedDates.startDate.monthName =
            monthNames[selectedDates.startDate.month[1] - 1];
        } else {
          selectedDates.startDate.monthName =
            monthNames[selectedDates.startDate.month - 1];
        }

        if (selectedDates.endDate.month[0] === 0) {
          selectedDates.endDate.monthName =
            monthNames[selectedDates.endDate.month[1] - 1];
        } else {
          selectedDates.endDate.monthName =
            monthNames[selectedDates.endDate.month - 1];
        }

        for (let i = 0; i < 3; i++) {
          selectedDates.startDate.monthShort[
            i
          ] = selectedDates.startDate.monthName[i].toUpperCase();
        }
      }
    );
    $(function () {
      $('input[name="date"]').on("apply.daterangepicker", function (
        ev,
        picker
      ) {
        $(this).val(
          picker.startDate.format("DD/MM/YYYY") +
            " - " +
            picker.endDate.format("DD/MM/YYYY")
        );
      });

      $('input[name="date"]').on("cancel.daterangepicker", function (
        ev,
        picker
      ) {
        $(this).val("");
      });
    });
  });
  //
}
