const axios = require('axios');

export async function getSearchResults(search: any) {
  const url = `https://api.github.com/search/repositories?page=1&per_page=30`
  const requestData = {
		method: 'GET',
		url,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		timeout: 15000,
    params: search
	};
	try {
		const response = await axios(requestData);
		if (response.status === 204) return null;
		if (typeof response.data !== 'undefined' && response.data !== null) {
      return response.data;
		}
		throw new Error('No data was returned from the request.');
	} catch (error) {
		throw error;
	}
}
