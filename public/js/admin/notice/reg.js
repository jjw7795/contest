function fileInputClick() {
  let e = this.event.target;
  let fileInput = e.parentElement.previousElementSibling;
  const fileTrigger = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  fileInput.dispatchEvent(fileTrigger);
  fileInput.addEventListener("change", (e) => {
    let fileTxt = fileInput.value;
    let fileTxtIndex = fileTxt.lastIndexOf("\\") + 1;
    fileTxt = fileTxt.slice(fileTxtIndex);
    let fileReadTxt = e.target.nextElementSibling.querySelector(".attach-read");
    fileReadTxt.value = fileTxt;
  });
}
const firebaseConfig = {
  apiKey: "AIzaSyC_Fgl3NBChCxP6zVQB6hdNHk2pIGyK1y0",
  authDomain: "contest-fba51.firebaseapp.com",
  projectId: "contest-fba51",
  storageBucket: "contest-fba51.appspot.com",
  messagingSenderId: "946889850549",
  appId: "1:946889850549:web:ddb1cf8f9e62ccc73cc8fc",
  measurementId: "G-YDFGEM94YS",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

$(".regi").click(function (e) {
  e.preventDefault();
  let title = $(".title").val();
  let content = $(".content-text").val();
  let fileValue = $(".attach-input").val().split("\\");
  let fileName = fileValue[fileValue.length - 1];

  //   var 저장할 = {
  //     title,
  //     content,

  //     date: new Date().toLocaleString(),

  //     //   uid: JSON.parse(localStorage.getItem("user")).uid,
  //     //   name: JSON.parse(localStorage.getItem("user")).displayName,
  //   };
  //   db.collection("notice")
  //     .add(저장할)
  //     .then((result) => {
  //       window.location.href = "/public/admin/notice/list.html";
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  let file = document.querySelector(".attach-input").files[0];
  let storageRef = storage.ref();
  let 저장할경로 = storageRef.child("notice/" + file.name);
  let 업로드작업 = 저장할경로.put(file);

  업로드작업.on(
    "state_changed",
    null,
    (error) => {
      console.error("실패사유는", error);
    },
    () => {
      업로드작업.snapshot.ref.getDownloadURL().then((url) => {
        console.log("업로드된 경로는", url);

        var 저장할거 = {
          title,
          content,
          date: new Date().toLocaleString(),
          file: url,
          fileName,

          //   uid: JSON.parse(localStorage.getItem("user")).uid,
          //   name: JSON.parse(localStorage.getItem("user")).displayName,
        };
        db.collection("notice")
          .add(저장할거)
          .then((result) => {
            window.location.href = "/admin/notice/list.html";
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  );
});
