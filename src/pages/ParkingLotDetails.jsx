import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import Cards from "../Cards";
import LoadingScreen from "./loading";
import { db } from "../firebase";
import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext";
import { collection } from "firebase/firestore";
// import LoadingScreen from "./loading";

function ParkingLotDetails() {
    const navigate = useNavigate();
    const { pid } = useParams();
    const { user, logout } = useAuth();
    const [parkingLotData, setParkingLotData] = useState(null);
    const [parkingDynData, setParkingDynData] = useState(null);
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [vehType, setVehType] = useState("Car")
    const [lisence, setLisence] = useState("")
    const [showPopup, setShowPopup] = useState(false);
    const [_, userData] = useOutletContext()
    const [loading, setLoading] = useState()


    const handleStartTimeChange = (e) => setStartTime(e.target.value);
    const handleEndTimeChange = (e) => setEndTime(e.target.value);
    const handleVehTypeChange = (e) =>{
         setVehType(e.target.value);
        //  setTimeout(()=>{
        //     console.log(vehType)
        //  },2000)
    }
    const handleLisenceChange = (e) => setLisence(e.target.value);


    // Fetch Static Parking Data (One-time fetch)
    const fetchParkingData = async (pid) => {
        try {
            const parkingDoc = await getDoc(doc(db, "parking-lots", pid));
            if (parkingDoc.exists()) {
                setParkingLotData(parkingDoc.data());
            } else {
                alert("No such parking lot found!");
                navigate("/home/parkings/find");
            }
        } catch (error) {
            console.error("Error fetching parking lot data:", error);
        }
    };

    // Real-Time Updates for Dynamic Parking Data
    useEffect(() => {
        if (!pid) return;

        // Fetch Static Data once
        fetchParkingData(pid);

        // Listen for real-time updates in Firestore
        const parkingDynRef = doc(db, "parking-dyn-info", pid);
        const unsubscribe = onSnapshot(parkingDynRef, (snapshot) => {
            if (snapshot.exists()) {
                setParkingDynData(snapshot.data());
            } else {
                console.log("No real-time data available for this parking lot.");
            }
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
    }, [pid]);

    useEffect(()=>{
        if(userData){
            console.log(userData)
        }
    },[userData])

    if (!parkingLotData || !parkingDynData) {
        return <LoadingScreen />;
    }






    const bookParkinglot = async () => {
        try {

            console.log(parkingDynData)
          if (parkingDynData.remaining == 0) {
            alert("Parking lot is currently full, Sorry! :(");
            return;
          }
      
          // Step 2: Create a new reservation document
          const reservationRef = doc(collection(db, `reservations/${parkingDynData.pid}/list`));
          const reservationId = reservationRef.id;
      
          const reservationData = {
            userId: user.uid,
            parkingName : parkingLotData.Name,
            parkingAddress : parkingLotData.address,
            parkingLotId: parkingDynData.pid,
            from: startTime,
            to : endTime,
            status: "not-used",
            lisencePlate : lisence,
            vehicleType : vehType,
          };

          const reservationDataAdmin = {
            userId: user.uid,
            userName: userData.fullName,
            userEmail: userData.email,
            userPhone: userData.phone,
            from: startTime,
            to : endTime,
            status: "not-used",
            lisencePlate : lisence,
            vehicleType : vehType,
          };
      
          await setDoc(reservationRef, reservationDataAdmin);
      
          // Step 3: Update `parking-dyn-info` to mark the slot as occupied
          const slotRef = doc(db, "parking-dyn-info", pid)
          await updateDoc(slotRef, { remaining: parkingDynData.remaining - 1, regusers: parkingDynData.regusers + 1});
      
          // Step 4: Store reservation under `users/{userId}/reservations`
          const userReservationRef = doc(db, `users/${user.uid}/reservations/${reservationId}`);
          await setDoc(userReservationRef, reservationData);
      
          alert("Parking slot reserved successfully!");

          setShowPopup(false)
      
        } catch (error) {
          console.error("Error booking slot:", error);
        }
    };

    const totalSpots = parkingLotData.capacity;
    const availableSpots = parkingDynData.remaining;
    const occupiedSpots = totalSpots - availableSpots;


    const generateParkingSlots = () => {
      return Array.from({ length: totalSpots }, (_, index) => {
          const isAvailable = index < availableSpots;
          return (
              <div
                  key={index}
                  className={`parking-slot ${isAvailable ? "available" : "occupied"}`}
              >
                  {isAvailable ? <div className="parking-spot avilable-spot">🟢</div> : <div className="parking-spot occu-spot">🔴</div>}
              </div>
          );
      });
    };


    const openPopup = ()=>{
        const home = document.querySelector(".popup-overlay")
        if(showPopup){
            // home.style.backgroundColor = "#fff"
            home.style.backdropFilter="none"
        }else{
            setTimeout(()=>{
                const home = document.querySelector(".popup-overlay")
                // home.style.backgroundColor = "#fff"

                home.style.backdropFilter="blur(10px)"
            },100)

        }


        setShowPopup(!showPopup)
    }

    return (

        loading ? <LoadingScreen /> : 

        <div className="ind-parking-lot-details-cont">
            <h3 className="parking-name">{parkingLotData.Name}</h3>
            <p className="parking-address">{parkingLotData.address}</p>

            <hr />

            <div className="rating-veh-types-cont">
                <h5>Ratings ({parkingDynData.rating?.nusers || 0}) ⭐ {parkingDynData.rating?.avgrate || "N/A"}</h5>

                <div className="veh-types">
                    {parkingLotData.vehicleTypes?.length > 0 ? (
                        parkingLotData.vehicleTypes.map((vehType, index) => (
                            <div key={index} className="veh-type">{vehType}</div>
                        ))
                    ) : (
                        <p>No vehicle types available</p>
                    )}
                </div>
            </div>

            <hr />

            <div className="crnt-stats">
                <Cards cardName={"Total Lots"} cardVal={parkingLotData.capacity} />
                <Cards cardName={"Available"} cardVal={parkingDynData.remaining || "N/A"} />
                <Cards cardName={"Users"} cardVal={parkingDynData.regusers || "N/A"} />
            </div>

            <div className="lot-pricing">
                <h4 className="sub-head">Lot Pricing</h4>
                <div className="pricing-cont">
                    {parkingDynData.pricing ? (
                        Object.entries(parkingDynData.pricing).map(([vehicleType, price], index) => (
                            <div key={index} className="pricing-card">
                                <h5>{vehicleType}</h5>
                                <p>₹{price ? price : "N/A"}/hr</p>
                            </div>
                        ))
                    ) : (
                        <p>Pricing details unavailable</p>
                    )}
                </div>
            </div>

            {/* <div style={{height:"50vh"}}></div> */}

            <hr></hr>

            <div className="lot-configuration">
                <h4 className="sub-head">Lot Configuration</h4>
                <div className="parking-grid" style={{gridTemplateColumns:`repeat(${Math.min(10, totalSpots)}, 1fr)`}}>
                    {generateParkingSlots()}
                </div>
                <div className="legend">
                    <span className="legend-item"><span className="legend-color available">🟢</span> Available</span>
                    <span className="legend-item"><span className="legend-color occupied">🔴</span> Occupied</span>
                </div>
            </div>

            <div className="book-cont">
                <div>
                <button className="book-btn"onClick={openPopup}>Book Now</button>
                </div>
            </div>


            {showPopup && (
                <div className="popup-overlay">
                <div className="popup-container">
                    <h2>Enter Parking Information</h2>
                    <div>
                    <div>
                        <label>Start Time:</label>
                        <input
                        type="time"
                        value={startTime}
                        onChange={handleStartTimeChange}
                        required
                        />
                    </div>

                    <div>
                        <label>End Time:</label>
                        <input
                        type="time"
                        value={endTime}
                        onChange={handleEndTimeChange}
                        required
                        />
                    </div>

                    <div>
                        <label>Vehicle Type:</label>
                        {/* <input
                        type="text"
                        value={vehType}
                        onChange={handleVehTypeChange}
                        placeholder="Enter vehicle type"
                        required
                        /> */}

                        <select onChange={handleVehTypeChange}>
                        {
                            parkingLotData.vehicleTypes.map((vehType, index) => (
                                <option key={index} value={vehType}>{vehType}</option>
                            ))
                        }
                        </select>
                    </div>

                    <div>
                        <label>License Plate:</label>
                        <input
                        type="text"
                        value={lisence}
                        onChange={handleLisenceChange}
                        placeholder="Enter license plate"
                        required
                        />
                    </div>

                    <div className="button-container">
                        <button type="submit" onClick={bookParkinglot}>Submit</button>
                        <button type="button" onClick={openPopup}>
                        Cancel
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            )}
        </div>
    );
}

export default ParkingLotDetails;
