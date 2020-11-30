import firebase from "firebase/app";

export default {
  actions: {
    // eslint-disable-next-line no-unused-vars
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);

        // set data to database
        // const uid = dispatch("getUid");
        // await firebase
        //   .database()
        //   .ref(`/users/${uid}/info`)
        //   .set({
        //     email,
        //     name: "dafaultName",
        //     position: "manager"
        //   });
      } catch (e) {
        commit("setError", e);
        console.log(e);
        throw e;
      }
    },
    // getUid() {
    //   const user = firebase.auth().currentUser;
    //   console.log(user);
    //   return user ? user.uid : null;
    // },
    getEmail() {
      const user = firebase.auth().currentUser;
      return user ? user.email : null;
    },
    async logout() {
      await firebase.auth().signOut();
    }
  }
};
