import { createContext} from "react";
import axios from "axios";


export const HistoryContext = createContext({});

export const HistoryProvider = ({ children }) => {

     const getHistoryOfUser = async () => {
        try {
            let request = await axios.get("http://localhost:3000/get_all_activity", {
                params: {
                    token: localStorage.getItem("tokenn")
                }
            });
            return request.data
        } catch
         (err) {
            throw err;
        }
    }

    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await axios.post("http://localhost:3000/add_to_activity", {
                token: localStorage.getItem("tokenn"),
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }


    const data = {addToUserHistory, getHistoryOfUser}


    return(
       <HistoryContext.Provider value={data}>
        {children}
       </HistoryContext.Provider>
    )
}