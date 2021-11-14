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

$(".check-btn").click(function () {
  var 이메일 = $("#email").val();
  var 패스워드 = $("#pw").val();

  firebase
    .auth()
    .signInWithEmailAndPassword(이메일, 패스워드)
    .then((result) => {
      console.log(result.user);
      //   window.location.href = "/public/index.html";

      //   $(".check >h2").html("My");
      //   $(".check_info>table").empty();
      //   $(".check_button").html("");
      //   $(".check_info>p").html("");

      db.collection("apply")
        .get()
        .then((res) => {
          console.log(res);
          res.forEach((doc) => {
            if (doc.data().email == 이메일) {
              console.log(doc.data());
              console.log(doc.id);

              window.location.href = `/subPage/mypage.html?id=${doc.id}`;

              //           let template = ` <table >
              //         <tr>
              //           <th> &#183 이름</th>
              //           <td><input value="${doc.data().name}" type="text" id="name"></td>
              //         </tr>
              //     <tr>
              //            <th>&#183 이메일</th>
              //           <td>

              //             <input  value="${doc.data().email}" type="text" id="email">

              //           </td>
              //         </tr>

              //         <tr>
              //            <th>&#183 등록일</th>
              //           <td>

              //             <input  value="${doc.data().date}" type="text" id="phone">

              //           </td>
              //         </tr>

              //         <tr>
              //           <th> &#183작품</th>
              //           <td><input type="text" value="${
              //             doc.data().fileName
              //           }" id="file"></td>
              //         </tr>

              //   </table>`;
              //           $(".check_info").append(template);
            }
          });
          console.log("apply 성공");
        });
    });
});
