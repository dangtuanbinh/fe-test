import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";

import { IHistoryData } from "../../utils/types/commonTypes";
import "./styles.scss";

const classNamePrefix = "history-list-item";

interface IHistoryListItemProps {
  data?: IHistoryData;
  index?: number;
  handleDeleteHistory?: () => void;
  onHistoryItemSearch?: () => void;
}

const HistoryListItem: React.FC<IHistoryListItemProps> = (props) => {
  const { data, index, handleDeleteHistory, onHistoryItemSearch } = props;

  return (
    <div className={`${classNamePrefix}`}>
      <div className={`${classNamePrefix}__title-group`}>
        <div>{index}. </div>
        <div className={`${classNamePrefix}__title`}>
          {data?.city}, {data?.country}
        </div>
      </div>

      <div className={`${classNamePrefix}__action-group`}>
        <div className={`${classNamePrefix}__timestamp`}>
          {data?.created_at}
        </div>

        <div className={`${classNamePrefix}__action-button search-button`} onClick={onHistoryItemSearch}>
          <SearchOutlined
            className={`${classNamePrefix}__action-button-icon`}
          />
        </div>

        <div
          className={`${classNamePrefix}__action-button`}
          onClick={handleDeleteHistory}
        >
          <DeleteOutlined
            className={`${classNamePrefix}__action-button-icon`}
          />
        </div>
      </div>
    </div>
  );
};

export default HistoryListItem;
