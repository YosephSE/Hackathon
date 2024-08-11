import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import commentIcon from "../assets/comment.png";
import liked from "../assets/like.png";
import notLiked from "../assets/like1.png";
import bookmarking from "../assets/bookmark.png";
import bookmarked from "../assets/bookmarked.png";

function Vent(props) {
  const [like, setLike] = useState(false);
  const [book, setBook] = useState(false);

  const navigate = useNavigate();
  const likeImg = like ? liked : notLiked;
  const toggleBook = () => {
    setBook((prevBook) => !prevBook);
  };

  const bookImg = book ? bookmarked : bookmarking;

  const calculateTimeElapsed = () => {
    const postDate = new Date(props.date);
    const milli = postDate.getTime();
    const now = new Date().getTime();
    const elapsed = now - milli;

    const months = Math.floor(elapsed / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

    if (months >= 1) {
      return `${months} month${months === 1 ? "" : "s"} ago`;
    } else if (days >= 1) {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    } else if (hours >= 1) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else if (minutes >= 1) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else if (seconds >= 1) {
      return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
    } else {
      return "Now";
    }
  };

  const diff = calculateTimeElapsed();

  const handleClick = () => {
    navigate(`/singlepost/${props.id}`);
  };
  return (
    <div
      onClick={handleClick}
      className="vent bg-gradient-to-r from-[rgba(190,162,212,28%)] to-[rgba(255,206,160,28%)] px-3 py-6 rounded-3xl items-center hover:shadow-lg hover:cursor-pointer "
    >
      <div className="ml-3">
        {/* <div className="date px-3">{diff}</div> */}

        <div>
          <div className="title text-xl font-bold pt-4 text-justify">
            {props.title}
          </div>
          <div
            className="detail justify-between py-4 text-justify"
            dangerouslySetInnerHTML={{ __html: props.body }}
          ></div>
        </div>
        <div>
          <hr className=" bg-gray-700 w-full h-1 mb-3" />
          <div className="flex">
            <img src={commentIcon} alt="comments" className="h-6 px-1" />
            <img
              src={bookImg}
              alt="Bookmark"
              className="h-7 px-1"
              onClick={toggleBook}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vent;
