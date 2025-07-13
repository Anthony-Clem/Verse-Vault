import Logo from "@/components/logo";
import RandomVerseButton from "@/components/random-verse-button";
import SearchBar from "@/components/search-bar";
import VerseBlock from "@/components/verse-block";

const Home = () => {
  return (
    <section className="flex flex-col gap-8 items-center justify-center h-full">
      <div className="flex flex-col items-center gap-y-2">
        <Logo className="text-5xl text-center" />
        <p className="text-lg font-light text-center">Search and save your favorite verses</p>
      </div>
      <div className="space-y-5 max-w-[330px] w-full mx-auto">
        <div className="w-full flex items-center gap-3">
          <SearchBar />
          <RandomVerseButton />
        </div>
        <VerseBlock />
      </div>
    </section>
  );
};
export default Home;
