import React, { lazy } from "react";
import { Carousel } from "react-responsive-carousel";

const Loading = lazy(() => import("@/components/loading"));

const Slider = ({ emptyOpts, loading, children }) => {
    return (
        <div style={{ minHeight: emptyOpts.height }} className="w-100 position-relative">
            {children.length > 0 && <Carousel renderThumbs={() => null}>{children}</Carousel>}
            {children.length === 0 && (
                <div className="d-flex justify-content-center align-items-center border-light" style={{ height: emptyOpts.height }}>
                    {loading ? "Loading..." : "No Slider"}
                </div>
            )}
            {loading && <Loading />}
        </div>
    );
};

Slider.defaultProps = {
    emptyOpts: {
        height: 250,
    },
    loading: false,
};

export default Slider;
