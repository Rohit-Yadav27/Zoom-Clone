import { useState,useContext } from "react";
import axios from "axios";
import withAuth from "../utils/withAuth";
import { IconButton, Button, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { useNavigate } from "react-router-dom";
import { HistoryContext } from '../contexts/HistoryContext';
import server from "../../environment";

function Dashboard() {

  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

    const {addToUserHistory} = useContext(HistoryContext);
    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(
        `${server}/logout`,
        {},
        { withCredentials: true },
      );

      if (data.success) {
        localStorage.removeItem("tokenn");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div>
          <h2>Apna Video Call</h2>
        </div>

        <div className="navlist">
          <IconButton onClick={()=>{
            navigate("/history")
          }}>
            <RestoreIcon />
          </IconButton>
          <p style={{cursor:"pointer"}}onClick={()=>{navigate("/history")}}>History</p>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </nav>

      <div className="meetContainer">
        <div className="leftPannel">

          <div>
            <h3>Providing Quality Video Call Just Like Quality Education</h3>
            <div style={{display:"flex",gap:"10px"}}>
              <TextField
                onChange={(e) => setMeetingCode(e.target.value)}
                id="outlined-basic"
                label="Metting Code"
                variant="outlined"
              />
              <Button onClick={handleJoinVideoCall}  variant="contained">
                Join
              </Button>
            </div>
          </div>

        </div>
        <div className="rightPannel">
          <img src="/media/logo3.png" alt="img" />
        </div>
      </div>
    </>
  );
}

export default withAuth(Dashboard);
