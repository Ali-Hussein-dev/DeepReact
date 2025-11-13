import { categories } from "./categories";

export const urls = {
	github: "https://github.com/Ali-Hussein-dev/deepreact",
	twitter: "https://x.com/alibey_10",
};

export const sidebarLinks = categories.map((category) => ({
	label: category.label,
	to: `/content/${category.value}`,
	Icon: category.Icon,
}));
