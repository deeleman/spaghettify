import {
  PROGRESS_BAR_TRANSITION_MS,
  getRawDataStub,
  rawDataMock,
  getMiddlewarePayloadStub,
  progressBarHandler,
} from '../../core';

const httpClient = () => Promise.resolve(getRawDataStub());

const core = {
  PROGRESS_BAR_TRANSITION_MS,
  httpClient,
  getRawDataStub,
  rawDataMock,
  getMiddlewarePayloadStub,
  progressBarHandler,
};

module.exports = core;