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

let register = document.querySelector(".register");
//동의함
$("#agree").click(function () {
  $("#agree").prop("checked", true);

  if ($("#agree").is(":checked") == true) {
    $(".register").click(function () {
      //유저정보
      let email = $("#email").val();
      let pw = $("#password").val();
      let name = $("#name").val();
      let birth = $("#birth").val();
      let address = $("#address").val();
      let detailAddress = $("#detailAddress").val();
      let phone = $("#phone").val();

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, pw)
        .then((result) => {
          let 유저정보 = {
            name,
            email,
            birth,
            address,
            detailAddress,
            phone,
          };
          db.collection("user").doc(result.user.uid).set(유저정보);

          console.log("유저");
          console.log(result);
          console.log(result.user);
          result.user.updateProfile({ displayName: name });
        });

      let file = document.querySelector("#file").files[0];
      let storageRef = storage.ref();
      let 저장할경로 = storageRef.child("file/" + file.name);
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
              email,
              name,
              date: new Date(),
              file: url,
              //   uid: JSON.parse(localStorage.getItem("user")).uid,
              //   name: JSON.parse(localStorage.getItem("user")).displayName,
            };
            db.collection("apply")
              .add(저장할거)
              .then((result) => {
                console.log(result);
                console.log("dfjdkfjkd");
                // window.location.href = "/index.html";
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      );
    });
  }
});
