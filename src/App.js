// import React, { useRef, useState } from 'react';
// import './App.css';
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyDJF6esjj2LKz1pL6KpyfWzJhnQA9Fypd4",
//   authDomain: "realtime-messaging-app-3c8aa.firebaseapp.com",
//   databaseURL: "https://realtime-messaging-app-3c8aa-default-rtdb.firebaseio.com",
//   projectId: "realtime-messaging-app-3c8aa",
//   storageBucket: "realtime-messaging-app-3c8aa.appspot.com",
//   messagingSenderId: "785021600887",
//   appId: "1:785021600887:web:91ab1db100f52f13067272",
//   measurementId: "G-3K0VVMYVPY"
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// // export default app;
// // import firebase from 'firebase/app';
// // import 'firebase/firestore';
// // import 'firebase/auth';
// // import 'firebase/analytics';



// // firebase.initializeApp({
// //   apiKey: "AIzaSyDJF6esjj2LKz1pL6KpyfWzJhnQA9Fypd4",
// //   authDomain: "realtime-messaging-app-3c8aa.firebaseapp.com",
// //   databaseURL: "https://realtime-messaging-app-3c8aa-default-rtdb.firebaseio.com",
// //   projectId: "realtime-messaging-app-3c8aa",
// //   storageBucket: "realtime-messaging-app-3c8aa.appspot.com",
// //   messagingSenderId: "785021600887",
// //   appId: "1:785021600887:web:91ab1db100f52f13067272",
// //   measurementId: "G-3K0VVMYVPY"
// // })

// // const auth = firebase.auth();
// // const firestore = firebase.firestore();


// function App() {

//   const [user] = useAuthState(auth);

//   return (
//     <div className="App">
//       <header>
//         <h1>⚛️🔥💬</h1>
//         <SignOut />
//       </header>

//       <section>
//         {user ? <ChatRoom /> : <SignIn />}
//       </section>

//     </div>
//   );
// }

// function SignIn() {

//   const signInWithGoogle = () => {
//     const provider = new app.auth.GoogleAuthProvider();
//     auth.signInWithPopup(provider);
//   }

//   return (
//     <>
//       <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
//       <p>Do not violate the community guidelines or you will be banned for life!</p>
//     </>
//   )

// }

// function SignOut() {
//   return auth.currentUser && (
//     <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
//   )
// }


// function ChatRoom() {
//   const dummy = useRef();
//   const messagesRef = app.collection('messages');
//   const query = messagesRef.orderBy('createdAt').limit(25);

//   const [messages] = useCollectionData(query, { idField: 'id' });

//   const [formValue, setFormValue] = useState('');


//   const sendMessage = async (e) => {
//     e.preventDefault();

//     const { uid, photoURL } = auth.currentUser;

//     await messagesRef.add({
//       text: formValue,
//       createdAt: app.firestore.FieldValue.serverTimestamp(),
//       uid,
//       photoURL
//     })

//     setFormValue('');
//     dummy.current.scrollIntoView({ behavior: 'smooth' });
//   }

//   return (<>
//     <main>

//       {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

//       <span ref={dummy}></span>

//     </main>

//     <form onSubmit={sendMessage}>

//       <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

//       <button type="submit" disabled={!formValue}>🕊️</button>

//     </form>
//   </>)
// }


// function ChatMessage(props) {
//   const { text, uid, photoURL } = props.message;

//   const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

//   return (<>
//     <div className={`message ${messageClass}`}>
//       <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='' />
//       <p>{text}</p>
//     </div>
//   </>)
// }


// export default App;
import React, { useRef, useState } from 'react';
import './App.css';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { query, orderBy, limit } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJF6esjj2LKz1pL6KpyfWzJhnQA9Fypd4",
  authDomain: "realtime-messaging-app-3c8aa.firebaseapp.com",
  databaseURL: "https://realtime-messaging-app-3c8aa-default-rtdb.firebaseio.com",
  projectId: "realtime-messaging-app-3c8aa",
  storageBucket: "realtime-messaging-app-3c8aa.appspot.com",
  messagingSenderId: "785021600887",
  appId: "1:785021600887:web:91ab1db100f52f13067272",
  measurementId: "G-3K0VVMYVPY"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);

function App() {
  const [user] = useAuthState(auth);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn signInWithGoogle={signInWithGoogle} />}
      </section>

    </div>
  );
}

function SignIn({ signInWithGoogle }) {
  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = collection(db, "messages");
  const q = query(messagesRef, orderBy("createdAt"), limit(25));

  // const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(q, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>🕊️</button>

    </form>
  </>)
}


function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt='' />
      <p>{text}</p>
    </div>
  </>)
}

export default App;