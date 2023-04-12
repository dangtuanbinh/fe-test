import moment from "moment";
import { DATE_FORMAT } from "./constants";

export const formatDate = (dataInput: any) => {
  return moment(dataInput).format(DATE_FORMAT);
};
