import { signInWithPopup } from "firebase/auth";
import Google from "../../icons/Google";
import "./AuthPage.css";
import { auth, provider } from "../../firebase/firebase";

const AuthPage = () => {
    const signInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, provider);
            console.log(res.user);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className='auth-page'>
            <div className='container'>
                <h2>Hey there! Ready to get back to your notes?</h2>
                <p>Sign in to pick up where you left off!</p>
                <button className='signin-btn' onClick={signInWithGoogle}>
                    <Google size='20px' />
                    Sign in with Google
                </button>
            </div>
        </section>
    );
};

export default AuthPage;
