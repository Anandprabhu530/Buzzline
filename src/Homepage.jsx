import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

const Homepage = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Homepage;
