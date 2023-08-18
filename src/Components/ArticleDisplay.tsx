import { ArticlesAsc, ArticlesDesc } from "./SidePanel";
import InfoCart from "./Images/InfoCart.png";

interface Propovi {
  Category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  Ordering: string;
  setOrdering: React.Dispatch<React.SetStateAction<string>>;
  viewedArticle: number;
  setviewedArticle: React.Dispatch<React.SetStateAction<number>>;
}

export function ArticleDisplay(props: Propovi) {
  return (
    <>
      <div
        className="ArticlesContainer"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {(props.Ordering !== "PriceDown" ? ArticlesAsc : ArticlesDesc).map(
          (Articles, index) => (
            <div
              className="ArticleBox"
              key={Articles.Id}
              style={{
                textAlign: "center",
                display:
                  props.Category ===
                    Articles.Category + "-" + Articles.SubCategory ||
                  props.Category === "All"
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
                  onClick={() => props.setviewedArticle(Articles.Id)}
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
    </>
  );
}
