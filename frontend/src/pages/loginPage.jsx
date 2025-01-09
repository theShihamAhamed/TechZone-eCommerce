import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import { useUserStore } from "../store/useUserStore.js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useUserStore();
  const navigate = useNavigate();

  const isLoding = false;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }    
  };

  return (
    <div className="min-h-screen bg-slate-300 flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-sky-400 to-cyan-500 text-transparent bg-clip-text ">
            Welcome Back
          </h2>
          <form onSubmit={handleLogin}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              icon={Lock}
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p className="text-red-500 font-semibold mb-2">{error}</p>
            )}

            <motion.button
              className="w-full py-3 px-4 bg-gradient-to-r from-sky-500 to-cyan-600 text-white font-bold rounded-lg shadow-lg hover:from-sky-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoding}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin mx-auto" />
              ) : (
                "Login"
              )}
            </motion.button>
          </form>
        </div>
        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
          <p className="text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link to={"/sign-up"} className="text-sky-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
