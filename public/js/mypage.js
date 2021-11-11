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
db.collection("apply")
  .doc(쿼리스트링.get("id"))
  .get()
  .then((result) => {
    console.log(result.data());
    $("#name").val(result.data().name);
    $("#email").val(result.data().email);
    $("#date").val(result.data().date);
    $("#file").val(result.data().fileName);
  });

$(".check-btn").click(function () {
  window.location.href =
    "/public/subPage/myedit.html?id=" + 쿼리스트링.get("id");
});
