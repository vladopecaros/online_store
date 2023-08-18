import { useState } from "react";
import { SidePanel } from "./Components/SidePanel";
import { ArticleDisplay } from "./Components/ArticleDisplay";
import { Details } from "./Components/Details";
import { Cart } from "./Components/Cart";
import Cookies from "universal-cookie/cjs/Cookies";
//////////////////////////////////////////
//Classes->
export class Purchase {
  PurchaseId: number;
  Id: number;
  Size: string;
  Amount: number;
  LotPrice: number;
  constructor(
    PurchaseId: number,
    Id: number,
    Size: string,
    Amount: number,
    LotPrice: number
  ) {
    this.PurchaseId = PurchaseId;
    this.Id = Id;
    this.Size = Size;
    this.Amount = Amount;
    this.LotPrice = LotPrice;
  }
}
//
export function Storefront() {
  //useState consts->
  const [Category, setCategory] = useState("All");
  const [DisplayCart, setDisplayCart] = useState(false);
  const [Ordering, setOrdering] = useState("PriceUp");
  const [viewedArticle, setviewedArticle] = useState(0);
  const [cartItemCount, setCartiItemCount] = useState(0);
  const [cartExists, setCartExists] = useState(1);
  const [Purchases, setPurchases] = useState<Purchase[]>([]);
  const [totalCost, setTotalCost] = useState(0);

  function Cackes() {
    const cookies = new Cookies();
    const cookieExists = cookies.get("TheCart") !== undefined;
    if (!cookieExists) {
      cookies.set("TheCart", [], { path: "/", maxAge: 36000 }); // Expires in 10 hours
    }
  }

  return (
    <>
      <div
        onLoad={() => Cackes}
        style={{
          textAlign: "center",
          backgroundColor: "#007200",
          height: "50px",
          top: "10px",
        }}
      >
        <h1 style={{ margin: "none" }}>Welcome</h1>
      </div>
      <div>
        <SidePanel
          Category={Category}
          setCategory={setCategory}
          Ordering={Ordering}
          setOrdering={setOrdering}
          DisplayCart={DisplayCart}
          setDisplayCart={setDisplayCart}
          cartItemCount={cartItemCount}
          setCartiItemCount={setCartiItemCount}
        />
        <ArticleDisplay
          Category={Category}
          setCategory={setCategory}
          Ordering={Ordering}
          setOrdering={setOrdering}
          viewedArticle={viewedArticle}
          setviewedArticle={setviewedArticle}
        />
        <Details
          viewedArticle={viewedArticle}
          setviewedArticle={setviewedArticle}
          totalCost={totalCost}
          setTotalCost={setTotalCost}
          DisplayCart={DisplayCart}
          setDisplayCart={setDisplayCart}
          cartItemCount={cartItemCount}
          setCartiItemCount={setCartiItemCount}
          cartExists={cartExists}
          setCartExists={setCartExists}
          Purchases={Purchases}
          setPurchases={setPurchases}
        />
        <Cart
          totalCost={totalCost}
          setTotalCost={setTotalCost}
          DisplayCart={DisplayCart}
          setDisplayCart={setDisplayCart}
          cartItemCount={cartItemCount}
          setCartiItemCount={setCartiItemCount}
          cartExists={cartExists}
          setCartExists={setCartExists}
          Purchases={Purchases}
          setPurchases={setPurchases}
        />
      </div>
    </>
  );
}
