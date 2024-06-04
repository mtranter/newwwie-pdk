/**
 * v0 by Vercel.
 * @see https://v0.dev/t/VfgIvt9SSzM
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { SignupForm } from "./../../components/SignupForm/signup-form";
import Newie from "./newie.jpg";
import Values from "./values.webp";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh] px-20 py-2">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">Newcastle Tech Community</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#events"
          >
            Events
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#about"
          >
            About
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#contact"
          >
            Contact
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-16 xl:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Connecting the Tech Community in Newcastle, NSW
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Join our vibrant community of tech enthusiasts,
                    entrepreneurs, and professionals as we explore the latest
                    trends, share knowledge, and collaborate on exciting
                    projects.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <a
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Join the Community
                  </a>
                </div>
              </div>
              <img
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                height="550"
                src={Newie}
                width="550"
              />
            </div>
          </div>
        </section>
        <section
          id="events"
          className="w-full py-12 md:py-12 lg:py-16 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-lg dark:bg-gray-800">
                  Upcoming Events
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Join Us for Our Next Meetup
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Check out our upcoming events and join us to connect with
                  other tech enthusiasts, learn new skills, and explore the
                  latest industry trends.
                </p>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:px-4">
                <div className="flex flex-col justify-center space-y-4">
                  <ul className="grid gap-6 lg:grid-cols-2">
                    {Event({ id: 1 })}
                    {Event({ id: 2 })}
                    {Event({ id: 3 })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Our Mission and Values
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                At the Newcastle Tech Community, our mission is to foster a
                collaborative and inclusive environment where tech enthusiasts
                can connect, learn, and grow. We believe in the power of
                knowledge sharing, innovation, and community support.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <a
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="https://github.com/newwwie/Code-Of-Conduct"
                >
                  Learn More
                </a>
              </div>
            </div>
            <img
              src={Values}
              width="550"
              height="310"
              alt="Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
          </div>
        </section>
        <section
          id="contact"
          className="w-full py-8 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container grid items-center gap-2 px-4 md:px-6 lg:grid-cols-2 lg:gap-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center md:mb-4">
              Join Our Amazing Slack Community!
            </h2>
            <SignupForm />
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Newcastle Tech Community. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a
            className="text-xs hover:underline underline-offset-4"
            href="https://github.com/newwwie/Code-Of-Conduct"
          >
            Terms of Service
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>
  );
}

type EventProps = { id: number };
function Event(props: EventProps) {
  return (
    <li>
      <div className="grid gap-1">
        <h3 className="text-xl font-bold">
          Intro to React Workshop - {props.id}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Join us for a hands-on workshop to learn the basics of React.js. No
          prior experience required.
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <CalendarDaysIcon className="h-4 w-4" />
          <span>May 20, 2023</span>
        </div>
      </div>
    </li>
  );
}

type SvgProps = React.ComponentProps<"svg">;
function CalendarDaysIcon(props: SvgProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function MountainIcon(props: SvgProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
