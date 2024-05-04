interface ShinyButtonProps {
  onClick?: () => void;
}

const ShinyButton = ({ onClick }: ShinyButtonProps) => {
  return (
    <button onClick={onClick} className="shiny-button">
      F I G H T
      <div id="clip">
        <div id="leftTop" className="corner"></div>
        <div id="rightBottom" className="corner"></div>
        <div id="rightTop" className="corner"></div>
        <div id="leftBottom" className="corner"></div>
      </div>
      <span id="rightArrow" className="arrow"></span>
      <span id="leftArrow" className="arrow"></span>
    </button>
  );
};

export default ShinyButton;
