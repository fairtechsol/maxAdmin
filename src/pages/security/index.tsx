import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MaxBet07Logo } from "../../assets";
import { verifyAuthToken } from "../../store/actions/auth/authActions";
import { AppDispatch, RootState } from "../../store/store";

const SecurityAuth = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [otp, setOtp] = useState("");

  const { loginData } = useSelector((state: RootState) => state.auth);

  const handleChange = (otpValue: any) => {
    setOtp(otpValue);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (otp.length === 6) {
      dispatch(
        verifyAuthToken({
          authToken: otp,
          loginData: loginData,
        })
      );
    }
  }, [otp]);

  useEffect(() => {
    if (localStorage.getItem("isAuthenticator") === "true") {
      if (loginData?.isBetExist) {
        navigate("/admin/market-analysis");
      } else {
        navigate(
          `/admin/active-inactive-user-list/${localStorage.getItem("uid")}`
        );
      }
    }
  }, [localStorage.getItem("isAuthenticator")]);

  return (
    <>
      <div
        className="w-100 d-flex flex-column justify-content-center align-items-center "
        style={{ background: "#16191C", height: "100vh" }}
      >
        <div className="mt-4">
          <img
            src={MaxBet07Logo}
            alt="MAXBET07"
            style={{
              width: "300px",
              maxHeight: "50px",
            }}
          />
        </div>
        <div className="p-4 d-flex flex-column">
          <span className="title-16 text-center" style={{ color: "#fff" }}>
            Enter the 6-digit code from your security auth verification app
          </span>
          <form onSubmit={handleSubmit}>
            <OTPInput
              value={otp}
              onChange={handleChange}
              numInputs={6}
              shouldAutoFocus
              inputStyle={{
                width: "60px",
                height: "60px",
                margin: "0 0.5rem",
                fontSize: "1.5rem",
                textAlign: "center",
                border: "0px solid #ccc",
                borderRadius: "4px",
                background: "#2E3439",
              }}
              containerStyle={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "1rem",
              }}
              renderInput={(props: any) => <input {...props} />}
            />
          </form>
        </div>
      </div>
    </>
  );
};
export default SecurityAuth;
