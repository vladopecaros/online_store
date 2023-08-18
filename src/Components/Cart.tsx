import { Purchase } from "../StoreFront";
import { Articles } from "../Articles";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

interface Propovi {
  Purchases: Purchase[];
  setPurchases: React.Dispatch<React.SetStateAction<Purchase[]>>;
  totalCost: number;
  setTotalCost: React.Dispatch<React.SetStateAction<number>>;
  cartItemCount: number;
  setCartiItemCount: React.Dispatch<React.SetStateAction<number>>;
  cartExists: number;
  setCartExists: React.Dispatch<React.SetStateAction<number>>;
  DisplayCart: boolean;
  setDisplayCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Cart(props: Propovi) {
  function removeFromCart(
    delId: number,
    delPurchId: number,
    delAmount: number
  ) {
    var i = 0;
    props.Purchases.forEach((Purchase) => {
      if (
        Purchase.Id === delId &&
        Purchase.PurchaseId === delPurchId &&
        Purchase.Amount === delAmount
      ) {
        props.setTotalCost(props.totalCost - Purchase.LotPrice);
        props.Purchases.splice(i, 1);
        props.setCartiItemCount(props.cartItemCount - 1);
        DelFromCookie(delId);
        reloadCart();
      }
      i++;
    });
    function DelFromCookie(IdToDel: number) {
      try {
        const cookies = new Cookies();
        const existingEntries = cookies.get("TheCookie") || [];
        const updatedEntries = existingEntries.filter(
          (entry: any) => entry.id !== IdToDel
        );
        cookies.set("TheCookie", updatedEntries, { path: "/", maxAge: 36000 });
      } catch {}
    }
  }

  const reloadCart = () => {
    props.setCartExists(0);
    setTimeout(() => {
      props.setCartExists(1);
    }, 500);
  };

  ////////////////////////////
  return (
    <>
      <div
        className={
          props.DisplayCart != false
            ? "ShoppingCartDivActive"
            : "ShoppingCartDivInactive"
        }
        style={{
          position: "fixed",
          display: props.cartExists === 1 ? "block" : "none",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "14pt",
              height: "50px",
              position: "absolute",
              left: "25px",
              top: "-5px",
            }}
          >
            Shopping Cart
          </h1>
          <button
            onClick={() => props.setDisplayCart(false)}
            style={{
              position: "absolute",
              left: "300px",
              width: "50px",
              height: "37px",
              top: "0",
              fontSize: "17pt",
            }}
          >
            &#10008;
          </button>
        </div>
        <br />
        <br />
        <div
          style={{
            height: "400px",
            position: "relative",
            overflow: "scroll",
            overflowX: "hidden",
          }}
        >
          {props.Purchases.map((Purchase, index) => (
            <div
              key={index}
              style={{
                width: "350px",
                height: "75px",
                border: "1px solid black",
                borderRight: "none",
              }}
            >
              <img
                src={Articles.find((i) => i.Id === Purchase.Id)?.Photos[0]}
                alt=""
                style={{ width: "75px", height: "75px", float: "left" }}
              />
              <h1
                style={{
                  overflow: "hidden",
                  fontSize: "14pt",
                  top: "-10px",
                  maxWidth: "300px",
                  margin: "none",
                  position: "relative",
                }}
              >
                {Articles.find((i) => i.Id === Purchase.Id)?.Name}
              </h1>

              <div>
                Size: {Purchase.Size}
                {"    "} Quanity{Purchase.Amount}
              </div>

              <button
                type="button"
                id="deleteFromCart"
                style={{
                  float: "right",
                  top: "-50px",
                  right: "5px",
                  position: "relative",
                  border: "1px solid red",
                  cursor: "pointer",
                }}
                onClick={() =>
                  removeFromCart(
                    Purchase.Id,
                    Purchase.PurchaseId,
                    Purchase.Amount
                  )
                }
              >
                &#x2715;
              </button>
              <div
                style={{ left: "235px", top: "-10px", position: "relative" }}
              >
                {Purchase.LotPrice}
              </div>
            </div>
          ))}
        </div>
        <div
          className="CartFooter"
          style={{
            gridArea: "footer",
            display: "flex",
            zIndex: "5",
          }}
        >
          <p
            style={{
              fontSize: "16pt",
              width: "250px",
              top: "-10px",
              height: "inherit",
            }}
          >
            Total: {props.totalCost}
          </p>
          <Link to="/checkout" state={[props.Purchases, props.totalCost]}>
            <button
              style={{
                height: "45px",
                right: "-00px",
                fontSize: "15pt",
              }}
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
