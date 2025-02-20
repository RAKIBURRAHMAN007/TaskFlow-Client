import { useContext, useState } from "react";
import { auth, AuthContext } from "../../Provider/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import registerLottie from "../../assets/lottie/register.json";
import UseAxiosPublic from "../../Hooks/useAxiosPublic";
import { updateProfile } from "firebase/auth";
const RegisterPage = () => {
  const { createNewUser, setUser } = useContext(AuthContext);
  const [error, setError] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = UseAxiosPublic();
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const regex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!regex.test(password)) {
      setError({
        ...error,
        password:
          "password must be  6 characters long & at-least 1 upper and lower case letter.",
      });
      toast.error(
        "password must be  6 characters long & at-least 1 upper and lower case letter."
      );

      return;
    }
    createNewUser(email, password)
      .then((result) => {
        const registeredUser = result.user;
        const profile = {
          displayName: name,
        };
        const userInfo = {
          displayName: name,
          email: email,
          role: "user",
        };

        updateProfile(auth.currentUser, profile).then(() => {
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              toast.success("User Registered Successfully");
              navigate("/root/todo");
            }
          });
        });

        setUser({
          ...registeredUser,
          name,
        });
      })
      .catch((err) => {
        setError({ ...error, login: err.code });
        toast.error(err.message);
      });
  };
  return (
    <div className="w-11/12 mx-auto mb-10 ">
      <h1 className="text-center text-[#d3a955] font-bold mb-5 text-2xl md:text-5xl pt-5">
        Register to Get <br />
        Started!
      </h1>
      <p className="text-center md:text-xl font-semibold   mb-6">
        Join us to streamline your workflow. Sign up and start managing tasks
        effortlessly.
      </p>
      <div className="md:flex flex-row-reverse gap-10  border bg-[#181024] items-center justify-center">
        <div className="md:w-1/4 w-1/3 md:mt-10 mx-auto md:mx-0">
          <Lottie animationData={registerLottie}></Lottie>
        </div>
        <div className="pb-10 md:w-2/5">
          <div className="  mt-6">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white text-xl ">Name</span>
                </label>
                <br />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className=" input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white text-xl ">Email</span>
                </label>
                <br />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className=" input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white  text-xl">
                    Password
                  </span>
                </label>
                <br />
                <input
                  type="text"
                  name="password"
                  placeholder="Enter your password"
                  className=" input input-bordered w-full"
                  required
                />
                {error.login && (
                  <label className="label text-sm text-red-600">
                    {error.login}
                  </label>
                )}
                {error.password && (
                  <label className="label text-sm text-red-600">
                    {error.password}
                  </label>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary w-1/2 bg-black text-[#d3a955] border-[#d3a955]  text-xl ">
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="flex justify-center">
            <h1 className=" text-white">
              {" "}
              Already Have Account?{" "}
              <Link to="/login" className="underline text-[#9660ea]">
                Login Now
              </Link>{" "}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
