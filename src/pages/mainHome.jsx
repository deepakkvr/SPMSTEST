import QuickAccessBtns from "../quick-access-btns"
import { useOutletContext } from "react-router-dom"

function MainHome(){

    const [userData] = useOutletContext()

    return(

        <div className="main-home-cont">
            
            <div className="welcome-msg"><h3>Welcome, {userData ? userData.fullName : "Loading..."}</h3></div>

            <hr></hr>
        
            <div className="quick-access-cont">
            
                <h4>Quick access links</h4>
                <div className="quick-access">

                    <QuickAccessBtns icon={"❓"} desc={"Find Parking"} link={"/home/parkings/find"}/>             
                    <QuickAccessBtns icon={"🔃"} desc={"History"} link={"/home/history"}/>             
                    <QuickAccessBtns icon={"💵"} desc={"Payments"} />             
                    <QuickAccessBtns icon={"📄"} desc={"Reservations"} link={"/home/reservation"}/>             
                    <QuickAccessBtns icon={"⚠️"} desc={"Alerts"} />             
                    <QuickAccessBtns icon={"🙍🏽‍♂️"} desc={"Profile"} link={"/home/profile"}/>             

                    
                </div>
            </div>

        </div>

    )

}

export default MainHome