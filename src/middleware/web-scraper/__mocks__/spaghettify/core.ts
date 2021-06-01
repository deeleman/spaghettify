// import { getRawDataStub } from 'spaghettify/core/testing';
import {
  PROGRESS_BAR_TRANSITION_MS,
  getRawDataStub,
  rawDataMock,
} from '../../../../core';

const httpClient = () => Promise.resolve(getRawDataStub());

const core = {
  PROGRESS_BAR_TRANSITION_MS,
  httpClient,
  getRawDataStub,
  rawDataMock,
};

module.exports = core;