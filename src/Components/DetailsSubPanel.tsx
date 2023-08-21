import { Articles } from "../Articles";
import { useState } from "react";
import { Purchase } from "../StoreFront";
import Cookies from "universal-cookie/cjs/Cookies";

interface Propovi {
  totalCost: number;
  setTotalCost: React.Dispatch<React.SetStateAction<number>>;
  Purchases: Purchase[];
  setPurchases: React.Dispatch<React.SetStateAction<Purchase[]>>;
  DisplayCart: boolean;
  setDisplayCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItemCount: number;
  setCartiItemCount: React.Dispatch<React.SetStateAction<number>>;
  cartExists: number;
  setCartExists: React.Dispatch<React.SetStateAction<number>>;
  viewedArticle: number;
  setviewedArticle: React.Dispatch<React.SetStateAction<number>>;
}

//Classes->
function createPurchase(
  PurchaseId: number,
  Id: number,
  Size: string,
  Amount: number,
  LotPrice: number
) {
  return new Purchase(PurchaseId, Id, Size, Amount, LotPrice);
}
//

export function DetailsSubPanel(props: Propovi) {
  const [clickedSize, setClickedSize] = useState("");



  //Cart->
  function AddToCart(
    NewArticle: number,
    props: Propovi,
    IsFromCookie: boolean
  ) {
    try {
      var ArticlePrice;
      const getAmount = Number(
        (document.getElementById("numPieces") as HTMLInputElement).value
      );
      const getSize = (document.getElementById("sizeText") as HTMLInputElement)
        .value;

      const itemPrice = Articles.find((i) => i.Id === NewArticle)?.Price;
      if (itemPrice != null) {
        ArticlePrice = Number(getAmount * itemPrice);
      } else {
        ArticlePrice = 0;
      }

      if (getSize == "") {
        alert("Please select a size");
      } else {
        const newPurchase = createPurchase(
          Date.now(),
          NewArticle,
          getSize,
          getAmount,
          ArticlePrice
        );

        props.setTotalCost(props.totalCost + ArticlePrice);
        props.setPurchases((prevPurchases) => {
          const updatedPurchases = [...prevPurchases, newPurchase];
          props.setCartiItemCount((prevItemCount) => prevItemCount + 1);
          
          return updatedPurchases;
        });
        setClickedSize("");
        props.setDisplayCart(true);
        reloadCart(props);
        if (IsFromCookie === false) {
          const cookies = new Cookies();
          const TheCookie = cookies.get("TheCart") || [];
          TheCookie.push(newPurchase);
          cookies.set("TheCart", TheCookie, { path: "/", maxAge: 36000 }); // Expires in 10 hours
          
        }
      }
    } catch {
      alert("Greska");
    }
  }

  const reloadCart = (props: Propovi) => {
    props.setCartExists(0);
    setTimeout(() => {
      props.setCartExists(1);
    }, 500);
  };

  return (
    <>
      <div
        className="InfoSubPanel"
        style={{
          left: "450px",
          position: "absolute",
        }}
      >
        {Articles.find((i) => i.Id === props.viewedArticle)?.Category}
        {" > "}
        {Articles.find((i) => i.Id === props.viewedArticle)?.SubCategory}
        <h1 style={{ marginTop: "3px" }}>
          {Articles.find((i) => i.Id === props.viewedArticle)?.Name}
        </h1>
        Price: {Articles.find((i) => i.Id === props.viewedArticle)?.Price}
        <br />
        Available sizes: <br />
        <button className="SizeButton" onClick={() => setClickedSize("S")}>
          S
        </button>
        <button className="SizeButton" onClick={() => setClickedSize("M")}>
          M
        </button>
        <button className="SizeButton" onClick={() => setClickedSize("L")}>
          L
        </button>
        <button className="SizeButton" onClick={() => setClickedSize("XL")}>
          XL
        </button>
        <hr />
        Order:
        <br />
        How many? &ensp;
        <input
          type="number"
          name="Pieces"
          id="numPieces"
          defaultValue={1}
          min="1"
          style={{
            width: "50px",
            height: "25px",
            fontSize: "18pt",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: "1px solid black",
          }}
        />
        <br />
        How big? &ensp;
        <input
          type="text"
          name="Size"
          id="sizeText"
          value={clickedSize}
          readOnly
          style={{
            width: "50px",
            height: "25px",
            fontSize: "18pt",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            borderBottom: "1px solid black",
          }}
        />
        <br />
        <button
          className="PurchaseButton"
          style={{
            marginTop: "10px",
            width: "150px",
            height: "30px",
            fontSize: "17pt",
          }}
          onClick={() => AddToCart(props.viewedArticle, props, false)}
        >
          Add to cart
        </button>
      </div>
    </>
  );
}
