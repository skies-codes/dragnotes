import { useUserContext } from "../../context";
import "./UserProfile.css";

const UserProfile = () => {
    const { user, setUser } = useUserContext();

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <button className='user-profile' onClick={handleLogout}>
            <img
                src={user ? user.profileImg : "/defaultpfp.png"}
                alt='user-profile-img'
            />
            <span className='tooltip-text'>Click to logout</span>
        </button>
    );
};

export default UserProfile;
