import { JSX } from "react";
import ViewMemberDetails from "@/views/tester/sub2/view-sub2-details";


type Props = {
  params: Promise<{ id: string }>;
};

export default async function PageMemberDetails({ params }: Props): Promise<JSX.Element> {
  const { id } = await params;

  return <ViewMemberDetails id={id} />;
}
