import { createGuestSession } from "@/lib/actions/guest.action"
import { currentUser } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Home = async () => {
  const user = await currentUser();

  if (user?.id) {
    redirect("/dashboard");
  }

  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16 sm:px-10">
      <Link
        href="/"
        className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-md px-2 py-1 text-slate-900 transition hover:bg-slate-100 sm:left-10"
      >
        <Image
          src="/assets/images/logo-icon.svg"
          alt="CoolPixels logo"
          width={28}
          height={28}
          priority
        />
        <span className="text-lg font-semibold tracking-tight">CoolPixels</span>
      </Link>
      <section className="rounded-3xl bg-gradient-to-b from-purple-600/90 to-indigo-700/90 p-8 text-center text-white shadow-xl sm:p-14">
        <p className="mb-4 inline-flex rounded-full bg-white/20 px-4 py-1 text-sm font-medium tracking-wide">
          AI image editing for fast portfolio demos
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">
          Turn ordinary photos into standout visuals in minutes.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-white/90 sm:text-lg">
          CoolPixels helps you restore, fill, recolor, remove objects, and remove
          backgrounds using AI. Recruiters can explore a live working demo right
          away in guest mode.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <form action={createGuestSession}>
            <button
              type="submit"
              className="rounded-xl bg-white px-7 py-3 text-base font-semibold text-indigo-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-700"
              aria-label="Try the app now in guest mode"
            >
              Try It Now
            </button>
          </form>
          <Link
            href="/login"
            className="rounded-xl border border-white/60 px-7 py-3 text-base font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-700"
          >
            Log in
          </Link>
        </div>
        <p className="mt-4 text-sm text-white/85">
          Guest mode includes <span className="font-semibold">10 credits</span> so
          visitors can test real transformations immediately.
        </p>
      </section>

      <section aria-labelledby="features-heading" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <h2 id="features-heading" className="sr-only">
          Core features
        </h2>
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Image Restore</h3>
          <p className="mt-2 text-sm text-slate-600">
            Reduce noise and bring older or blurry images back to life.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Generative Fill</h3>
          <p className="mt-2 text-sm text-slate-600">
            Extend composition and resize scenes without losing visual quality.
          </p>
        </article>
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Object Editing</h3>
          <p className="mt-2 text-sm text-slate-600">
            Remove distractions or recolor specific objects with text prompts.
          </p>
        </article>
      </section>

    </main>
  );
};

export default Home;