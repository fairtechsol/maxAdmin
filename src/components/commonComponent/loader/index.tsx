import "./style.scss";

const Loader = () => {
  // const [loader, setLoader] = useState();

  return (
    <div className="loader loaderOverlay ">
      {/* <img src="/loader.gif" /> */}
      <video width="100px" autoPlay loop muted playsInline>
        <source src="/loader.webm" type="video/webm" />
      </video>
    </div>
  );
};

export default Loader;
