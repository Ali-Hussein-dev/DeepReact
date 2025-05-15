import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { ImSpinner8 } from "react-icons/im";
import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SearchLayout } from "./search-layout";
import { IoCompassOutline } from "react-icons/io5";
import { RiYoutubeLine } from "react-icons/ri";

type TabName = "all" | "videos" | "jobs" | "discover";

type SearchBarProps = {
  input: string;
  setInput: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isFetching: boolean;
  placeholder?: string;
  activeTab: TabName;
  handleTabChange: (tab: string) => Promise<void>;
  RightSide?: React.ReactNode;
  ref?: React.RefObject<HTMLInputElement> | null;
};

const SearchTabs = ({
  activeTab,
  onTabChange,
}: {
  onTabChange: (tab: TabName) => void;
  activeTab: TabName | string;
}) => {
  const handleTabChange = (tab: TabName) => {
    if (tab) {
      onTabChange(tab);
    }
  };
  return (
    <ToggleGroup
      type="single"
      value={activeTab}
      onValueChange={handleTabChange}
      defaultValue="all"
      variant="default"
      className="w-fit justify-start gap-0 overflow-hidden rounded-md pt-2"
    >
      {[
        {
          name: "all",
          label: "All",
          Icon: SearchIcon,
        },
        {
          name: "videos",
          label: "Videos",
          Icon: RiYoutubeLine,
        },
        // {
        //   name: "jobs",
        //   label: "Jobs",
        //   Icon: SearchIcon,
        // },
        // {
        //   name: "discover",
        //   label: "Discover",
        //   Icon: IoCompassOutline,
        // },
      ].map((tab) => (
        <ToggleGroupItem
          key={tab.label}
          className="px-4"
          value={tab.name}
          aria-label={`Toggle ${tab.name}`}
        >
          {tab.Icon && <tab.Icon className="size-5 text-muted-foreground" />}
          {tab.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};
export function SearchBar({
  input,
  setInput,
  onSubmit,
  isFetching,
  placeholder = "Search React ecosystem",
  activeTab,
  handleTabChange,
  RightSide,
  ref,
}: SearchBarProps) {
  const isDiscovedTab = activeTab === "discover";
  return (
    <SearchLayout>
      <div>
        <form onSubmit={onSubmit} className="w-full">
          <div className="w-full gap-1 flex justify-start items-center group border border-dashed rounded-full p-2">
            <Input
              ref={ref}
              placeholder={placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="h-10 rounded-full border-none pl-5 text-lg disabled:hover:cursor-not-allowed"
              disabled={isFetching || isDiscovedTab}
            />
            <Button
              size="icon"
              variant="outline"
              className="size-10 rounded-full grow disabled:hover:cursor-not-allowed border-none"
              disabled={isFetching || isDiscovedTab || !input}
            >
              {isFetching && !isDiscovedTab ? (
                <ImSpinner8 className="size-6 animate-spin" />
              ) : (
                <SearchIcon className="size-6" />
              )}
            </Button>
          </div>
        </form>
        <div className="pt-2 flex justify-between items-center">
          <SearchTabs onTabChange={handleTabChange} activeTab={activeTab} />
          {RightSide}
        </div>
      </div>
    </SearchLayout>
  );
}
