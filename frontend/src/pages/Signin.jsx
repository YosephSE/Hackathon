import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import LoadingPage from "../components/Loading";
import api from "../../api/users";

function Signin() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { refreshStatus } = useAuth();

  const handleLogin = async () => {
    setIsLoading(true);
    const userData = { email, password };
    setError("");
    try {
      await api.post("/auth", userData);
      setError("");
      refreshStatus();
      navigate("/vents");
    } catch (err) {
      console.log(err.response);
      setError(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col flex-grow">
          <div className="flex items-center justify-center bg-gray-200 w-full flex-grow">
            <div className="w-full max-w-xs">
              <form
                className="rounded px-8 pt-6 pb-8 mb-4 "
                onSubmit={handleLogin}
              >
                <h2 className="text-2xl mb-6">Sign In</h2>

                <div className="mb-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && (
                  <p className="text-red-500 text-xs italic mb-4">{error}</p>
                )}

                <div className="flex items-center justify-between">
                  <button
                    className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
                <p className="text-center text-gray-500 text-xs mt-4">
                  Don't have an account?{" "}
                  <span className="text-blue-500">
                    <Link to="/signup">Sign Up</Link>
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signin;
