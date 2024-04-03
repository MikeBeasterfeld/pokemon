import { Metadata } from "next/types";
import Detail from "./detail";

export const metadata: Metadata = {
  title: "Details",
};

export default function Pokemon({ params }: { params: { slug: string } }) {
  return <Detail params={params} />;
}
