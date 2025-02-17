import { useRef } from "react";

export const useScroll = () => {
	const ref = useRef();
	const handleScroll = (scroll: boolean) => {
		if (scroll) {
			ref?.current?.scrollIntoView({ behavior: "smooth" });
		}
	};
	return {
		ref,
		handleScroll,
	};
};
