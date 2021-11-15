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

db.collection("notice")
  .doc(쿼리스트링.get("id"))
  .get()
  .then((result) => {
    console.log(result.data());
    $(".title").html(result.data().title);
    $(".content-text").html(result.data().content);

    $(".date").html(result.data().date);
    $(".fileName").html(result.data().fileName);
    $(".fileName").attr("href", result.data().file);
  });

$(".update").click(function (e) {
  e.preventDefault();
  console.log("dkfjdkf");
  window.location.href = "/admin/notice/edit.html?id=" + 쿼리스트링.get("id");
});
