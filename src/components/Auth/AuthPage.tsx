import { signInWithPopup } from "firebase/auth";
import Google from "../../icons/Google";
import "./AuthPage.css";
import { auth, provider } from "../../firebase/firebase";
import { UserType } from "../../types/types";
import { createUser } from "../../firebase/actions";
import { useToastContext, useUserContext } from "../../context";

const AuthPage = () => {
    const { addToast } = useToastContext();
    const { setUser } = useUserContext();

    const signInWithGoogle = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            const user: UserType = {
                userId: response.user.uid,
                username: response.user.displayName || "",
                email: response.user.email || "",
                profileImg: response.user.photoURL || "/defaultpfp.png",
            };
            await createUser(user).then(() => {
                addToast("Successfully logged in", 2000, "success");
                localStorage.setItem("userSession", JSON.stringify(user));
                setUser(user);
            });
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
