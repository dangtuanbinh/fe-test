import "./styles.scss";

const classNamePrefix = "weather-detail-item";

interface IWeatherDetailItem {
  data:any
}

const WeatherDetailItem: React.FC<IWeatherDetailItem> = (props) => {
  const {data} = props

  return (
    <div className={`${classNamePrefix}`}>
      <div className={`${classNamePrefix}__weather-group`}>
        <span>{data.name},{data?.sys?.country}</span>
        <div className={`${classNamePrefix}__weather`}>{data.name}</div>
      </div>

      <div className={`${classNamePrefix}__detail`}>
        <div className={`${classNamePrefix}__detail-title-wrapper`}>
          <div className={`${classNamePrefix}__detail-title`}>Description:</div>
          <div className={`${classNamePrefix}__detail-title`}>Temperature:</div>
          <div className={`${classNamePrefix}__detail-title`}>Humidity:</div>
          <div className={`${classNamePrefix}__detail-title`}>Time:</div>
        </div>

        <div className={`${classNamePrefix}__detail-content-wrapper`}>
          <div className={`${classNamePrefix}__detail-content`}>
          {/* {data?.weather[0]?.description} */}
          </div>
          <div className={`${classNamePrefix}__detail-content`}>{data?.main?.temp_min} - {data?.main?.temp_max}</div>
          <div className={`${classNamePrefix}__detail-content`}>{data?.main?.humidity}%</div>
          <div className={`${classNamePrefix}__detail-content`}>
            2023-22-3 3:57pm
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetailItem;
