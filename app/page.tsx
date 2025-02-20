import { AnimatedText } from "@/components/hero/animated-text";
import { EarlyAccessForm } from "@/components/hero/early-access-form";
// import { HeroSearchbar } from "@/components/hero/hero-searchbar";
import { RootLayout } from "@/components/shared/root-layout";

const messages = [
  "✅ Quality content crafted by industry experts",
  "✅ Indepth coverage of React ecosystem",
  "✅ Beginer to expert level content",
  "❌ Low effort content",
  "❌ Articles written for SEO",
  "❌ AI-generated content",
];

export default function Home() {
  return (
    <RootLayout>
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 h-[80vh]">
        <h1 className="text-center text-4xl font-black tracking-normal md:text-5xl mb-2">
          Search React Ecosystem
        </h1>
        <AnimatedText messages={messages} />
        <EarlyAccessForm />
        {/* <HeroSearchbar /> */}
      </div>
    </RootLayout>
  );
}
