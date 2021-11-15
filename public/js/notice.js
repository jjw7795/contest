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

let n = 1;
db.collection("notice")
  .get()
  .then((res) => {
    console.log(res);
    res.forEach((doc) => {
      console.log(doc.data());

      let 템플릿 = `<tr>
                <td>${n++}</td>
                
            
                <td><a href="/public/subPage/notice-detail.html?id=${
                  doc.id
                }"> ${doc.data().content}</a></td>
                <td>${doc.data().date}</td>

              
               
              </tr>
            `;
      $(".tbody").append(템플릿);
    });
  });
