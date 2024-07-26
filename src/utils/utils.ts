export const setNewOffset = (
    card: HTMLDivElement,
    mouseMoveDir = { x: 0, y: 0 }
) => {
    const offsetLeft = card.offsetLeft - mouseMoveDir.x;
    const offsetTop = card.offsetTop - mouseMoveDir.y;

    return {
        x: offsetLeft < 0 ? 0 : offsetLeft,
        y: offsetTop < 0 ? 0 : offsetTop,
    };
};

export const autoGrow = (
    textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>
) => {
    const { current } = textAreaRef;
    if (current) {
        current.style.height = "auto";
        current.style.height = current.scrollHeight + "px";
    }
};

export const setActiveCard = (selectedCard: HTMLDivElement) => {
    const cards = document.getElementsByClassName("card");

    Array.from(cards).forEach((card) => {
        const cardElement = card as HTMLDivElement;
        if (cardElement === selectedCard) {
            cardElement.classList.add("active");
        } else {
            cardElement.classList.remove("active");
        }
    });
};

export const bodyParser = (value: string) => {
    try {
        JSON.parse(value);
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
};
