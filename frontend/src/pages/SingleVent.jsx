import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingPage from "../components/Loading";
import author from "../assets/image.png";
import commentIcon from "../assets/comment.png";
import CommentModal from "../components/CommentModal";
import api from "../../api/vents";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SingleVent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [vent, setVent] = useState([]);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getVent = async () => {
      const response = await api.get(`/${id}`);
      const resData = response.data;
      setVent(resData.vent);
      console.log(resData);
      setIsLoading(false);
    };
    try {
      getVent();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const openCommentModal = () => {
    setIsSupportModalOpen(true);
  };

  const closeCommentModal = () => {
    setIsSupportModalOpen(false);
  };
  const calculateTimeElapsed = () => {
    const postDate = new Date(vent.createdAt);
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
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="blog bg-gradient-to-r from-[rgba(190,162,212,28%)] to-[rgba(255,206,160,28%)] px-3 py-6 rounded-3xl items-center m-4">
          <div className="flex px-3 py-3 flex-col order-last ml-3">
            <div className="flex-grow">
              <div className="title text-xl font-bold pt-4 text-justify">
                {vent.title}
              </div>
              <div
                className="detail justify-between py-4 text-justify"
                dangerouslySetInnerHTML={{ __html: vent.content }}
              ></div>
            </div>
            <div className="mt-auto">
              <hr className=" bg-gray-700 w-full h-1 mb-3" />
              <div className="flex justify-start">
                <img
                  src={commentIcon}
                  alt="comments"
                  className="h-6 px-1 cursor-pointer"
                  onClick={openCommentModal}
                />
                <div className="catagory bg-slate-400 px-2 py-1 rounded-lg">
                  {vent.category}
                </div>
                {isSupportModalOpen && (
                  <CommentModal onClose={closeCommentModal} id={id} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col flex-grow"></div>
      <Footer />
    </div>
  );
};

export default SingleVent;
