import { Collection } from "@/components/shared/Collection";
import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { navLinks } from "@/constants";
import { transformationTypes } from "@/constants";
import { getAllImages, getUserImages } from "@/lib/actions/image.actions";
import { currentUser } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const DashboardPage = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchQuery = (searchParams?.query as string) || "";
  const tab = (searchParams?.tab as string) || "home";
  const user = await currentUser();

  if (!user?.id) {
    redirect("/login");
  }

  const getTransformationKeyFromTab = (activeTab: string): TransformationTypeKey | null => {
    switch (activeTab) {
      case "restore":
      case "fill":
      case "remove":
      case "recolor":
      case "removeBackground":
        return activeTab;
      default:
        return null;
    }
  };

  const activeTransformationType = getTransformationKeyFromTab(tab);
  const homeImages = tab === "home"
    ? await getAllImages({ page, searchQuery, userId: user.id })
    : null;
  const profileImages = tab === "profile"
    ? await getUserImages({ page, userId: user.id })
    : null;

  return (
    <>
      {tab === "home" && (
        <>
          <section className="home">
            <h1 className="home-heading">Unleash Your Creative Vision with CoolPixels</h1>
            <ul className="flex-center w-full gap-20">
              {navLinks.slice(1, 6).map((link) => (
                <Link
                  key={link.route}
                  href={`/dashboard?tab=${link.route.split("/").at(-1)}`}
                  className="flex-center flex-col gap-2"
                >
                  <li className="flex-center w-fit rounded-full bg-white p-4">
                    <Image src={link.icon} alt="feature icon" width={24} height={24} />
                  </li>
                  <p className="p-14-medium text-center text-white">{link.label}</p>
                </Link>
              ))}
            </ul>
          </section>

          <section className="sm:mt-12">
            <Collection
              hasSearch={true}
              images={homeImages?.data ?? []}
              totalPages={homeImages?.totalPages}
              page={page}
            />
          </section>
        </>
      )}

      {activeTransformationType && (
        <>
          <Header
            title={transformationTypes[activeTransformationType].title}
            subtitle={transformationTypes[activeTransformationType].subTitle}
          />
          <section className="mt-10">
            <TransformationForm
              action="Add"
              userId={user.id}
              type={activeTransformationType}
              creditBalance={user.creditBalance}
            />
          </section>
        </>
      )}

      {tab === "profile" && (
        <>
          <Header title="Profile" />
          <section className="profile">
            <div className="profile-balance">
              <p className="p-14-medium md:p-16-medium">CREDITS AVAILABLE</p>
              <div className="mt-4 flex items-center gap-4">
                <Image
                  src="/assets/icons/coins.svg"
                  alt="coins"
                  width={50}
                  height={50}
                  className="size-9 md:size-12"
                />
                <h2 className="h2-bold text-dark-600">{user.creditBalance}</h2>
              </div>
            </div>

            <div className="profile-image-manipulation">
              <p className="p-14-medium md:p-16-medium">IMAGE MANIPULATION DONE</p>
              <div className="mt-4 flex items-center gap-4">
                <Image
                  src="/assets/icons/photo.svg"
                  alt="photo"
                  width={50}
                  height={50}
                  className="size-9 md:size-12"
                />
                <h2 className="h2-bold text-dark-600">{profileImages?.data.length ?? 0}</h2>
              </div>
            </div>
          </section>

          <section className="mt-8 md:mt-14">
            <Collection
              images={profileImages?.data ?? []}
              totalPages={profileImages?.totalPages}
              page={page}
            />
          </section>
        </>
      )}
    </>
  );
};

export default DashboardPage;
