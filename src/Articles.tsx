import Prvi2 from "./Images/Prvi2.jpg";
import Prvi from "./Images/Prvi.jpg";
import Prvi3 from "./Images/Prvi3.jpg";
import Prvi4 from "./Images/Prvi4.jpg";
import Drugi from "./Images/Drugi.jpg";
import Drugi2 from "./Images/Drugi2.jpg";
import Drugi3 from "./Images/Drugi3.jpg";
import Drugi4 from "./Images/Drugi4.jpg";
import Treci from "./Images/Treci.jpg";
import Treci2 from "./Images/Treci2.jpg";
import Treci3 from "./Images/Treci3.jpg";
import Treci4 from "./Images/Treci4.jpg";
import Cetvrti from "./Images/Cetvrti.jpg";
import Cetvrti2 from "./Images/Cetvrti2.jpg";
import Cetvrti3 from "./Images/Cetvrti3.jpg";
import Peti from "./Images/Peti.jpg";
import Peti2 from "./Images/Peti2.jpg";
import Sesti from "./Images/Sesti.jpg";
import Sesti2 from "./Images/Sesti2.jpg";
import Sesti3 from "./Images/Sesti3.jpg";

interface Article {
  Name: string;
  Price: number;
  Photos: string[];
  Id: number;
  Category: string;
  SubCategory: string;
}

export const Articles: Article[] = [
  {
    Name: "Prvi Artikal",
    Price: 8234,
    Photos: [Prvi, Prvi2, Prvi3, Prvi4],
    Id: 2350,
    Category: "Men",
    SubCategory: "Clothes",
  },
  {
    Name: "Drugi Artikal",
    Price: 3999,
    Photos: [Drugi, Drugi2, Drugi3, Drugi4],
    Id: 5678,
    Category: "Men",
    SubCategory: "Clothes",
  },
  {
    Name: "Treci Artikal",
    Price: 1699,
    Photos: [Treci, Treci2, Treci3, Treci4],
    Id: 1092,
    Category: "Women",
    SubCategory: "Clothes",
  },
  {
    Name: "Cetvrti Artikal",
    Price: 2599,
    Photos: [Cetvrti, Cetvrti2, Cetvrti3],
    Id: 4310,
    Category: "Women",
    SubCategory: "Clothes",
  },
  {
    Name: "Peti Artikal",
    Price: 1999,
    Photos: [Peti, Peti2],
    Id: 7521,
    Category: "Kids",
    SubCategory: "Clothes",
  },
  {
    Name: "Sesti Artikal",
    Price: 1899,
    Photos: [Sesti, Sesti2, Sesti3],
    Id: 2865,
    Category: "Kids",
    SubCategory: "Clothes",
  },
];
