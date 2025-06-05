import { AnimatedText } from "@/components/hero/animated-text";
import { HeroSearchbar } from "@/components/hero/hero-searchbar";
import { RootLayout } from "@/components/shared/root-layout";
import { StargazerSection } from "@/features/stargazer/components/stargazer-section";

const messages = [
  "❌ Low quality content",
  "✅ Quality first content",
  "❌ SEO-driven content",
  "✅ Content written by industry experts",
  "❌ AI-generated content",
  "✅ authentic human-written content",
];

export default function Home() {
  return (
    <RootLayout>
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-4 h-[80vh]">
        <h1 className="text-center text-4xl font-black tracking-normal md:text-5xl mb-2">
          Search React Ecosystem
        </h1>
        <AnimatedText messages={messages} />
        <HeroSearchbar />
        <StargazerSection />
      </div>
    </RootLayout>
  );
}
