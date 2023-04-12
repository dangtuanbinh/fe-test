import "./styles.scss"

const classNamePrefix = "brand-name";

const BrandName = () => {
  return (
    <div className={`${classNamePrefix}`}>
      <span> Weather Forcast</span>
    </div>
  );
};

export default BrandName;
