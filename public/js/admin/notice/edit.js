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

var 쿼리스트링 = new URLSearchParams(window.location.search);
쿼리스트링.get("id");

db.collection("notice")
  .doc(쿼리스트링.get("id"))
  .get()
  .then((result) => {
    console.log(result.data());

    $(".title").val(result.data().title);
    $(".content-text").val(result.data().content);
  });

$(".update").click(function (e) {
  e.preventDefault();
  console.log("djfjdhf");
  let title = $(".title").val();
  let content = $(".content-text").val();
  var 쿼리스트링 = new URLSearchParams(window.location.search);
  let file = document.querySelector("#file").files[0];
  let storageRef = storage.ref();
  let 저장할경로 = storageRef.child("notice/" + file.name);
  let 업로드작업 = 저장할경로.put(file);

  let fileValue = $("#file").val().split("\\");
  let fileName = fileValue[fileValue.length - 1];
  console.log("ddd", fileName);

  업로드작업.on(
    "state_changed",
    null,
    (error) => {
      console.error("실패사유는", error);
    },
    () => {
      업로드작업.snapshot.ref.getDownloadURL().then((url) => {
        console.log("업로드된 경로는", url);

        var 바꿀거 = {
          title,
          content,
          file: url,
          fileName,
          //   uid: JSON.parse(localStorage.getItem("user")).uid,
          //   name: JSON.parse(localStorage.getItem("user")).displayName,
        };
        db.collection("notice")
          .doc(쿼리스트링.get("id"))
          .update(바꿀거)
          .then((result) => {
            window.location.href =
              "/admin/notice/detail.html?id=" + 쿼리스트링.get("id");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  );
});
