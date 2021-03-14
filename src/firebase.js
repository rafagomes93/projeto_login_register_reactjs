import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyBniFOAHed3XGUIZI4mp7cQi0p-I60QXEc",
    authDomain: "system-e5c61.firebaseapp.com",
    databaseURL: "https://system-e5c61-default-rtdb.firebaseio.com",
    projectId: "system-e5c61",
    storageBucket: "system-e5c61.appspot.com",
    messagingSenderId: "901484519580",
    appId: "1:901484519580:web:683b5b4770b47a636a8d59",
    measurementId: "G-6Q1B5B90T9"
  };

class Firebase{
  constructor(){
  app.initializeApp(firebaseConfig);
  }

  login(email, password){
    return app.auth().signInWithEmailAndPassword(email, password)
  }

  async register(nome, email, password){
    await app.auth().createUserWithEmailAndPassword(email, password)

    const uid = app.auth().currentUser.uid;

    return app.database.ref('usuarios').child(uid).set({
      nome: nome
    })
  }

  isInitialized(){
    return new Promise(resolve => {
      app.auth().onAuthStateChanged(resolve);
    })
  }

  getCurrent(){
    return app.auth().currentUser && app.auth().currentUser.email;
  }
}

export default new Firebase();
