import { Auth } from "./Auth";
import "../styles/Header.css";

export const Header = ({ isInChat, auth }) => {
    return (
        <div className="header">
            <div className="header-container">
                <img src="https://i.ibb.co/SxRjgL0/main-logo-cropped.jpg" alt="main-logo-cropped" border="0" height={70} />
                <h1> Realtime Messaging App </h1>
                <Auth setIsInChat={isInChat} />
            </div>
        </div>
    );
};
