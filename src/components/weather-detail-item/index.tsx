import UnorderedListOutlined from "@ant-design/icons/lib/icons/UnorderedListOutlined";
import "./styles.scss";
import BarChartOutlined from "@ant-design/icons/lib/icons/BarChartOutlined";
import DashboardOutlined from "@ant-design/icons/lib/icons/DashboardOutlined";
import FileImageOutlined from "@ant-design/icons/lib/icons/FileImageOutlined";
import ExperimentOutlined from "@ant-design/icons/lib/icons/ExperimentOutlined";
import { formatFahrenheitToCelcius, getFullDateTime } from "../../utils/commonFunctions";
import { DATE_FORMAT } from "../../utils/constants";
import moment from "moment";

const classNamePrefix = "weather-detail-item";

interface IWeatherDetailItem {
  data: any;
}

const WeatherDetailItem: React.FC<IWeatherDetailItem> = (props) => {
  const { data } = props;

  return (
    <div className={`${classNamePrefix}`}>
      <div className={`${classNamePrefix}__weather-group`}>
        <div className={`${classNamePrefix}__location-group`}>
          <span>
            {data.name},{data?.sys?.country}
          </span>
          <div className={`${classNamePrefix}__weather`}>{data.name}</div>
        </div>
        <div className={`${classNamePrefix}__degree`}>
          <span>{formatFahrenheitToCelcius(data?.main?.temp)}</span>
        </div>
      </div>

      <div className={`${classNamePrefix}__detail`}>
        <div className={`${classNamePrefix}__detail-title-wrapper`}>
          <div className={`${classNamePrefix}__detail-title`}>
            <FileImageOutlined className={`${classNamePrefix}__detail-icon`} />{" "}
            Description:
          </div>
          <div className={`${classNamePrefix}__detail-title`}>
            <BarChartOutlined className={`${classNamePrefix}__detail-icon`} />
            Temperature:
          </div>
          <div className={`${classNamePrefix}__detail-title`}>
            <ExperimentOutlined className={`${classNamePrefix}__detail-icon`} />
            Humidity:
          </div>
          <div className={`${classNamePrefix}__detail-title`}>
            <DashboardOutlined className={`${classNamePrefix}__detail-icon`} />
            Time:
          </div>
        </div>

        <div className={`${classNamePrefix}__detail-content-wrapper`}>
          <div className={`${classNamePrefix}__detail-content`}>
            {data?.weather[0]?.description}
          </div>
          <div className={`${classNamePrefix}__detail-content`}>
            {formatFahrenheitToCelcius(data?.main?.temp_min)} -
            {formatFahrenheitToCelcius(data?.main?.temp_max)}
          </div>
          <div className={`${classNamePrefix}__detail-content`}>
            {data?.main?.humidity}%
          </div>
          <div className={`${classNamePrefix}__detail-content`}>
            {moment(getFullDateTime()).format(DATE_FORMAT)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetailItem;
