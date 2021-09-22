import { call, put, takeEvery } from "redux-saga/effects";
import * as actionTypes from "./cartActions";

function* callFetchTaskTypes() {
  try {
    console.log("SAGA WORKING");
  } catch (e) {}
}

function* watchCartActionSagas() {
  yield takeEvery("actionTypes.SET_TENANT_ID", callFetchTaskTypes);
}

export const cartSagas = [watchCartActionSagas];
