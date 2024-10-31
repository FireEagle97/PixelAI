import { redirect } from "next/navigation";
import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constants";
import { getImageById } from "@/lib/actions/image.actions";
import { currentUser } from "@/lib/auth";

const Page = async ({ params: { id } }: SearchParamProps) => {
  const userObj = await currentUser();

  if (!userObj.id) redirect("/sign-in");

  const image = await getImageById(id);

  const transformation =
    transformationTypes[image.transformationType as TransformationTypeKey];

  return (
    <>
      <Header title={transformation.title} subtitle={transformation.subTitle} />

      <section className="mt-10">
        <TransformationForm
          action="Update"
          userId={userObj.id}
          type={image.transformationType as TransformationTypeKey}
          creditBalance={userObj.creditBalance}
          config={image.config}
          data={image}
        />
      </section>
    </>
  );
};

export default Page;