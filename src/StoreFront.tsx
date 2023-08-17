import InfoCart from "./Images/InfoCart.png";
//////////////////////
import React from "react";
import { Articles } from "./Articles";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Storefront() {
  //useState consts->
  const [Category, setCategory] = useState("All");
  const [DisplayCart, setDisplayCart] = useState(false);
  const [Ordering, setOrdering] = useState("PriceUp");
  const [viewedArticle, setviewedArticle] = useState(0);
  const [viewingPhoto, setviewingPhoto] = useState(0);
  const [NumOfPhotos, setNumOfPhotos] = useState(1);
  const [clickedSize, setClickedSize] = useState("");
  const [cartItemCount, setCartiItemCount] = useState(0);
  const [cartExists, setCartExists] = useState(1);
  const [Purchases, setPurchases] = useState<Purchase[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  //
  //Classes->
  class Purchase {
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
  //Category and Sorting->
  const categoryUpdate = () => {
    setCategory(
      (document.getElementById("CategoryDropdown") as HTMLInputElement).value
    );
  };
  ////order
  const OrderBy = () => {
    const OrderStyle = (
      document.getElementById("OrderDropdown") as HTMLInputElement
    ).value;
    setOrdering(OrderStyle);
  };
  ////ascending descending by price
  const ArticlesDesc = [...Articles].sort((a, b) =>
    a.Price > b.Price ? -1 : 1
  );
  const ArticlesAsc = [...Articles].sort((a, b) =>
    a.Price > b.Price ? 1 : -1
  );
  //
  //Photo Related Stuff->
  const NextPhoto = () => {
    if (viewingPhoto < NumOfPhotos - 1) {
      setviewingPhoto(viewingPhoto + 1);
      console.log(viewingPhoto);
    } else {
      setviewingPhoto(0);
      console.log(viewingPhoto);
    }
  };
  const PrevPhoto = () => {
    if (viewingPhoto > 0) {
      setviewingPhoto(viewingPhoto - 1);
    } else {
      setviewingPhoto(NumOfPhotos - 1);
    }
  };
  var j = 0;

  const findfoto = () => {
    var a = 0;

    Articles.find((i) => i.Id === viewedArticle)?.Photos.forEach((Photo) => {
      a++;
    });

    console.log(a);
    setNumOfPhotos(a);
  };
  //
  //The Cart->
  function AddToCart(NewArticle: number) {
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

        setTotalCost(totalCost + ArticlePrice);
        setPurchases((prevPurchases) => {
          const updatedPurchases = [...prevPurchases, newPurchase];
          setCartiItemCount((prevItemCount) => prevItemCount + 1);
          console.log(updatedPurchases);
          return updatedPurchases;
        });
        setClickedSize("");
        setDisplayCart(true);
        reloadCart();
      }
    } catch {
      alert("Greska");
    }
  }

  function removeFromCart(
    delId: number,
    delPurchId: number,
    delAmount: number
  ) {
    var i = 0;
    Purchases.forEach((Purchase) => {
      if (
        Purchase.Id === delId &&
        Purchase.PurchaseId === delPurchId &&
        Purchase.Amount === delAmount
      ) {
        setTotalCost(totalCost - Purchase.LotPrice);
        Purchases.splice(i, 1);
        setCartiItemCount(cartItemCount - 1);
        reloadCart();
      }
      i++;
    });
  }

  const reloadCart = () => {
    setCartExists(0);
    setTimeout(() => {
      setCartExists(1);
    }, 500);
  };
  //

  return (
    <>
      <div
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
        <div className="SidePanel">
          <p>Select a category:</p>
          <select
            name="CategoryDropdown"
            id="CategoryDropdown"
            onChange={() => categoryUpdate()}
          >
            <option value="All">All</option>
            <optgroup label="Men">
              <option value="Men-Clothes">Mens Clothes</option>
            </optgroup>
            <optgroup label="Women">
              <option value="Women-Clothes">Womens Clothes</option>
            </optgroup>
            <optgroup label="Kids">
              <option value="Kids-Clothes">Kids Clothes</option>
            </optgroup>
          </select>
          <p>Order By:</p>
          <select
            name="OrderDropdown"
            id="OrderDropdown"
            onChange={() => OrderBy()}
            defaultValue={"None"}
          >
            <option value="PriceUp">Price Ascending</option>
            <option value="PriceDown">Price Descending</option>
          </select>
          <br />
          <br />
          <br />
          <button
            className="CartButton"
            style={{ height: "60px", fontSize: "16pt", display: "flex" }}
            onClick={() => setDisplayCart(true)}
          >
            <img
              src={InfoCart}
              alt=""
              style={{ aspectRatio: "1/1", width: "50px" }}
            />
            Shopping Cart &#x28;{cartItemCount}&#x29;
          </button>
        </div>
        <div
          className="ArticlesContainer"
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          {(Ordering !== "PriceDown" ? ArticlesAsc : ArticlesDesc).map(
            (Articles, index) => (
              <div
                className="ArticleBox"
                key={Articles.Id}
                style={{
                  textAlign: "center",
                  display:
                    Category ===
                      Articles.Category + "-" + Articles.SubCategory ||
                    Category === "All"
                      ? "block"
                      : "none",
                }}
              >
                <div style={{ position: "absolute", zIndex: "2" }}>
                  <img
                    src={InfoCart}
                    style={{
                      aspectRatio: "1/1",
                      width: "50px",
                      cursor: "pointer",
                    }}
                    onClick={() => setviewedArticle(Articles.Id)}
                  ></img>
                </div>

                <img src={Articles.Photos[0]} alt="Slika" />
                <br />
                {Articles.Name}
                <br />
                {Articles.Price}
              </div>
            )
          )}
        </div>
        <div
          className="DetailsDiv"
          style={{
            display: viewedArticle === 0 ? "none" : "block",
            zIndex: "3",
          }}
          onLoad={() => findfoto()}
        >
          <button
            style={{
              fontSize: "24pt",
              position: "absolute",
              left: "85%",
              top: "5%",
              cursor: "pointer",
            }}
            onClick={() => (setviewedArticle(0), setviewingPhoto(0))}
          >
            &#x2715;
          </button>
          <div
            className="InformationPanel"
            style={{
              display: "flex",

              width: "70%",
              height: "400px",
              marginLeft: "100px",
            }}
          >
            <div>
              {Articles.find((i) => i.Id === Number(viewedArticle))?.Photos.map(
                (Photos, photoindex) => (
                  <div>
                    <div
                      key={"Div" + photoindex}
                      id={"" + photoindex}
                      style={{
                        display: photoindex === viewingPhoto ? "block" : "none",
                        textAlign: "left",
                        userSelect: "none",
                      }}
                    >
                      <div>
                        <a
                          className="prevButton"
                          style={{
                            zIndex: "4",
                            cursor: "pointer",

                            fontSize: "30pt",
                            top: "250px",
                            position: "absolute",
                            color: "black",
                          }}
                          onClick={() => PrevPhoto()}
                        >
                          &#10094;
                        </a>
                        <img
                          key={"Photo" + photoindex}
                          src={Photos}
                          alt="Slika"
                          className="ProductPhotos"
                          id={"ProductPhoto" + Photos}
                          style={{
                            position: "absolute",
                            aspectRatio: "9/16",
                            height: "400px",
                            width: "250px",
                          }}
                        />

                        <a
                          className="nextButton"
                          style={{
                            zIndex: "4",
                            fontSize: "30pt",
                            top: "250px",
                            position: "absolute",
                            color: "black",
                            cursor: "pointer",
                            left: "395px",
                          }}
                          onClick={() => NextPhoto()}
                        >
                          &#10095;
                        </a>
                      </div>
                    </div>
                  </div>
                )
              )}
              <div
                className="InfoSubPanel"
                style={{
                  left: "450px",
                  position: "absolute",
                }}
              >
                {Articles.find((i) => i.Id === viewedArticle)?.Category}
                {" > "}
                {Articles.find((i) => i.Id === viewedArticle)?.SubCategory}
                <h1 style={{ marginTop: "3px" }}>
                  {Articles.find((i) => i.Id === viewedArticle)?.Name}
                </h1>
                Price: {Articles.find((i) => i.Id === viewedArticle)?.Price}
                <br />
                Available sizes: <br />
                <button
                  className="SizeButton"
                  onClick={() => setClickedSize("S")}
                >
                  S
                </button>
                <button
                  className="SizeButton"
                  onClick={() => setClickedSize("M")}
                >
                  M
                </button>
                <button
                  className="SizeButton"
                  onClick={() => setClickedSize("L")}
                >
                  L
                </button>
                <button
                  className="SizeButton"
                  onClick={() => setClickedSize("XL")}
                >
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
                  onClick={() => AddToCart(viewedArticle)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            DisplayCart != false
              ? "ShoppingCartDivActive"
              : "ShoppingCartDivInactive"
          }
          style={{
            position: "fixed",
            display: cartExists === 1 ? "block" : "none",
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
              onClick={() => setDisplayCart(false)}
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
            {Purchases.map((Purchase, index) => (
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
              Total: {totalCost}
            </p>
            <Link to="/checkout" state={{ Purchases, totalCost }}>
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
      </div>
    </>
  );
}
