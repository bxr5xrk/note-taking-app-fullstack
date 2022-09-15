export const wrongTitle = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
        ref.current.style.color = "red";

        setTimeout(() => {
            if (ref.current) {
                ref.current.style.color = "black";
                ref.current.select();
            }
        }, 1000);
    }
};
