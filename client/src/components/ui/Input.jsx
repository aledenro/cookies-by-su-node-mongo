import { forwardRef } from "react";

export const Input = forwardRef((props, ref) => (
    <input
        {...props}
        ref={ref}
        className="w-full bg-white bg-opacity-90 backdrop-blur-md shadow-lg text-black px-4 py-2 rounded-md"
    />
));