import { GoServer } from "react-icons/go";
import { HiOutlineTemplate } from "react-icons/hi";
import { MdOutlineSchool } from "react-icons/md";
import { PiPackage } from "react-icons/pi";
import { SiShadcnui } from "react-icons/si";
export const categories = [
	{
		label: "Courses",
		value: "courses",
		Icon: MdOutlineSchool,
	},
	{
		label: "Templates",
		value: "templates",
		Icon: HiOutlineTemplate,
	},
	{
		label: "Packages",
		value: "packages",
		Icon: PiPackage,
	},
	{
		label: "Hosting",
		value: "hosting",
		Icon: GoServer,
	},
	{
		label: "Shadcn/ui",
		value: "shadcn",
		Icon: SiShadcnui,
	},
];
