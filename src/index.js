import React, { useState } from "react";
import { render } from "react-dom";
import { storage } from "./firebase";
import ImgGallery from './ImgGallery'

const ReactFirebaseFileUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          });
      }
    );
  };


  var storageRef = storage.ref("images");
  let arr = [];
  // Now we get the references of these images
  storageRef.listAll().then(function (result) {
    result.items.forEach(function (imageRef) {
      // And finally display them

      displayImage(imageRef);
    });
  }).catch(function (error) {
    // Handle any errors
    console.log(error)
  });


  function displayImage(imageRef) {
    imageRef.getDownloadURL().then(function (url) {
      arr.push({
        src: url,
        width: 4,
        height: 3
      });
      // TODO: Display the image on the UI
      // console.log(arr)
    }).catch(function (error) {
      // Handle any errors
      console.log(error)
    });
  }



  return (
    <div>
      <progress value={progress} max="100" />
      <br />
      <br />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {url}
      <br />
      <img src={url || "http://via.placeholder.com/300"} alt="firebase-image" />
      <ImgGallery photos={arr} />
    </div>
  );

};

render(<ReactFirebaseFileUpload />, document.querySelector("#root"));
