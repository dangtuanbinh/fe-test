import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as lodash from "lodash";

import "./styles.scss";
import BrandName from "../../components/brand-name";
import { getHistory } from "../../store/rootSelector";
import StyledTitle from "../../components/styled-tilte";
import { IHistoryData } from "../../utils/types/commonTypes";
import HistoryListItem from "../../components/history-list-item";
import WeatherDetailItem from "../../components/weather-detail-item";
import {
  useGetInitialWeatherQuery,
  useLazyGetWeatherQuery,
} from "../../store/weather/weatherApis";
import { deleteHistory, setHistory } from "../../store/history/historySlices";
import { getTimeStamps } from "../../utils/commonFunctions";

const classNamePrefix = "home-page";

const HomePage = () => {
  const dispatch = useDispatch();

  const historyList = useSelector(getHistory);

  const [trigger, error] = useLazyGetWeatherQuery();
  const { data: initialWeather, isSuccess: isGetInitialWeatherSuccess } =
    useGetInitialWeatherQuery({});

  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [weather, setWeather] = useState();

  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [noData, setNoData] = useState<boolean>(false);

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

  const handleAddToHistoryList = () => {
    const isNotInHistory = historyList.every(
      (h: IHistoryData) => h.city !== city
    );
    if (isNotInHistory) {
      dispatch(
        setHistory({
          id: uuidv4(),
          city: city,
          country: country,
          created_at: getTimeStamps(),
        })
      );
    }
  };

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
        setNoData(false);
        handleClearSearchInput()
        handleAddToHistoryList();
      } else if (error) {
        setNoData(true);
      }
    }
  };

  const handleHistoryItemClick = async (id: string | number) => {
    const selectedHistoryItem = historyList.find(
      (item: IHistoryData) => item.id === id
    );

    const data = await trigger({
      city: selectedHistoryItem.city,
      country: selectedHistoryItem.country,
    });

    if (data.status === "fulfilled") {
      setWeather(data.data);
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

  useEffect(() => {
    if (isGetInitialWeatherSuccess) setWeather(initialWeather);
  }, [initialWeather]);

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
              placeholder="Enter your country code..."
            />
            {country === "" && showErrors ? (
              <div className={`${classNamePrefix}__error`}>
                Please enter your country code
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

      {weather && noData === false ? (
        <div className={`${classNamePrefix}__weather-item`}>
          <WeatherDetailItem data={weather} />
        </div>
      ) : (
        <div className={`${classNamePrefix}__record-empty`}>
          <span> Not found</span>
        </div>
      )}

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
                  onHistoryItemSearch={() => handleHistoryItemClick(h.id)}
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
