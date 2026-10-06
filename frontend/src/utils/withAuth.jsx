import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const withAuth = (WrappedComponent) => {
    const AuthComponet = (props) => {
        const router = useNavigate();

        const isAuthenticated = () => {
            if(localStorage.getItem("tokenn")){
                return true;
            }
            return false
        }

        useEffect(()=> {
            if(!isAuthenticated()){
                router("/signup")
            }
        },[])

        return <WrappedComponent {...props}/>
    }
    
    return AuthComponet;
}

export default withAuth;