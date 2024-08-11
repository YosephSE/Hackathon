import React, { useEffect, useState } from "react";
import Vent from "../components/Vent";
import Header from "../components/Header";
import Chatbot from "../components/Chatbot";
import Footer from "../components/Footer";
import api from "../../api/vents";
import LoadingPage from "../components/Loading";

const VentsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [vents, setVents] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    const getVents = async () => {
      try {
        const response = await api.get("/");
        const resData = response.data;
        setVents(resData);
        setSearch(resData);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch vents", error);
        setIsLoading(false);
      }
    };
    getVents();
  }, []);
  console.log(search);
  return (
    <div className="flex flex-col min-h-screen">
      <Header page="Blogs" data={vents} dataChange={setSearch} />
      <Chatbot />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="flex-grow">
          <div className="blogs grid grid-cols-1 sm:grid-cols-2 gap-4 px-2 md:px-8 md:py-3 py-1">
            {search.map((vent) => {
              return (
                <Vent
                  date={vent.createdAt}
                  key={vent._id}
                  id={vent._id}
                  title={vent.title}
                  body={vent.content}
                  comments={vent.comments}
                />
              );
            })}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default VentsPage;
