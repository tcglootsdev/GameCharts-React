import React from "react";
import ContentLoader from "react-content-loader";

const RectLoader = ({ width, height }) => {
    return (
        <ContentLoader
            className="m-2"
            speed={2}
            width={width}
            height={height}
            viewBox={"0 0 " + width + " " + height}
            backgroundColor="#2a3143"
            foregroundColor="#111111"
        >
            <rect x="0" y="0" rx="10" ry="10" width={width} height={height} />
        </ContentLoader>
    );
};

export default RectLoader;
