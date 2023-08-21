import { useEffect, useState } from "react";
import { Articles } from "../Articles";
import Cookies from "universal-cookie";
import { Purchase } from "../StoreFront";

 //povlacenje artikala iz kolacica
 export function Cakes(IdToDel:number,setPurchases: React.Dispatch<React.SetStateAction<Purchase[]>>,setTotalCost: React.Dispatch<React.SetStateAction<number>>,setCartiItemCount: React.Dispatch<React.SetStateAction<number>>) {
    useEffect(() => {
      const cookies = new Cookies();
      const cookieValue = cookies.get("TheCart") || [];
      
      let RetrievedList:string="Systems have detected a cart from previous session, do you want to restore the following items to current cart? \n\n";
      const updatedPurchases = cookieValue.map((purchaseData: any) => {
        RetrievedList+=Articles.find((i)=>i.Id==purchaseData.Id)?.Name+" Size: "+ purchaseData.Size +" Amount: "+purchaseData.Amount+"\n\n";
        return new Purchase(
          purchaseData.PurchaseId,
          purchaseData.Id,
          purchaseData.Size,
          purchaseData.Amount,
          purchaseData.LotPrice
        );
      });
     if(cookieValue!=""){ 
  if(window.confirm(RetrievedList)){
    setTotalCost((prevTotalCost) => {
      let newTotalCost = prevTotalCost;
      updatedPurchases.forEach((purchase:Purchase) => {
        newTotalCost += purchase.LotPrice;
      });
      return newTotalCost;
    });
  
    setPurchases((prevPurchases) => [...prevPurchases, ...updatedPurchases]);
    setCartiItemCount((prevItemCount) => prevItemCount + updatedPurchases.length);
}else{
    cookies.set("TheCart", [], { path: "/", maxAge: 36000 });
}
}
      
    }, []);
  }
  //////
  export function DeleteCakes(IdToDel:number,setPurchases: React.Dispatch<React.SetStateAction<Purchase[]>>,setTotalCost: React.Dispatch<React.SetStateAction<number>>,setCartiItemCount: React.Dispatch<React.SetStateAction<number>>) {
    const cookies = new Cookies();
    const cookieValue = cookies.get("TheCart") || [];
    const updatedPurchases = cookieValue.map((purchaseData: any) => {
        return new Purchase(
          purchaseData.PurchaseId,
          purchaseData.Id,
          purchaseData.Size,
          purchaseData.Amount,
          purchaseData.LotPrice
        );
      });
    const filteredPurchases = updatedPurchases.filter((purchase:Purchase) => purchase.PurchaseId !== IdToDel);
    cookies.set("TheCart", filteredPurchases, { path: "/", maxAge: 36000 });
  }
