export const KMB_CONFIG = {
  BASE_URL: "https://data.etabus.gov.hk",
  headers: {
    accept: "application/json",
  },
};

export const fetchRoutes = async () => {
  const endpoint = KMB_CONFIG.BASE_URL + "/v1/transport/kmb/route/";

  const response = await fetch(endpoint, {
    method: "GET",
    headers: KMB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch routes: " + response.statusText);
  }

  const data = await response.json();

  return data;
};

export const fetchRoutesStop = async (
  route: string,
  bound: string,
  service_type: string
) => {
  try {
    const endpoint =
      KMB_CONFIG.BASE_URL +
      `/v1/transport/kmb/route-stop/${route}/${bound}/${service_type}`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: KMB_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error(
        "Failed to fetch routes stop detail: " + response.statusText
      );
    }
    const data = response.json();

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const fetchStopDetail = async (stop_id: string) => {
  try {
    const endpoint = KMB_CONFIG.BASE_URL + `/v1/transport/kmb/stop/${stop_id}`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: KMB_CONFIG.headers,
    });
    if (!response.ok) {
      throw new Error(
        "Failed to fetch routes stop detail: " + response.statusText
      );
    }
    const data = response.json();

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
