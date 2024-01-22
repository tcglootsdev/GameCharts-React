import React from "react";
import ContentLoader from "react-content-loader";

// Helpers
import { getRandInArray } from "@/helpers/utils";

const widthList = [200, 300, 500, 700];

const TextLoader = ({ row, backgroundColor, foregroundColor }) => {
    const mRects = React.useMemo(() => {
        const rects = [];
        for (let i = 0; i < row; i++) {
            rects.push(<rect key={i} x="0" y={i * 30} rx="10" ry="10" width={getRandInArray(widthList)} height={20} />);
        }
        return rects;
    }, [row]);
    return (
        <ContentLoader
            className="m-2"
            speed={2}
            width={1000}
            height={row * 30}
            viewBox={"0 0 1000 " + row * 30}
            backgroundColor={backgroundColor}
            foregroundColor={foregroundColor}
        >
            {mRects}
        </ContentLoader>
    );
};

TextLoader.defaultProps = {
    row: 0,
};

export default TextLoader;
