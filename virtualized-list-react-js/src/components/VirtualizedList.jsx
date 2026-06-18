import { useState } from "react";

const VirtualizedList = ({
  list,
  containerWidth,
  containerHeight,
  itemHeight,
}) => {
  const [indices, setIndices] = useState([
    0,
    Math.floor(containerHeight / itemHeight),
  ]);

  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    const newEndIndex =
      newStartIndex + Math.floor(containerHeight / itemHeight);
    setIndices([newStartIndex, newEndIndex]);
  };

  const visibleList = list.slice(indices[0], indices[1] + 1);

  return (
    <div
      className="container"
      onScroll={handleScroll}
      style={{
        width: containerWidth,
        height: containerHeight,
        background: "gray",
        overflow: "auto",
      }}
    >
      <div style={{ height: list.length * itemHeight, position: "relative" }}>
        {visibleList.map((item, index) => {
          return (
            <div
              key={item}
              className="item"
              style={{
                height: itemHeight,
                width: "100%",
                textAlign: "center",
                background: "coral",
                borderTop: "5px solid grey",
                position: "absolute",
                top: (indices[0] + index) * itemHeight,
              }}
            >
              {"Item " + item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VirtualizedList;
