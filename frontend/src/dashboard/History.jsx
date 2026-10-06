import React from "react";
import { IconButton } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { HistoryContext } from "../contexts/HistoryContext";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import HomeIcon from '@mui/icons-material/Home';


const History = () => {
    const navigate = useNavigate();
  const { getHistoryOfUser } = useContext(HistoryContext);
  const [meeting, setMeeting] = useState([]);

  useEffect(() => {
    const fetcHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeeting(history);
      } catch {
        (e) => console.log(e);
      }
    };

    fetcHistory();
  }, []);

  let formatDate = (dateString) => {

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`

    }

  return (
    <div>
        <IconButton onClick={()=>{
            navigate("/dashboard")
        }}>
            <HomeIcon/>
        </IconButton>

      {meeting.length !== 0 ? (
        meeting.map((item, id) => {
          return (
            <React.Fragment key={id}>
              <Card  variant="outlined">

                <CardContent>

                  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Code: {item.meetingCode}
                  </Typography>

                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Date : {formatDate(item.date)}
                  </Typography>

                </CardContent>

              </Card>

            </React.Fragment>

          );

        })

      ) : <></>

      }

    </div>

  );

};

export default History;
