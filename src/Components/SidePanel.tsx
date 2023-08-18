import React, { Dispatch, SetStateAction, useState } from "react";
import { Articles } from "../Articles";
import InfoCart from "./Images/InfoCart.png";

interface Propovi {
  Category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  Ordering: string;
  setOrdering: React.Dispatch<React.SetStateAction<string>>;
  DisplayCart: boolean;
  setDisplayCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItemCount: number;
  setCartiItemCount: React.Dispatch<React.SetStateAction<number>>;
}

//Category and Sorting->
export function categoryUpdate(props: Propovi) {
  props.setCategory(
    (document.getElementById("CategoryDropdown") as HTMLInputElement).value
  );
}
////order
export const OrderBy = (props: Propovi) => {
  const OrderStyle = (
    document.getElementById("OrderDropdown") as HTMLInputElement
  ).value;
  props.setOrdering(OrderStyle);
};
////ascending descending by price
export const ArticlesDesc = [...Articles].sort((a, b) =>
  a.Price > b.Price ? -1 : 1
);
export const ArticlesAsc = [...Articles].sort((a, b) =>
  a.Price > b.Price ? 1 : -1
);
//

export function SidePanel(props: Propovi) {
  return (
    <>
      <div className="SidePanel">
        <p>Select a category:</p>
        <select
          name="CategoryDropdown"
          id="CategoryDropdown"
          onChange={() => categoryUpdate(props)}
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
          onChange={() => OrderBy(props)}
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
          onClick={() => props.setDisplayCart(true)}
        >
          <img
            src={InfoCart}
            alt=""
            style={{ aspectRatio: "1/1", width: "50px" }}
          />
          Shopping Cart &#x28;{props.cartItemCount}&#x29;
        </button>
      </div>
    </>
  );
}
