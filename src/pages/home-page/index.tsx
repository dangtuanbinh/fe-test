import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as lodash from "lodash";

import "./styles.scss";
import BrandName from "../../components/brand-name";
import { getHistory } from "../../store/rootSelector";
import StyledTitle from "../../components/styled-tilte";
import { IHistoryData } from "../../utils/types/commonTypes";
import HistoryListItem from "../../components/history-list-item";
import WeatherDetailItem from "../../components/weather-detail-item";
import { useLazyGetWeatherQuery } from "../../store/weather/weatherApis";
import { deleteHistory, setHistory } from "../../store/history/historySlices";

const classNamePrefix = "home-page";

const HomePage = () => {
  const dispatch = useDispatch();

  const historyList = useSelector(getHistory);

  const [trigger] = useLazyGetWeatherQuery();

  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const [weather, setWeather] = useState({});
  const [queryStatus, setQueryStatus] = useState<string>("");
  const [showErrors, setShowErrors] = useState<boolean>(false);

  console.log(weather);

  const onCityInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCity(event.target.value);
  };

  const onCountryInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setCountry(event.target.value);
  };

  const handleClearSearchInput = useCallback(() => {
    setCity("");
    setCountry("");
  }, []);

  const handleSearch = async () => {
    if (!city || !country) {
      setShowErrors(true);
    } else {
      const data = await trigger({
        city: city,
        country: country,
      });

      if (data.status === "fulfilled") {
        setWeather(data.data);
        setQueryStatus(data.status);
        dispatch(
          setHistory({
            id: uuidv4(),
            city: city,
            country: country,
            created_at: "12:12",
          })
        );
      }
    }
  };

  const handleDeleteHistory = (id: string | number) => {
    const cloneHistoryList = lodash.clone(historyList);

    const selectedItem = cloneHistoryList.find(
      (item: IHistoryData) => item.id === id
    );
    const indexSelectedItem = cloneHistoryList.indexOf(selectedItem);

    dispatch(deleteHistory(indexSelectedItem));
  };

  return (
    <div className={`${classNamePrefix}`}>
      <BrandName />

      <StyledTitle title={`Today's Weather`} />

      <div className={`${classNamePrefix}__location-search-group`}>
        <div className={`${classNamePrefix}__location-search`}>
          <span>City:</span>
          <div className={`${classNamePrefix}__location-search-input`}>
            <input
              value={city}
              onChange={onCityInputChange}
              type="text"
              placeholder="Enter your city..."
            />
            {city === "" && showErrors ? (
              <div className={`${classNamePrefix}__error`}>
                Please enter your city
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className={`${classNamePrefix}__location-search`}>
          <span>Country:</span>

          <div className={`${classNamePrefix}__location-search-input`}>
            <input
              value={country}
              onChange={onCountryInputChange}
              type="text"
              placeholder="Enter your country..."
            />
            {country === "" && showErrors ? (
              <div className={`${classNamePrefix}__error`}>
                Please enter your city
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className={`${classNamePrefix}__button-group`}>
          <div className={`${classNamePrefix}__button`} onClick={handleSearch}>
            <span>Search</span>
          </div>
          <div
            className={`${classNamePrefix}__button`}
            onClick={handleClearSearchInput}
          >
            <span>Clear</span>
          </div>
        </div>
      </div>

      <div className={`${classNamePrefix}__weather-item`}>
        {queryStatus === "fulfilled" ? (
          <WeatherDetailItem data={weather} />
        ) : (
          <div>Not found</div>
        )}
      </div>

      <StyledTitle title="Search History" />

      <div className={`${classNamePrefix}__record`}>
        {historyList && historyList.length > 0 ? (
          <>
            {historyList.map((h: IHistoryData) => (
              <div key={h.id}>
                <HistoryListItem
                  data={h}
                  index={historyList.indexOf(h) + 1}
                  handleDeleteHistory={() => handleDeleteHistory(h.id)}
                />
              </div>
            ))}
          </>
        ) : (
          <div className={`${classNamePrefix}__record-empty`}>
            No Records Found
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
