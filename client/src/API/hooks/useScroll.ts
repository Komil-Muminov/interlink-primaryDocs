import { useRef, useState } from "react";

export const useScroll = () => {
	const ref = useRef();
	const [scroll, setScroll] = useState<boolean>(false);
	const handleScroll = (scroll: boolean) => {
		if (scroll) {
			ref?.current?.scrollIntoView({ behavior: "smooth" });
		} else {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	};
	return {
		ref,
		scroll,
		handleScroll,
	};
};
