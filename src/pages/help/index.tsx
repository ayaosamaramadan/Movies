import Image from "next/image";

const Help = () => {
    return (<>
    <a
      href="#main-content"
      className="skip-link absolute left-[-999px] top-auto w-[1px] h-[1px] overflow-hidden bg-[#222] text-white p-2 z-[1000] transition-[left] duration-300 focus:left-0"
      onFocus={e => (e.currentTarget.style.left = '0')}
      onBlur={e => (e.currentTarget.style.left = '-999px')}
    >
      Skip to main content
    </a>
    <header className="bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white py-8 px-4 text-center shadow-md">
      <Image
      src="/logo.webp"
      alt="Movies Help Center Logo"
      className="mx-auto mb-4 h-16 w-auto"
      width={64}
      height={64}
      />
      <nav className="flex justify-center gap-8 text-lg">
      <a href="/submit-request" className="underline text-white">
        Submit a request
      </a>
      <a href="/sign-in" className="underline text-white">
        Sign in
      </a>
      <a
        href="https://yourwebsite.com"
        className="underline text-white"
        target="_blank"
        rel="noopener noreferrer"
      >
        Website
      </a>
      </nav>
    </header>
    <main
      id="main-content"
      className="max-w-[700px] mx-auto my-8 p-8 bg-white rounded-2xl shadow-lg"
    >
      <h2 className="text-3xl mb-6 text-[#1e3c72]">How can we help?</h2>
      <form className="flex gap-4 mb-8">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        id="search"
        type="search"
        placeholder="Search for help articles..."
        className="flex-1 py-3 px-4 rounded-lg border border-[#cfd8dc] text-base outline-none transition-colors duration-200 focus:border-[#1e3c72]"
      />
      <button
        type="submit"
        className="bg-[#1e3c72] text-white border-none rounded-lg py-3 px-6 text-base cursor-pointer transition-colors duration-200 hover:bg-[#2a5298]"
      >
        Search
      </button>
      </form>
      <section className="mb-8 p-6 bg-[#f5f8fa] rounded-xl shadow">
      <h3 className="text-[#2a5298] mb-2">About</h3>
      <p>General questions frequently asked about this app</p>
      </section>
      <section className="mb-8 p-6 bg-[#f5f8fa] rounded-xl shadow">
      <h3 className="text-[#2a5298] mb-2">Pro Features</h3>
      <p>Our new enhanced version with Pro features!</p>
      </section>
      <section className="mb-8 p-6 bg-[#f5f8fa] rounded-xl shadow">
      <h3 className="text-[#2a5298] mb-2">Content &amp; Availability</h3>
      <p>The movies, shows and more available here</p>
      </section>
      <section className="mb-8 p-6 bg-[#f5f8fa] rounded-xl shadow">
      <h3 className="text-[#2a5298] mb-2">Legal</h3>
      <p>Home of all the legal and official things</p>
      </section>
      <div className="text-center mt-8">
      <a
        href="/"
        className="text-[#1e3c72] underline font-semibold text-lg"
      >
        ← Back to home
      </a>
      </div>
    </main>
    </>  );
}
 
export default Help;