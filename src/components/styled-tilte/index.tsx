import React from "react";

import "./styles.scss";

interface IStyledTitleProps {
  title?: string;
}

const classNamePrefix = "styled-title";

const StyledTitle: React.FC<IStyledTitleProps> = (props) => {
  const { title } = props;

  return (
    <div className={`${classNamePrefix}`}>
      <span>{title}</span>
    </div>
  );
};

export default StyledTitle;
