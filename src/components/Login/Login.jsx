import { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";
import loginLottie from "../../assets/lottie/loginlottiee.json";
import Lottie from "lottie-react";
import UseAxiosPublic from "../../Hooks/useAxiosPublic";
const Login = () => {
  const navigate = useNavigate();
  const { googleSignIn, userLogin, setUser, user } = useContext(AuthContext);
  const emailRef = useRef();
  const [error, setError] = useState({});
  const location = useLocation();
  const axiosPublic = UseAxiosPublic();
  const handleGoogleSignIn = (e) => {
    googleSignIn().then((result) => {
      const userInfo = {
        email: result.user?.email,
        displayName: result.user?.displayName,
        role: "user",
      };
      // console.log('rsult', result)

      axiosPublic.post("/users", userInfo).then((res) => {
        toast.success("Login Successful");

        navigate("/root");
      });
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Login Successful");

        navigate("/root");
      })
      .catch((err) => {
        setError({ ...error, login: err.code });
        toast.error(err.message);
      });
  };
  return (
    <div className="w-11/12 mx-auto mb-9">
      <h1 className="text-center font-bold text-[#d3a955]  text-2xl md:text-5xl pt-5">
        Login to Your taskFlow <br />
        Account
      </h1>
      <p className="text-center md:text-xl font-semibold  mt-4 mb-6">
        Welcome back! Log in to manage your tasks and stay organized.
      </p>
      <div className="md:flex gap-10  border bg-[#181024] items-center flex-row-reverse justify-center">
        <div className="md:w-1/4 w-1/3 md:mt-10 mx-auto md:mx-0">
          <Lottie animationData={loginLottie}></Lottie>
        </div>
        <div className="pb-10 md:w-2/5 ">
          <div className=" bg-[#181024] mt-6 ">
            <form onSubmit={handleLogin} className="card-body ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white text-xl ">Email</span>
                </label>
                <br />
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className=" input w-full input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white text-xl ">
                    Password
                  </span>
                </label>
                <br />
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className=" input w-full input-bordered"
                  required
                />
                <br />
                {error.login && (
                  <label className="label text-sm text-red-600">
                    {error.login}
                  </label>
                )}

                <label className="label">
                  <span
                    className="label-text-alt text-[#9660ea]  link link-hover text-xl cursor-pointer"
                    // onClick={() => {
                    //     const email = emailRef.current.value;
                    //     navigate('/forgetPassword', { state: { email } });
                    // }}
                  >
                    Forgot password?
                  </span>
                </label>
              </div>
              <div className="form-control flex justify-start mt-6">
                <button className="btn btn-primary bg-black w-1/2 text-[#d3a955] border-[#d3a955] text-xl ">
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center  mx-auto mt-1">
            <h1 className=" text-base text-white">
              New to taskFlow?{" "}
              <Link to="/register" className="underline text-[#9660ea]">
                Register Now
              </Link>{" "}
            </h1>
          </div>
          <div className="flex justify-center mt-4">
            <GoogleButton onClick={handleGoogleSignIn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
