import { fetchAPI, submitAPI } from "../api";

export function getAvailableTimes(date) {
  return fetchAPI(date);
}

export function submitBooking(formData) {
  return submitAPI(formData);
}
