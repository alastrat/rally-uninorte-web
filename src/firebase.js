import app from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDCW0E6PMZ8JO0SkcVYLtGIW_586vZq68U",
  authDomain: "uninorte-rally-app.firebaseapp.com",
  databaseURL: "https://uninorte-rally-app.firebaseio.com",
  projectId: "uninorte-rally-app",
  storageBucket: "",
  messagingSenderId: "431581003996"
};

export default class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
  }

  checkAuthState = callback => {
    return this.auth.onAuthStateChanged(callback);
  }

  signInWithEmailAndPassword = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  signOut = () => this.auth.signOut();

}