import axios from "axios";
// ************************************************* *************************************************
export function postImageToImgur(imgContainer, setIsCircle) {
  return new Promise((resolve) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Client-ID f6e45a5e8c28826");

    var formdata = new FormData();
    formdata.append("image", imgContainer);

    var requestOptions = {
      method: "POST",
      baseURL: "https://api.imgur.com/3/image",
      headers: { Authorization: "Client-ID f6e45a5e8c28826" },
      body: formdata,
      redirect: "follow",
      onUploadProgress: (progressEvent) => {
        setIsCircle(true);
      },
    };
    const instanceAxios = axios.create({
      baseURL: "https://api.imgur.com/3/image",
    });
    // Alter defaults after instance has been created
    instanceAxios.defaults.headers.common["Authorization"] =
      "Client-ID f6e45a5e8c28826";
    instanceAxios
      .post("https://api.imgur.com/3/image", formdata, requestOptions)
      .then((response) => {
        setIsCircle(false);
        //saveDataForm(response.data.data.link);
        resolve(response.data.data.link);
        //props.eventModalHandler();
      })
      .catch((error) => console.log("error", error));
  });
}

// ************************************************* *************************************************
