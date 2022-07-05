import React from "react";
import Bar from "./Bar";

export default function BarList(props) {
    const { barsConfig, fillLevels } = props;
    return (
        <>
            {barsConfig.map((config) => (
                <Bar key={config.id} config={config} fillLevel={fillLevels[config.id]}/>
            ))}
        </>
    );
}
