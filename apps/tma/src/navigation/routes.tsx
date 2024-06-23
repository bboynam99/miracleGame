import { Route } from "./types";
import {
  ProductionPage,
  MarketPage,
  TendersPage,
  CommunityPage,
  ProductionItem,
} from "./LazyComponents";
import mining from "@/assets/icons/mining.svg";
import marker from "@/assets/icons/shop.svg";
import tenders from "@/assets/icons/factory.svg";
import commutity from "@/assets/icons/comunity.svg";

export const routes: Route[] = [
  {
    path: "/",
    Component: ProductionPage,
    title: "Production",
    nav: true,
    icon: mining,
  },
  {
    path: "/market",
    Component: MarketPage,
    title: "Market",
    nav: true,
    icon: marker,
  },
  {
    path: "/tenders",
    Component: TendersPage,
    title: "Tenders",
    icon: tenders,
    nav: true,
  },
  {
    path: "/commutity",
    Component: CommunityPage,
    title: "Community",
    icon: commutity,
    nav: true,
  },
  {
    path: "/mine/:mine",
    Component: ProductionItem,
    nav: false,
  },
];
