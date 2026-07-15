import { FIRESTORE } from "@/config/firebase/server";
import { getServerTranslations } from "@/providers/language/server";
import { IUser } from "@/types/database";
import { convertor } from "@/utils/firebase";
import { formatUsername } from "@/utils/formatters";
import ViewTeamDetails from "@/views/team/view-team-details";
import { Metadata } from "next";
import { JSX } from "react";

type Props = {
  params: Promise<{ id: string, lang: string }>
}

export async function generateMetadata( { params }: Props ): Promise<Metadata> {
  const { id, lang } = await params;
  const { t } = await getServerTranslations(lang);

  return FIRESTORE.collection("users").doc(id).get().then(doc => {
    if (doc.exists) {
      const user = convertor<IUser>({ ...doc.data(), id });
      return { title: t("team.details.title", { name: formatUsername(user) }) }
    } else {
      return { title: t("team.details.notFound") }
    }
  })
}

export default async function PagePlatformTeamDetails({ params }: Props): Promise<JSX.Element> {

  const { id } = await params;
  
  return <ViewTeamDetails id={id} />

}
