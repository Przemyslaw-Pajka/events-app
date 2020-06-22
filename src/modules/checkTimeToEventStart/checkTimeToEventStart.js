import React from "react";
export function checkTimeToEventStart(differenceInDays, endDate) {
  let today = new Date();
  const textToHTML = (text) => {
    return <div dangerouslySetInnerHTML={{ __html: text }} />;
  };
  if (differenceInDays == 1) {
    return textToHTML(`Rozpoczyna się <span>jutro !</span>`);
  } else if (differenceInDays > 1) {
    return textToHTML(
      `Rozpoczyna się za: <span>${differenceInDays} dni</span>`
    );
  } else if (differenceInDays == 0) {
    return textToHTML(`Rozpoczyna się już <span>dzisiaj</span>`);
  } else if (differenceInDays < 0 && new Date(endDate) >= today) {
    return textToHTML(`<span>Wydarzenie trwa!</span>`);
  } else if (new Date(endDate) <= today) {
    return textToHTML(`<span>Wydarzenie zakończyło się!</span>`);
  }
}
