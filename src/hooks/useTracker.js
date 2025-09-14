import { useCallback } from 'react';
import { mockGet } from './apiClient';
import data from '../mock/data.json';

export function useTracker() {
  const listHospitals = useCallback(async () => {
    // TODO: GET /api/hospitals
    await mockGet('/hospitals');
    return data.hospitals;
  }, []);

  const getHospitalById = useCallback(async (id) => {
    await mockGet(`/hospitals/${id}`);
    return data.hospitals.find(h => String(h.id) === String(id));
  }, []);

  const listTrackers = useCallback(async () => {
    // TODO: GET /api/trackers/summary
    await mockGet('/trackers/summary');
    return data.trackerSummary;
  }, []);

  return { listHospitals, getHospitalById, listTrackers };
}


