import "./style.scss";
import add from "./images/add.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Sign_Up = () => {
  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "usersChat", res.user.uid), {});
            navigator("/");
          } catch (err) {
            console.log(err);
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-full-page">
      <div className="container-inner-box">
        <span className="logo">Chat Application</span>
        <span className="slogan">Create Account</span>
        <form onSubmit={handleSubmit}>
          <input placeholder="Username" type="text" className="toptop"></input>
          <input placeholder="Email" type="email"></input>
          <input placeholder="Password" type="password"></input>
          <input style={{ display: "none" }} type="file" id="file"></input>
          <label htmlFor="file">
            <img src={add}></img>
            <span className="text-add">Add an Image</span>
          </label>
          <button>Sign Up</button>
        </form>
        <p>
          Already have an Account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Sign_Up;
