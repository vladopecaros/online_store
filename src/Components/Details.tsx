import { useState } from "react";
import { Articles } from "../Articles";
import { DetailsSubPanel } from "./DetailsSubPanel";
import { Purchase } from "../StoreFront";

interface Propovi {
  totalCost: number;
  setTotalCost: React.Dispatch<React.SetStateAction<number>>;
  DisplayCart: boolean;
  setDisplayCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItemCount: number;
  setCartiItemCount: React.Dispatch<React.SetStateAction<number>>;
  cartExists: number;
  setCartExists: React.Dispatch<React.SetStateAction<number>>;
  viewedArticle: number;
  setviewedArticle: React.Dispatch<React.SetStateAction<number>>;
  Purchases: Purchase[];
  setPurchases: React.Dispatch<React.SetStateAction<Purchase[]>>;
}

export function Details(props: Propovi) {
  const [viewingPhoto, setviewingPhoto] = useState(0);
  const [NumOfPhotos, setNumOfPhotos] = useState(1);

  //Photo Related Stuff->
  const NextPhoto = () => {
    if (viewingPhoto < NumOfPhotos - 1) {
      setviewingPhoto(viewingPhoto + 1);
      
    } else {
      setviewingPhoto(0);
      
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

    Articles.find((i) => i.Id === props.viewedArticle)?.Photos.forEach(
      (Photo) => {
        a++;
      }
    );

    
    setNumOfPhotos(a);
  };

  return (
    <>
      <div
        className="DetailsDiv"
        style={{
          display: props.viewedArticle === 0 ? "none" : "block",
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
          onClick={() => (props.setviewedArticle(0), setviewingPhoto(0))}
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
            {Articles.find(
              (i) => i.Id === Number(props.viewedArticle)
            )?.Photos.map((Photos, photoindex) => (
              
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
              
            ))}
            <DetailsSubPanel
              totalCost={props.totalCost}
              setTotalCost={props.setTotalCost}
              DisplayCart={props.DisplayCart}
              setDisplayCart={props.setDisplayCart}
              cartItemCount={props.cartItemCount}
              setCartiItemCount={props.setCartiItemCount}
              cartExists={props.cartExists}
              setCartExists={props.setCartExists}
              viewedArticle={props.viewedArticle}
              setviewedArticle={props.setviewedArticle}
              Purchases={props.Purchases}
              setPurchases={props.setPurchases}
            />
          </div>
        </div>
      </div>
    </>
  );
}
