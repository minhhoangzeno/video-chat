import { useAppSelector } from "../../app/hooks";
import { GetAuthorConversation } from "../../app/reducers/Author/AuthorConversation.reducer";
import callIcon from "../../assets/icons/phone.png";
import videoIcon from "../../assets/icons/video.png";
import defaultPP from "../../images/avatar.png";
import "./index.css";
const AppBar = () => {
  const authorConservation = useAppSelector(GetAuthorConversation);
  let authorFriend = authorConservation.filter((el) => el.title === "Khách")[0];
  
  return (
    <div className="appBar">
      <div className="appBarLeft">
        <svg
          className="arrow"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="ArrowBackSharpIcon"
          fill="#b9bfd1"
        >
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
        </svg>
        <div>
          <label htmlFor="pp" className="ppLabel">
            <img
              src={authorFriend.avatar ? authorFriend.avatar : defaultPP}
              alt="ProfilePicture"
              className="ppImage"
            />
          </label>
        </div>
        <input
          className="nickname"
          disabled
          type={"text"}
          value={authorFriend.name}
        />
      </div>
      <div className="appBarRight">
        <img className="appBarIcons" src={videoIcon} alt="video" />
        <img className="appBarIcons" src={callIcon} alt="call" />
        
      </div>
    </div>
  );
};

export default AppBar;
