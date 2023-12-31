import { useLocation, Link } from "react-router-dom";
import { Articles } from "./Articles";
import { useState } from "react";
import Cookies from "universal-cookie";
const cookies=new Cookies;
export function Checkout() {
  const location = useLocation();
  console.log(location);
  const [pay, setPay] = useState(false);
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div
          className="Pay"
          style={{
            position: "absolute",
            height: "50%",
            width: "50%",
            margin: "25%",
            backgroundColor: "#007200af",
            zIndex: "2",
            paddingTop: "10%",
            display: pay === true ? "block" : "none",
            fontSize: "24pt",
          }}
        >
          Thank You For Shopping With Us.
          <br />
          <Link to="/index">
            <button onClick={()=>(cookies.set("TheCart", [], { path: "/", maxAge: 36000 }))} style={{ width: "50px", height: "25px" }}>Close</button>
          </Link>
        </div>
        <h1>Dear customer, heres a list of your orders</h1>
        <table
          style={{
            border: "1px solid black",
            fontSize: "18pt",
            width: "100%",
          }}
        >
          <th>Amount</th>
          <th>Article</th>
          <th>Size</th>
          <th>Cost</th>

          {location.state[0].map((Purchase: any, index: number) => (
            <tr key={"tr_"+index}>
              <td>{Purchase.Amount}</td>
              <td>
                <img
                  style={{ width: "50px" }}
                  src={Articles.find((i) => i.Id === Purchase.Id)?.Photos[0]}
                  alt=""
                />
                {Articles.find((i) => i.Id === Purchase.Id)?.Name}
              </td>
              <td>{Purchase.Size}</td>
              <td>{Purchase.LotPrice}</td>
            </tr>
          ))}
        </table>
        <h1>
          With total cost of {location.state[1]}{" "}
          <button
            style={{ width: "10%", height: "50px", fontSize: "auto" }}
            onClick={() => setPay(true)}
          >
            Pay
          </button>
        </h1>
      </div>
    </>
  );
}
