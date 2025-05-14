import { AnimatedText } from "@/components/hero/animated-text";
import { EarlyAccessForm } from "@/components/hero/early-access-form";
// import { HeroSearchbar } from "@/components/hero/hero-searchbar";
import { RootLayout } from "@/components/shared/root-layout";
import { StargazerSection } from "@/features/stargazer/components/stargazer-section";

const messages = [
  "✅ Quality first content",
  "❌ Low quality content",
  "✅ Content written by industry experts",
  "❌ SEO-driven content",
  "✅ Handpicked content",
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
        <StargazerSection />
      </div>
    </RootLayout>
  );
}
